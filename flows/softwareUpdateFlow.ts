import { Page } from "@playwright/test";
import { CloudObjects } from "../management/cloudObjects";
import { expect } from "@playwright/test";


export class softwareUpdateFlow {

    private readonly cloud : CloudObjects

    constructor(public page:Page) {

        this.cloud = new CloudObjects(this.page)
    }

    async searchAndSelectDUT(name: string) {

        // Searching and selecting the device which you want to upgrade

        await this.cloud.toolbar_obj.clickDevicePage()
        await this.cloud.device_obj.clickSwitches()
 
        await this.page.waitForTimeout(2000)
        await this.cloud.device_obj.clickDevice(name)
        await this.page.waitForTimeout(2000)

    }

    async updateDUT(image_version: string) {

        // Updating the Switch 

        await this.cloud.part_device.clickSoftwareUpgrade()
        await this.cloud.soft_update.selectImgForUpdate(image_version)
        await this.cloud.soft_update.addSoftwareJob()
        
        // Waiting for the Job Update

        await this.page.waitForTimeout(15000)
    }

    async searchAndSelectSwitchGroup(switchgroup: string) {

          // Selecting the Switch Group which you want to upgrade

          await this.cloud.toolbar_obj.clickSwitchGroupsPage()

          await this.page.waitForTimeout(2000)
          await this.cloud.switchgroup_obj.clickSwitchGroup(switchgroup)
          await this.page.waitForTimeout(2000)
          await this.cloud.part_switchgroup_obj.clickSwitches()

    }

    async updateDUTSwitchGroup(name: string, image_version: string, id: number) {

        // Choose the Switch which you want to update

        await this.page.waitForTimeout(2000)
        await this.cloud.switch_group_softupdate.clickCheckSwitch(name, id)
        await this.cloud.switch_group_softupdate.getSoftwareVersion(id)
        await this.cloud.switch_group_softupdate.getSwitchGroup(id)

        // Update the Switch selected

        await this.cloud.switch_group_softupdate.clickActions()
        await this.cloud.switch_group_softupdate.clickSoftUpdate()
        await this.page.waitForTimeout(2000)
        await this.cloud.switch_group_softupdate.chooseSoftwareImageForUpdate(image_version)
        await this.cloud.switch_group_softupdate.clickAddSoftwareUpdate()
        
        await this.page.waitForTimeout(2000)

        // Going to the software jobs

        await this.cloud.toolbar_obj.clickJobsPage()
        await this.cloud.jobs_obj.clickSoftwareUpdate()

        // Waiting for the Job Update

        await this.page.waitForTimeout(13000)
    }

    async updateAllDUTsSwitchGroup(name: string, image_version: string) {

        // Choose the Switch which you want to update

        await this.cloud.switch_group_softupdate.clickCheckAll()

        // Update the Switches selected

        await this.cloud.switch_group_softupdate.clickActions()
        await this.cloud.switch_group_softupdate.clickSoftUpdate()
        await this.page.waitForTimeout(2000)
        await this.cloud.switch_group_softupdate.chooseSoftwareImageForUpdate(image_version)
        await this.cloud.switch_group_softupdate.clickAddSoftwareUpdate()
        
        await this.page.waitForTimeout(2000)

        // Going to the software jobs

        await this.cloud.toolbar_obj.clickJobsPage()
        await this.cloud.jobs_obj.clickSoftwareUpdate()

        // Waiting for the Job Update

        await this.page.waitForTimeout(13000)
    }

    async confirmTargetAndClickShowMore(id:number, image_version: string) {

        const target = await this.cloud.jobs_softupdate_obj.getTarget(id)
        await this.cloud.jobs_softupdate_obj.clickShowMore(id)

        expect(target).toBe(image_version)

        console.log(`### The target is ${target} ###`)
        
    }

    async getDetailsDUT(index: number) {

        const device = await this.cloud.jobs_softupdate_obj.getDevice(index)
        const result = await this.cloud.jobs_softupdate_obj.getResult(index)
        const update_message = await this.cloud.jobs_softupdate_obj.getMessageUpdate(index)
        // await cloud.jobs_softupdate_obj.getLastUpdate(index)
        const original_version = await this.cloud.jobs_softupdate_obj.getOriginalVersion(index)

        return {
            device, result, update_message, original_version
        }
    }

    async confirmDetails(name: string, result_message_expected: string, update_message_expected: string, index: number) {

        const details = await this.getDetailsDUT(index)

        // Fetching and asserting the Results

        expect(details.device).toBe(name)
        expect(details.result).toBe(result_message_expected)
        expect(details.update_message).toBe(update_message_expected)
        // expect(details.original_version).toBe(data.image_to_downgrade)
        console.log(`The device is: ${details.device}`)
        console.log(`The result of the update/downgrade is: ${details.result}`)
        console.log(`The message of the update/downgrade is: ${details.update_message}`)
        console.log(`The original version of the DUT: ${details.original_version}`)
    }

    async confirmUpgradeDowngrade(name: string, image_version: string, index: number, waiting_time: number) {

        console.log("######## Getting the information before the update is completed ########")

        // Fetching and asserting the Results

        this.confirmDetails(name, "Initiated", "Initiated software update operation", index)

        // Waiting for the Software Update to be complete

        await this.page.waitForTimeout(waiting_time)

        console.log("######## Getting the information after the update is completed ########")

        // Fetching and asserting the Results

        this.confirmDetails(name, "Completed", `Successfully updated the device version to ${image_version}`, index)

        await this.page.waitForTimeout(2000)
    }

    async confirmAllUpgradeDowngrade(name1: string, name2: string, image_version: string, index1: number, index2: number, waiting_time: number) {

        console.log("######## Getting the information before the update is completed ########")

        // Fetching and asserting the Results

        this.confirmDetails(name1, "Initiated", "Initiated software update operation", index1)
        this.confirmDetails(name2, "Initiated", "Initiated software update operation", index2)

        // Waiting for the Software Update to be complete

        await this.page.waitForTimeout(waiting_time)

        console.log("######## Getting the information after the update is completed ########")

        // Fetching and asserting the Results

        this.confirmDetails(name1, "Completed", `Successfully updated the device version to ${image_version}`, index1)
        this.confirmDetails(name2, "Completed", `Successfully updated the device version to ${image_version}`, index2)

        await this.page.waitForTimeout(2000)
    }
}

