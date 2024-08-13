import { Page, Locator, expect } from "@playwright/test"


export class AddSwitchgroupPage {
    
    public readonly basic: Locator = this.page.locator('[title="Basic"]')
    public readonly management: Locator = this.page.locator('[title="Management"]')
    public readonly network: Locator = this.page.locator('[title="Network"]')
    public readonly security: Locator = this.page.locator('[title="Security"]')
    public readonly showAdvanced: Locator = this.page.locator('[class="i-switch bg-primary v-middle pull-right xmd-pull-none m-l-xs"]')
    public readonly messageAfterSave : Locator = this.page.locator('[id="cns-toaster-msg"]')
    public saveButton : Locator = this.page.locator('[class="btn btn-primary w-xs m-r-sm ng-binding"]')
    public disableSaveButton : Locator = this.page.locator('[class="col-md-10 wrapper-sm b-l m-n form-actns"]').locator('[disabled="disabled"]')

    private getSwitchGroupNameLocator = (switchGroupName: string) => {return this.page.locator('[class="cn-link ng-binding"]').getByText(`${switchGroupName}`, {exact:true})}

    constructor (public page: Page) {

    }

    async clickBasic(): Promise <void> {

        await this.basic.click()
    }

    async clickManagement(): Promise <void> {

        await this.management.click()
    }

    async clickNetwork(): Promise <void> {

        await this.network.click()
    }

    async clickSecurity(): Promise <void> {

        await this.security.click()
    }

    async checkShowAdvancedButton(): Promise <void> {

       await this.showAdvanced.check()
        
    }

    async unCheckShowAdvancedButton(): Promise <void> {

        await this.showAdvanced.uncheck()
         
    }

    async clickSave(): Promise <void> {

        await this.saveButton.click()
            
    }

    async checkIfSaveButtonIsEnabled() {

        if (await this.disableSaveButton.isVisible()){

            console.log("The button is disabled")
            return await this.disableSaveButton.isVisible()
        }
        
        else {

            console.log("The button is enabled")
            return await this.disableSaveButton.isVisible()
        }
    }

    async getMessageAfterSave() {

        const message = await this.messageAfterSave.textContent()

        return message?.trim()
    }

    async searchForSwithGroupOnTheMainPage(switchGroupName: string) {

        return this.getSwitchGroupNameLocator(switchGroupName).textContent()
    }

    async expectSwitchGroupToBeCreated(switchGroup: string): Promise <void> {

        await expect(this.getSwitchGroupNameLocator(switchGroup)).toHaveText(switchGroup, {timeout: 20000})
    }

}

