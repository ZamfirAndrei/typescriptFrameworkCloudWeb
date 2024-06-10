import { Page, Locator } from "@playwright/test"
import loginPage from "../loginPage/loginPage"
import { test, expect} from "@playwright/test";

export class ConfigurationPage{

    private readonly status : Locator = this.page.locator('[class="col-md-8 b b-form-muted r p-y-4 ng-scope"]')
    private readonly switchGroupMenu : Locator = this.page.locator('[class="btn-group w-full"]').nth(2)
    private readonly switchGroupSearchBar : Locator = this.page.locator('[name="searchInp"]').nth(2)
    private readonly applyConfigurationButton : Locator = this.page.locator('[class="ng-binding"]', {hasText: "Apply Configuration"})
    private readonly applyConfigurationMessage: Locator = this.page.locator('[id="cns-toaster-msg"]')
    private readonly editButton : Locator = this.page.locator('[class="cn-link v-middle ng-binding"]').getByText("Edit", {exact: true})
    private readonly editPortsButton : Locator = this.page.locator('[class="cn-link v-middle ng-binding"]', {hasText: "Edit Ports"})

    private readonly getSyncStatusLocator = () => {return this.status.locator('[class="inline ng-binding"]')}

    constructor(public page:Page){

    }

    async clickSwitchGroup(): Promise<void> {

        await this.switchGroupMenu.click()
    }

    async clickEdit(): Promise<void>  {

        await this.editButton.click()
    }

    async clickEditPorts(): Promise<void>  {

        await this.editPortsButton.click()
    }

    async selectSwitchGroup(switchGroup: string): Promise<void>  {

        await this.switchGroupMenu.click({timeout: 2000})
        await this.switchGroupSearchBar.fill(switchGroup)
        await this.page.locator(`[title="${switchGroup}"]`).click({timeout: 2000})
        
    }

    async getValueSwitchGroup()  {

        const value = await this.switchGroupMenu.locator('[name="dropDownButton"]').textContent()

        return value?.trim()
    }

    async clickApplyConfiguration(): Promise<void>  {

        await this.applyConfigurationButton.click()
    }
    
    async getMessageApplyConfiguration() {

        const message = await this.applyConfigurationMessage.textContent()

        return message?.trim()
    }

    async getSyncStatusDevice() {
        
        const syncStatusDeviceText = await this.status.locator('[class="inline ng-binding"]').textContent()
        
        return syncStatusDeviceText?.trim()
    }

    async getIpAddressDevice() {

        const ipAddress = await this.page.locator('[class="cn-link ng-binding ng-scope"]').textContent()

        return ipAddress?.trim()
    }

    async getSerialNumberDevice() {

        const serialNumber = await this.page.locator('[class="col-md-8 read-form-control ng-binding"]').nth(0).textContent()

        return serialNumber?.trim()
    }

    async getMacAddressDevice() {

        const macAddress = await this.page.locator('[class="col-md-8 read-form-control ng-binding"]').nth(1).textContent()

        return macAddress?.trim()
    }

    async expectSyncStatusDeviceToBe(syncStatusDevice: string): Promise<void> {

        await expect(this.getSyncStatusLocator()).toHaveText(syncStatusDevice,
            {timeout: 20000})
    }
}