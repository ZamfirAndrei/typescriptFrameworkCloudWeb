import { Page } from "@playwright/test";
import { CloudObjects } from "../management/cloudObjects";
import { expect } from "@playwright/test";


export class SoftwareUpdateFlow {

    private readonly cloud : CloudObjects

    constructor(public page:Page) {

        this.cloud = new CloudObjects(this.page)
    }

    async searchAndSelectDUT(name: string) {

        // Searching and selecting the device which you want to upgrade

        await this.cloud.toolbarObj.clickDevicePage()
        await this.cloud.deviceObj.clickSwitches()
 
        await this.page.waitForTimeout(2000)
        await this.cloud.deviceObj.clickDevice(name)
        await this.page.waitForTimeout(2000)

    }

    async updateDUT(imageVersion: string) {

        // Updating the Switch 

        await this.cloud.partDeviceObj.clickSoftwareUpgrade()
        await this.cloud.softUpdate.selectImgForUpdate(imageVersion)
        await this.cloud.softUpdate.addSoftwareJob()
        
        // Waiting for the Job Update

        // await this.page.waitForTimeout(15000)
        await this.confirmUpdateIsCompleted(1)
    }

    async searchAndSelectSwitchGroup(switchGroup: string) {

          // Selecting the Switch Group which you want to upgrade

          await this.cloud.toolbarObj.clickSwitchGroupsPage()

          await this.page.waitForTimeout(2000)
          await this.cloud.switchgroupObj.clickSwitchGroup(switchGroup)
          await this.page.waitForTimeout(2000)
          await this.cloud.partSwitchgroupObj.clickSwitches()

    }

    async updateDUTSwitchGroup(name: string, imageVersion: string, id: number) {

        // Choose the Switch which you want to update

        await this.page.waitForLoadState()
        await this.page.waitForTimeout(2000)
        await this.cloud.switchGroupSoftupdate.clickCheckSwitch(name, id)
        await this.cloud.switchGroupSoftupdate.getSoftwareVersion(id)
        await this.cloud.switchGroupSoftupdate.getSwitchGroup(id)

        // Update the Switch selected

        await this.cloud.switchGroupSoftupdate.clickActions()
        await this.cloud.switchGroupSoftupdate.clickSoftUpdate()
        await this.page.waitForLoadState()
        await this.page.waitForTimeout(2000)
        await this.cloud.switchGroupSoftupdate.chooseSoftwareImageForUpdate(imageVersion)
        await this.cloud.switchGroupSoftupdate.clickAddSoftwareUpdate()
        
        await this.page.waitForLoadState()
        await this.page.waitForTimeout(2000)

        // Going to the software jobs

        await this.cloud.toolbarObj.clickJobsPage()
        await this.cloud.jobsObj.clickSoftwareUpdate()

        // Waiting for the Job Update

        await this.page.waitForTimeout(13000)
    }

    async updateAllDUTsSwitchGroup(name: string, imageVersion: string) {

        // Choose the Switch which you want to update

        await this.cloud.switchGroupSoftupdate.clickCheckAll()

        // Update the Switches selected

        await this.cloud.switchGroupSoftupdate.clickActions()
        await this.cloud.switchGroupSoftupdate.clickSoftUpdate()
        await this.page.waitForLoadState()
        await this.page.waitForTimeout(2000)
        await this.cloud.switchGroupSoftupdate.chooseSoftwareImageForUpdate(imageVersion)
        await this.cloud.switchGroupSoftupdate.clickAddSoftwareUpdate()
        
        await this.page.waitForLoadState()
        await this.page.waitForTimeout(2000)

        // Going to the software jobs

        await this.cloud.toolbarObj.clickJobsPage()
        await this.cloud.jobsObj.clickSoftwareUpdate()

        // Waiting for the Job Update

        await this.page.waitForTimeout(13000)
    }

    async confirmTargetAndClickShowMore(id: number, imageVersion: string) {

        const target = await this.cloud.jobsSoftupdateObj.getTarget(id)
        await this.cloud.jobsSoftupdateObj.clickShowMore(id)

        expect(target).toBe(imageVersion)

        console.log(`### The target is ${target} ###`)
        
    }

    async getDetailsDUT(index: number) {

        const device = await this.cloud.jobsSoftupdateObj.getDevice(index)
        const result = await this.cloud.jobsSoftupdateObj.getResult(index)
        const updateMessage = await this.cloud.jobsSoftupdateObj.getMessageUpdate(index)
        // await cloud.jobsSoftupdateObj.getLastUpdate(index)
        const originalVersion = await this.cloud.jobsSoftupdateObj.getOriginalVersion(index)

        return {
            device, result, updateMessage, originalVersion
        }
    }

    async confirmDetails(name: string, resultMessageExpected: string, updateMessageExpected: string, index: number) {

        const details = await this.getDetailsDUT(index)

        // Fetching and asserting the Results

        expect(details.device).toBe(name)
        expect(details.result).toBe(resultMessageExpected)
        expect(details.updateMessage).toBe(updateMessageExpected)
        // expect(details.originalVersion).toBe(data.image_to_downgrade)
        console.log(`The device is: ${details.device}`)
        console.log(`The result of the update/downgrade is: ${details.result}`)
        console.log(`The message of the update/downgrade is: ${details.updateMessage}`)
        console.log(`The original version of the DUT: ${details.originalVersion}`)
    }

    async confirmUpgradeDowngrade(name: string, imageVersion: string, index: number, waitingTime: number) {

        console.log("######## Getting the information before the update is completed ########")

        // Fetching and asserting the Results

        this.confirmDetails(name, "Initiated", "Initiated software update operation", index)

        // Waiting for the Software Update to be complete

        await this.page.waitForTimeout(waitingTime)

        console.log("######## Getting the information after the update is completed ########")

        // Fetching and asserting the Results

        this.confirmDetails(name, "Completed", `Successfully updated the device version to ${imageVersion}`, index)

        await this.page.waitForTimeout(2000)
    }

    async confirmAllUpgradeDowngrade(name1: string, name2: string, imageVersion: string, index1: number, index2: number, waitingTime: number) {

        console.log("######## Getting the information before the update is completed ########")

        // Fetching and asserting the Results

        this.confirmDetails(name1, "Initiated", "Initiated software update operation", index1)
        this.confirmDetails(name2, "Initiated", "Initiated software update operation", index2)

        // Waiting for the Software Update to be complete

        await this.page.waitForTimeout(waitingTime)

        console.log("######## Getting the information after the update is completed ########")

        // Fetching and asserting the Results

        this.confirmDetails(name1, "Completed", `Successfully updated the device version to ${imageVersion}`, index1)
        this.confirmDetails(name2, "Completed", `Successfully updated the device version to ${imageVersion}`, index2)

        await this.page.waitForTimeout(2000)
    }

    async confirmUpdateIsCompleted(index: number) {

        await this.cloud.configObj.expectJobStatusToBeCompleted(index)
        console.log("The update is completed")
    }
}

