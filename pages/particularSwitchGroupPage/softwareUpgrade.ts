import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";

export class SoftwareUpgrade {

    private readonly actionsMenu : Locator = this.page.locator('[default-label="Actions"]')
    private readonly configurationButton : Locator = this.page.locator('[class="ng-binding ng-scope"]',{hasText: "Configuration"})
    private readonly softupgradeButton : Locator = this.page.locator('[class="ng-binding ng-scope"]',{hasText: "Software Upgrade"})
    private readonly searchBar: Locator = this.page.locator('[type="search"]').nth(1)
    private readonly checkbox : Locator = this.page.locator('[type="checkbox"]')
    private readonly softwareImageDropdown : Locator = this.page.locator('[name="dropDownButton"]')
    private readonly addSoftwareJobToDeviceButton : Locator = this.page.locator('[type="button"]', {hasText: "Add Software Job to  device(s)"})
    private readonly viewJobs : Locator = this.page.locator('[class="cn-link"]', {hasText: "View Update Jobs"})
    private readonly disableAutoRebootCheckbox : Locator = this.page.locator('[class="i-checks i-checks-sm"]', {hasText: "Disable Auto Reboot"})
    private readonly softwareVersion : Locator = this.page.locator('[data-column-id="actSw"]')
    private readonly dropdownImageMenu : Locator = this.page.locator('[class="dropdown-menu h-down"]')
    private readonly switchGroupName : Locator = this.page.locator('[data-column-id="swGroup"]')

    private getRowContent = (switchGroupName: string) => this.page.getByRole('row', {name: `${switchGroupName}`})
    private checkBoxOfSwitch = (switchGroupName: string) => this.getRowContent(switchGroupName).locator('[type="checkbox"]')
    private getSoftwareVersionSwitchLocator = (switchGroupName: string) => this.getRowContent(switchGroupName).locator('[data-column-id="actSw"]')
    private getSwitchGroupNameOfSwitchLocator = (switchGroupName: string) => this.getRowContent(switchGroupName).locator('[data-column-id="swGroup"]')

    constructor(public page:Page) {

    }

    async clickActions() : Promise <void> {

        if (await this.actionsMenu.isEnabled()) {

            await this.actionsMenu.click()
        }
        
        else {
            console.log("The button 'Actions' is disabled")
        }
        
    }
    
    async searchSwitch(switchName: string) : Promise <void> {

        await this.searchBar.fill(switchName)
        await this.searchBar.press("Enter")
    }

    async clickCheckBoxSwitch(switchName: string) : Promise <void> {

        await this.searchSwitch(switchName)
        await this.checkBoxOfSwitch(switchName).click({timeout: 10000})
        
    }

    async clickCheckAll() : Promise <void> {

        await this.checkbox.first().click({timeout: 10000})
    }


    async clickConfiguration() : Promise <void> {

        await this.configurationButton.click()
    }

    async clickSoftUpdate() : Promise <void> {

        await this.softupgradeButton.click()
    }

    async chooseSoftwareImageForUpdate(image:string) : Promise <void> {

        await this.softwareImageDropdown.click({timeout: 10000})
        await this.dropdownImageMenu.locator(`[title="${image}"]`).click({timeout: 10000})
    }

    async clickAddSoftwareUpdate() : Promise <void> {

        await this.addSoftwareJobToDeviceButton.click()
    }

    async clickViewJobs() : Promise <void> {

        await this.viewJobs.click()
    }

    async disableAutoRebootCheckBox()  : Promise <void> {

        await this.disableAutoRebootCheckbox.check()
    }

    async getSoftwareVersion(switchName: string) {

        return await this.getSoftwareVersionSwitchLocator(switchName).textContent()
    }

    async getSwitchGroup(switchName: string) {

        return await this.getSwitchGroupNameOfSwitchLocator(switchName).textContent()
    }
}