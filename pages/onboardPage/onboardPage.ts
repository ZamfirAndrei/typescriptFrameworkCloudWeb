import { Page, Locator } from "@playwright/test"
import { waitForDebugger } from "inspector"
import path from "path"
import { test, expect} from "@playwright/test";
import { TIMEOUT } from "dns";
import { setTimeout } from "timers";

export class OnBoardPage {

    private readonly claimDeviceButton : Locator = this.page.locator('[title="Claim device from cnMaestro"]')
    private readonly claim_device_box : Locator = this.page.locator('[id="sns"]')
    private readonly claimDeviceButtonFinal : Locator = this.page.locator('[cns-auto="claimDeviceBtn"]')
    private readonly closeClaimDeviceButton : Locator = this.page.locator('[cns-auto="closeBtn"]')
    private readonly backClaimDeviceButton : Locator = this.page.locator('[cns-auto="backBtn"]')
    private readonly actions : Locator = this.page.locator('[class=" dt-actions"]')
    private readonly claimDeviceInfo : Locator = this.page.locator('[class="inline m-t-sm ng-scope"]')

    private getRowContentByserialNumber = (switchSerialNumber: string) =>{return this.page.locator("[role='row']", {hasText: `${switchSerialNumber}`})}
    private getOnboardingStatusLocator = (serialNumber : string) => {return this.getRowContentByserialNumber(serialNumber).locator('[data-column-id="status"]')}
    private getActionsLocator = (serialNumber : string) => {return this.getRowContentByserialNumber(serialNumber).locator('[class=" dt-actions"]')}
    private getApproveStatusLocator = (serialNumber : string) => {return this.getRowContentByserialNumber(serialNumber).locator('[class=" dt-actions"]').locator('[title="Approve Device"]')}

    constructor(public page:Page) {

    }

    async claimDevice(serialNumber:string) {

        await this.claimDeviceButton.click()
        // await this.page.waitForTimeout(1500)
        await this.claim_device_box.fill(serialNumber)
        await this.claimDeviceButtonFinal.click()
    }

    async closeClaimDevice() {

        await this.closeClaimDeviceButton.click()
    }  
    
    async backClaimDevice() {

        await this.backClaimDeviceButton.click()
    }   

    async getRowContent(index: number) {

        const row = this.page.getByRole('row').nth(index)

        return row
    } 

    async getRowContentBySerialNumber(switchSerialNumber: string) {

        const row = this.page.locator("[role='row']", {hasText: `${switchSerialNumber}`})

        return row
    }  

    async approveDevice(index: number) {

        const row = await this.getRowContent(index)
        await row.locator('[class=" dt-actions"]').hover()

        const status = await this.actions.locator('[title="Approve Device"]').nth(index-1).isVisible()

        if (await this.actions.locator('[title="Approve Device"]').nth(index-1).isVisible())
        {
            await this.actions.locator('[title="Approve Device"]').nth(index-1).click()
        }
        else {

            console.log("The device is already approved")
        }

        return status
    }
    
    async editDevice(index: number) {

        const row = await this.getRowContent(index)
        await row.locator('[class=" dt-actions"]').hover()
        await this.actions.locator('[class="cnico cnico-action-edit "]').nth(index-1).click()
    }

    async deleteDevice(index: number, answer: string) {

        const row = await this.getRowContent(index)
        await row.locator('[class=" dt-actions"]').hover()
        await this.actions.locator('[title="Delete Device"]').nth(index-1).click()

        if (answer == "Yes") {

            await this.page.locator('[class="btn btn-primary w-xs"]').nth(index-1).click()
        }

        else {

            await this.page.locator('[class="btn btn-plain w-xs"]').nth(index-1).click()
        }
    }

    async getOnboardingStatus(index : number) {

        const row = await this.getRowContent(index)
        const onboardStatus = await row.locator('[data-column-id="status"]').textContent()

        return onboardStatus?.trim()
    }


    async getOnboardingStatusBySerialNumber(switchSerialNumber : string) {

        const row = await this.getRowContentBySerialNumber(switchSerialNumber)
        const onboardStatus = await row.locator('[data-column-id="status"]').textContent()
        console.log(onboardStatus?.trim())
        
        return onboardStatus?.trim()
    }

    async getOnboardingstatusLocator (serialNumber : string) : Promise <Locator>  {

        const row = await this.getRowContentBySerialNumber(serialNumber)
        const onboardStatusLocator = row.locator('[data-column-id="status"]')
        
        return onboardStatusLocator
    }

    async approveDeviceBySerialNumber(switchSerialNumber: string) {

        await this.getActionsLocator(switchSerialNumber).hover()

        if (await this.getApproveStatusLocator(switchSerialNumber).isVisible()) {

            await this.getApproveStatusLocator(switchSerialNumber).click()
            return true
        }

        else {

            console.log("The device is already approved")
            return false
        }
    }
    async expectApproveDeviceStatusToBe(switchSerialNumber: string, expectedResult: Boolean) {

        expect(await this.getApproveStatusLocator(switchSerialNumber).isVisible()).toBe(expectedResult)
    }


    async expectOnboardStatusDeviceToBe(serialNumber: string, onboardStatusDevice: string) {

        // const onboardStatusLocator = await this.getRowContentBySerialNumber(serialNumber)

        // console.log("############## Before expect ##############")
        // var onboardStatusText = await onboardStatusLocator.locator('[data-column-id="status"]').textContent()
        // console.log(onboardStatusText)
        
        await expect(await this.getOnboardingStatusLocator(serialNumber)).toHaveText(onboardStatusDevice,
            {timeout: 300000})

        // console.log("############## After expect ##############")
        // var onboardStatusText = await onboardStatusLocator.locator('[data-column-id="status"]').textContent()
        // console.log(onboardStatusText)
    }

    async expectDeviceToBeAlreadyOnboarded(serialNumber : string) {

        await expect(this.claimDeviceInfo)
        .toHaveText("Info:  1 Serial Number(s) already claimed. Please  onboard  these devices,  if not onboarded yet.",
            {timeout: 3000})

    }

}