import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";

export class SwitchesPage {

    private readonly searchBar : Locator = this.page.locator('[placeholder="Search"]').nth(1)
    private getSwitchNameLocator = (switchName: string) => {return this.page.locator('[title="View Dashboard Details"]').getByText(switchName)}

    constructor(public page: Page) {

    }

    async searchForSwitch(switchName: string){

        await this.searchBar.fill(switchName)
        await this.searchBar.press('Enter')
        
    }

    async clickSwitch(switchName: string) {

        await this.searchForSwitch(switchName)
        await this.page.waitForTimeout(2000)
        await this.getSwitchNameLocator(switchName).click()
    }
}