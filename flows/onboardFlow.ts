import { CloudObjects } from "../management/cloudObjects";
import { Page } from "@playwright/test";
import { test, expect} from "@playwright/test";

export class OnBoardFlow {

    private readonly cloud : CloudObjects

    constructor(public page:Page) {

        this.cloud = new CloudObjects(this.page)
    }

    async expectPageTitle(expectedPageTitle : string) {

        const pageTitle = await this.cloud.page.title()
        // console.log(pageTitle)

        expect(pageTitle).toBe(expectedPageTitle)
    }

    async goToSwitchesList() {

        await this.cloud.toolbarObj.clickDevicePage()
        await this.cloud.deviceObj.clickSwitches()
        await this.cloud.page.waitForTimeout(2000)
    }

    async confirmOnboardDevice() {

        // Waiting for Device
        // Onboarded
    }

    async onboardDevice(deviceSerialNumber : string) {

        await this.cloud.toolbarObj.clickOnBoardPage()
        await this.cloud.onboardObj.claimDevice(deviceSerialNumber)
        await this.cloud.onboardObj.closeClaimDevice()

    }

    async aproveDevice(index: number) {

        await this.cloud.page.reload()
        await this.cloud.page.waitForTimeout(2000)
        const status = await this.cloud.onboardObj.approveDevice(index)
        console.log(status)

        return status
    }

    async aproveDeviceBySerialNumber(switchSerialNumber: string) {

        await this.cloud.page.reload()
        await this.cloud.page.waitForTimeout(2000)
        const status = await this.cloud.onboardObj.approveDeviceBySerialNumber(switchSerialNumber)
        console.log(status)

        return status
    }

    async confirmDeviceAlreadyOnboarded(switchSerialNumber : string) {
        
        // Checking the device Onboarding status before approve

        // const deviceStatusBefore = await this.cloud.onboardObj.getOnboardingStatus(index)
        const deviceStatusBefore = await this.cloud.onboardObj.getOnboardingStatusBySerialNumber(switchSerialNumber)

        expect(deviceStatusBefore).toBe("Onboarded")

        // const status = await this.aproveDevice(index)
        const status = await this.aproveDeviceBySerialNumber(switchSerialNumber)
        console.log(status)

        expect(status).toBe(false)
 
        // Checking the device Onboarding status after approve
 
        // const deviceStatusAfter = await this.cloud.onboardObj.getOnboardingStatus(index)
        const deviceStatusAfter = await this.cloud.onboardObj.getOnboardingStatusBySerialNumber(switchSerialNumber)

        expect(deviceStatusAfter).toBe("Onboarded")
        expect(deviceStatusBefore).toBe(deviceStatusAfter)
        
    }

    async confirmDeviceOnboarded(switchSerialNumber : string, onboardStatus: string) {
        
        // Checking the device Onboarding status before approve

        await this.page.waitForTimeout(2000)

        const status = await this.aproveDeviceBySerialNumber(switchSerialNumber)
        console.log(status)

        expect(status).toBe(true)

        await this.cloud.onboardObj.expectOnboardStatusDeviceToBe(switchSerialNumber, onboardStatus)

        await this.cloud.page.waitForTimeout(2000)
        
    }

    async confirmDeviceisAvailableInTheCloud(switchName : string) {

        // Checking the Device is added in the Cloud

        await this.cloud.toolbarObj.clickDevicePage()
        await this.cloud.deviceObj.clickSwitches()
        await this.cloud.page.waitForTimeout(2000)
        await this.cloud.deviceObj.searchToolbar(switchName)

        const nrOfDevices = await this.cloud.deviceObj.numberOfDevicesFound()
        // console.log(nrOfDevices)

        // const deviceName = await this.cloud.deviceObj.getDeviceName(index)
        // const deviceName = await this.cloud.deviceObj.getDeviceNameByName(switchName)
        // console.log(deviceName)

        // expect(nrOfDevices).toBe("1")
        // expect(deviceName).toBe(switchName)
        await this.cloud.deviceObj.expectDeviceToBeAvailable(switchName)
        
    }

    async confirmDeleteDUTfromCloud(switchName : string) {

        await this.cloud.deviceObj.deleteDevice(switchName)
        await this.cloud.page.waitForTimeout(3500)

        const [messageDelete1, messageDelete2] = await this.cloud.deviceObj.getDeleteMessage()

        console.log(messageDelete1)
        console.log(messageDelete2)

        expect(messageDelete1).toBe("Success")
        expect(messageDelete2).toBe("Deletion of 1 devices has been started.")

        await this.cloud.page.waitForTimeout(6000)

        const [messageDelete3, messageDelete4] = await this.cloud.deviceObj.getDeleteMessage()

        console.log(messageDelete3)
        console.log(messageDelete4)

        expect(messageDelete3).toBe("Success")
        expect(messageDelete4).toBe("The device deletion operation completed.")

        await this.cloud.page.waitForTimeout(2000)
    }

    async confirmDeleteDeviceFromCloud(switchName : string) {

        await this.cloud.deviceObj.deleteDevice(switchName)
        await this.cloud.deviceObj.expectDeleteMessage1ToBe("Success")
        await this.cloud.deviceObj.expectDeleteMessage2ToBe("The device deletion operation completed.")
    }

    async confirmDeviceIsOnboarded(serialNumber : string) {

        await this.cloud.onboardObj.expectDeviceToBeAlreadyOnboarded(serialNumber)
        
    }
}