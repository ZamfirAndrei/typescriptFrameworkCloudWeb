import { Page } from "@playwright/test";
import { CloudObjects } from "../management/cloudObjects";
import { expect } from "@playwright/test";
import { time } from "console";
import { TIMEOUT } from "dns";


export class SoftwareUpdateFlow {

    private readonly cloud : CloudObjects

    constructor(public page:Page) {

        this.cloud = new CloudObjects(this.page)
    }

    async searchAndSelectDUT(name: string) : Promise <void> {

        // Searching and selecting the device which you want to upgrade

        await this.cloud.toolbarObj.clickDevicePage()
        await this.cloud.deviceObj.clickSwitches()
 
        await this.page.waitForTimeout(2000)
        await this.cloud.deviceObj.clickDevice(name)
        await this.page.waitForTimeout(2000)

    }

    async updateDUT(imageVersion: string, index: number) : Promise <void> {

        // Updating the Switch 

        await this.cloud.partDeviceObj.clickSoftwareUpgrade()
        await this.cloud.softUpdate.selectImgForUpdate(imageVersion)
        await this.cloud.softUpdate.addSoftwareJob()
        
        // Waiting for the Job Software Update to be completed

        await this.confirmUpdateIsCompleted(index)
    }

    async searchAndSelectSwitchGroup(switchGroup: string) : Promise <void> {

          // Selecting the Switch Group which you want to upgrade

          await this.cloud.toolbarObj.clickSwitchGroupsPage()

          await this.page.waitForTimeout(2000)
          await this.cloud.switchgroupObj.clickSwitchGroup(switchGroup)
          await this.page.waitForTimeout(2000)
          await this.cloud.partSwitchgroupObj.clickSwitches()

    }

    async updateDUTSwitchGroup(switchName: string, imageVersion: string, index: number) : Promise <void> {

        // Choose the Switch which you want to update

        await this.page.waitForLoadState()
        await this.page.waitForTimeout(2000)
        await this.cloud.switchGroupSoftupdate.clickCheckSwitch(switchName)

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

        // Waiting for the Job Software Update to be completed

        await this.confirmUpdateIsCompleted(index)

        // await this.page.waitForTimeout(13000)
    }

    async updateAllDUTsSwitchGroup(index: number, imageVersion: string) : Promise <void> {

        // Check all the Switches 

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

        // Waiting for the Job Software Update to be completed

        await this.confirmUpdateIsCompleted(index)
        // await this.page.waitForTimeout(13000)
    }

    async confirmTargetAndClickShowMore(index: number, imageVersion: string) : Promise <void> {

        await this.cloud.jobsSoftupdateObj.expectTargetToBe(index, imageVersion)
        // await this.cloud.jobsSoftupdateObj.clickShowMore(index)
        await this.cloud.jobsSoftupdateObj.clickShowMoree(index)

        console.log(`### The target is ${imageVersion} ###`)
        
    }

    async confirmDetails(switchName: string, nameExpected: string, resultMessageExpected: string, updateMessageExpected: string) : Promise <void> {

        await this.cloud.jobsSoftupdateObj.expectDeviceToBe(switchName, nameExpected)
        await this.cloud.jobsSoftupdateObj.expectResultToBe(switchName, resultMessageExpected)
        await this.cloud.jobsSoftupdateObj.expectMessageUpdateToBe(switchName, updateMessageExpected)
    }

    async confirmDetailsForMoreSwitches(switches: string[], namesExpected: string[], resultsMessageExpected: string[], updatesMessageExpected: string[]) : Promise <void> {

        for (let dut in switches) {

            this.confirmDetails(switches[dut], namesExpected[dut], resultsMessageExpected[dut], updatesMessageExpected[dut])
            console.log(`### The details of the upgrade/downgrade of switch ${switches[dut]} have been confirmed...`)
        }
    }

    async confirmUpgradeDowngrade(switchName: string, imageVersion: string) : Promise <void> {

        await this.confirmDetails(switchName, switchName, "Completed", `Successfully updated the device version to ${imageVersion}`)
        console.log(`### The details of the upgrade/downgrade of switch ${switchName} have been confirmed...`)
    }

    async confirmAllUpgradeDowngrade(name1: string, name2: string, imageVersion: string) : Promise <void> {

        // Fetching and asserting the Results

        await this.confirmDetails(name1, name1, "Completed", `Successfully updated the device version to ${imageVersion}`)
        await this.confirmDetails(name2, name2, "Completed", `Successfully updated the device version to ${imageVersion}`)

        console.log(`### The details of the upgrade/downgrade of switch ${name1} have been confirmed...`)
        console.log(`### The details of the upgrade/downgrade of switch ${name2} have been confirmed...`)
        await this.page.waitForTimeout(2000)
    }

    async confirmUpdateIsCompleted(index: number) : Promise <void>  {

        await this.cloud.configUpdateObj.expectJobStatusToBeCompleted(index)
        console.log("The update is completed")
    }
}

