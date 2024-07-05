import { CloudObjects } from "../management/cloudObjects";
import { Page } from "@playwright/test";
import { test, expect} from "@playwright/test";

export class OnBoardFlow {

    private readonly cloud : CloudObjects

    constructor(public page:Page) {

        this.cloud = new CloudObjects(this.page)
    }

    async confirmPageTitle(expectedPageTitle : string) : Promise <void> {

        expect(await this.cloud.page.title()).toBe(expectedPageTitle)
    }

    async goToSwitchesList() : Promise <void> {

        await this.cloud.toolbarObj.clickDevicePage()
        await this.cloud.deviceObj.clickSwitches()
    }

    async onboardDevice(deviceSerialNumber : string)  : Promise <void> {

        await this.cloud.toolbarObj.clickOnBoardPage()
        await this.cloud.onboardObj.claimDevice(deviceSerialNumber)
        await this.cloud.onboardObj.closeClaimDevice()

    }

    async aproveDevice(index: number) {

        await this.cloud.page.reload()
        await this.cloud.page.waitForTimeout(2000)
        const status = await this.cloud.onboardObj.approveDevice(index)

        return status
    }

    async aproveDeviceBySerialNumber(switchSerialNumber: string) : Promise <void> {

        await this.cloud.page.reload()
        await this.cloud.page.waitForTimeout(2000)
        await this.cloud.onboardObj.approveDeviceBySerialNumber(switchSerialNumber)
    }

    async confirmDeviceOnboarded(switchSerialNumber : string, onboardStatus: string) : Promise <void> {

        await this.aproveDeviceBySerialNumber(switchSerialNumber)
        await this.cloud.onboardObj.expectApproveDeviceStatusToBe(switchSerialNumber, true)
        await this.cloud.onboardObj.expectOnboardStatusDeviceToBe(switchSerialNumber, onboardStatus)
        
    }

    async confirmDeviceisAvailableInTheCloud(switchName : string) : Promise <void> {

        await this.cloud.toolbarObj.clickDevicePage()
        await this.cloud.deviceObj.clickSwitches()
        await this.cloud.deviceObj.searchToolbar(switchName)
        await this.cloud.deviceObj.expectDeviceToBeAvailable(switchName)
        
    }

    async confirmDeviceDeletedFromCloud(switchName : string) : Promise <void> {

        await this.cloud.deviceObj.deleteDevice(switchName)
        await this.cloud.deviceObj.expectDeleteMessage1ToBe("Success")
        await this.cloud.deviceObj.expectDeleteMessage2ToBe("The device deletion operation completed.")
    }

    async confirmDeviceIsOnboarded(serialNumber : string) : Promise <void> {

        await this.cloud.onboardObj.expectDeviceToBeAlreadyOnboarded(serialNumber)
    }
}