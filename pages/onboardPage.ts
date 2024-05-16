import { Page, Locator } from "@playwright/test"
import { waitForDebugger } from "inspector"
import path from "path"
import { test, expect} from "@playwright/test";

export class OnBoardPage {

    private readonly claim_device_button : Locator = this.page.locator('[title="Claim device from cnMaestro"]')
    private readonly claim_device_box : Locator = this.page.locator('[id="sns"]')
    private readonly claim_device_button_final : Locator = this.page.locator('[cns-auto="claimDeviceBtn"]')
    private readonly close_claim_device_button : Locator = this.page.locator('[cns-auto="closeBtn"]')
    private readonly back_claim_device_button : Locator = this.page.locator('[cns-auto="backBtn"]')
    private readonly actions : Locator = this.page.locator('[class=" dt-actions"]')
    private readonly claim_device_info : Locator = this.page.locator('[class="inline m-t-sm ng-scope"]')
    

    constructor(public page:Page) {

    }

    async claimDevice(serial_number:string) {

        await this.claim_device_button.click()
        // await this.page.waitForTimeout(1500)
        await this.claim_device_box.fill(serial_number)
        await this.claim_device_button_final.click()
    }

    async closeClaimDevice() {

        await this.close_claim_device_button.click()
    }  
    
    async backClaimDevice() {

        await this.back_claim_device_button.click()
    }   

    async getRowContent(index: number) {

        const row = this.page.getByRole('row').nth(index)

        return row
    } 

    async getRowContentBySerialNumber(switch_serial_number: string) {

        const row = this.page.locator("[role='row']", {hasText: `${switch_serial_number}`})

        return row
    }  

    async approveDevice(index: number) {

        const row = await this.getRowContent(index)
        await row.locator('[class=" dt-actions"]').hover()

        const status = await this.actions.locator('[title="Approve Device"]').nth(index-1).isVisible()
        // console.log(status)

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
        const onboard_status = await row.locator('[data-column-id="status"]').textContent()
        const onboard_status_locator = row.locator('[data-column-id="status"]')
        console.log(onboard_status?.trim())
        
        return onboard_status?.trim()
    }


    async getOnboardingStatusBySerialNumber(switch_serial_number : string) {

        const row = await this.getRowContentBySerialNumber(switch_serial_number)
        // console.log(await row.textContent())
        const onboard_status = await row.locator('[data-column-id="status"]').textContent()
        console.log(onboard_status?.trim())
        
        return onboard_status?.trim()
    }

    // Using functions without async. Are doing the same thing as the async ones

    private getRowContentByserialNumber = (switch_serial_number: string) =>{

        const row = this.page.locator("[role='row']", {hasText: `${switch_serial_number}`})
        
        return row
    }

    private getOnboardingStatusLocator = (serial_number : string) => {

        const row =  this.getRowContentByserialNumber(serial_number)
        const onboard_status_locator = row.locator('[data-column-id="status"]')
        
        return onboard_status_locator
    }

    async getOnboardingstatusLocator (serial_number : string) : Promise <Locator>  {

        const row = await this.getRowContentBySerialNumber(serial_number)
        const onboard_status_locator = row.locator('[data-column-id="status"]')
        
        return onboard_status_locator
    }

    async approveDeviceBySerialNumber(switch_serial_number: string) {

        const row = await this.getRowContentBySerialNumber(switch_serial_number)
        await row.locator('[class=" dt-actions"]').hover()

        const status = await row.locator('[class=" dt-actions"]').locator('[title="Approve Device"]').isVisible()
        // console.log(status)

        if (await row.locator('[class=" dt-actions"]').locator('[title="Approve Device"]').isVisible())
        {
            await row.locator('[class=" dt-actions"]').locator('[title="Approve Device"]').click()
        }
        else {

            console.log("The device is already approved")
        }

        return status
    }

    async expectOnboardStatusDeviceToBe(serial_number: string, onboard_status_device: string) {

        // console.log(onboard_status_device)
        const onboard_status_locator = await this.getRowContentBySerialNumber(serial_number)

        console.log("############## Before expect ##############")
        var onboard_status_text = await onboard_status_locator.locator('[data-column-id="status"]').textContent()
        console.log(onboard_status_text?.trim())
        
        // console.log("The test is + " + await this.status.locator('[class="inline ng-binding"]').textContent())
        expect(await this.getOnboardingStatusLocator(serial_number)).toHaveText(onboard_status_device,
            {timeout: 300000})

        console.log("############## After expect ##############")
        var onboard_status_text = await onboard_status_locator.locator('[data-column-id="status"]').textContent()
        console.log(onboard_status_text?.trim())
        // console.log("The test is + " + await this.status.locator('[class="inline ng-binding"]').textContent())
    }

    async expectDeviceToBeAlreadyOnboarded(serial_number : string) {

        console.log(await this.claim_device_info.textContent())

        await expect(this.claim_device_info)
        .toHaveText("Info:  1 Serial Number(s) already claimed. Please  onboard  these devices,  if not onboarded yet.",
            {timeout: 3000})

    }


}