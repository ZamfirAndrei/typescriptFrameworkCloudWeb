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

    async confirmTargetAndClickShowMore(id:number, image_version: string) {

        const target = await this.cloud.jobs_softupdate_obj.getTarget(id)
        await this.cloud.jobs_softupdate_obj.clickShowMore(id)

        expect(target).toBe(image_version)

        console.log(`### The target is ${target} ###`)
        
    }

    async getDetailsDUT() {

        const device = await this.cloud.jobs_softupdate_obj.getDevice()
        const result = await this.cloud.jobs_softupdate_obj.getResult()
        const update_message = await this.cloud.jobs_softupdate_obj.getMessageUpdate()
        // await cloud.jobs_softupdate_obj.getLastUpdate()
        const original_version = await this.cloud.jobs_softupdate_obj.getOriginalVersion()

        return {
            device, result, update_message, original_version
        }
    }

    async confirmDetails(name: string, result_message_expected: string, update_message_expected : string) {

        const details = await this.getDetailsDUT()

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

    async confirmUpgradeDowngrade(name: string, image_version: string) {

        console.log("######## Getting the information before the update is completed ########")

        // Fetching and asserting the Results

        this.confirmDetails(name, "Initiated", "Initiated software update operation")

        // Waiting 3.35 min for the Software Update to be complete

        await this.page.waitForTimeout(210000)

        console.log("######## Getting the information after the update is completed ########")

        // Fetching and asserting the Results

        this.confirmDetails(name, "Completed", `Successfully updated the device version to ${image_version}`)

        await this.page.waitForTimeout(2000)
    }
    
    
}

