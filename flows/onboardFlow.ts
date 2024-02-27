import { CloudObjects } from "../management/cloudObjects";
import { Page } from "@playwright/test";
import { test, expect} from "@playwright/test";

export class OnBoardFlow {

    private readonly cloud : CloudObjects

    constructor(public page:Page) {

        this.cloud = new CloudObjects(this.page)
    }

    async expectPageTitle(expected_page_title : string) {

        const page_title = await this.cloud.page.title()
        console.log(page_title)

        expect(page_title).toBe(expected_page_title)
    }

    async goToSwitchesList() {

        await this.cloud.toolbar_obj.clickDevicePage()
        await this.cloud.device_obj.clickSwitches()
        await this.cloud.page.waitForTimeout(2000)
    }

    async confirmOnboardDevice() {

        // Waiting for Device
        // Onboarded
    }

    async onboardDevice(device_serial_number : string) {

        // Onboard Device

        await this.cloud.toolbar_obj.clickOnBoardPage()
        await this.cloud.onboard_obj.claimDevice(device_serial_number)
        await this.cloud.onboard_obj.closeClaimDevice()

    }

    async aproveDevice(index:number) {

        // Aproving the Device

        await this.cloud.page.reload()
        await this.cloud.page.waitForTimeout(2000)
        const status = await this.cloud.onboard_obj.approveDevice(index)
        // console.log(status)

        return status
    }

    async confirmDeviceAlreadyOnboarded(index : number) {
        
        // Checking the device Onboarding status before approve

        const device_status_before = await this.cloud.onboard_obj.getOnboardingStatus(index)

        expect(device_status_before).toBe("Onboarded")

        const status = await this.aproveDevice(index)
        // console.log(status)

        expect(status).toBe(false)
 
        // Checking the device Onboarding status after approve
 
         const device_status_after = await this.cloud.onboard_obj.getOnboardingStatus(index)

         expect(device_status_after).toBe("Onboarded")
         expect(device_status_before).toBe(device_status_after)
        
    }

    async confirmDeviceOnboarded(index : number) {
        
        // Checking the device Onboarding status before approve

        await this.page.waitForTimeout(2000)

        const device_status_before = await this.cloud.onboard_obj.getOnboardingStatus(1)

        expect(device_status_before).toBe("Waiting for Device")

        const status = await this.aproveDevice(index)
        console.log(status)

        expect(status).toBe(true)

        await this.cloud.page.waitForTimeout(300000)

        // Checking the device Onboarding status after 6 mins and after approve
 
         const device_status_after = await this.cloud.onboard_obj.getOnboardingStatus(1)

         expect(device_status_after).toBe("Onboarded")

         await this.cloud.page.waitForTimeout(2000)
        
    }

    async confirmDUTisAvailableInTheCloud(name : string, index : number) {

        // Checking the Device is added in the Cloud

        await this.cloud.toolbar_obj.clickDevicePage()
        await this.cloud.device_obj.clickSwitches()
        await this.cloud.page.waitForTimeout(2000)
        await this.cloud.device_obj.searchToolbar(name)

        const nr_of_devices = await this.cloud.device_obj.numberOfDevicesFound()
        // console.log(nr_of_devices)

        const device_name = await this.cloud.device_obj.getDeviceName(1)
        // console.log(device_name)

        expect(nr_of_devices).toBe("1")
        expect(device_name).toBe(name)
    }

    async confirmDeleteDUTfromCloud(name : string) {

        await this.cloud.device_obj.deleteDevice(name)
        await this.cloud.page.waitForTimeout(3500)

        const [message_delete_1, message_delete_2] = await this.cloud.device_obj.getDeleteMessage()

        console.log(message_delete_1)
        console.log(message_delete_2)

        expect(message_delete_1).toBe("Success")
        expect(message_delete_2).toBe("Deletion of 1 devices has been started.")

        await this.cloud.page.waitForTimeout(6000)

        const [message_delete_3, message_delete_4] = await this.cloud.device_obj.getDeleteMessage()

        console.log(message_delete_3)
        console.log(message_delete_4)

        expect(message_delete_3).toBe("Success")
        expect(message_delete_4).toBe("The device deletion operation completed.")

        await this.cloud.page.waitForTimeout(2000)
    }
}