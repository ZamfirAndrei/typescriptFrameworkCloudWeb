import { Page, Locator } from "@playwright/test"
import { waitForDebugger } from "inspector"
import path from "path"

export class OnBoardPage {

    private readonly claim_device_button : Locator = this.page.locator('[title="Claim device from cnMaestro"]')
    private readonly claim_device_box : Locator = this.page.locator('[name="claimdevice"]')
    private readonly claim_device_button_final : Locator = this.page.locator('[translate="onboarding.claimDevices"]')
    private readonly close_claim_device_button : Locator = this.page.locator('[translate="common.Close"]')
    private readonly back_claim_device_button : Locator = this.page.locator('[translate="common.Back"]')
    private readonly actions : Locator = this.page.locator('[class=" dt-actions"]')

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

    async getRowContent(index:number) {

        const row = this.page.getByRole('row').nth(index)

        return row
    } 

    async approveDevice(index:number) {

        const row = await this.getRowContent(index)
        await row.locator('[class=" dt-actions"]').hover()
        await this.actions.locator('[title="Approve Device"]').nth(index-1).click()
    }
    
    async editDevice(index:number) {

        const row = await this.getRowContent(index)
        await row.locator('[class=" dt-actions"]').hover()
        await this.actions.locator('[class="cnico cnico-action-edit "]').nth(index-1).click()
    }

    async deleteDevice(index:number, answer:string) {

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
}