import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";


export class PortPage {

    private readonly basicMenu : Locator = this.page.locator('[title="Basic"]').nth(0)
    private readonly physicalMenu : Locator = this.page.locator('[title="Physical"]').nth(0)
    private readonly networkMenu : Locator = this.page.locator('[title="Network"]').nth(0)
    private readonly securityMenu : Locator = this.page.locator('[title="Security"]').nth(0)

    constructor (public page: Page) {

    }

    async clickBasic() {

        await this.basicMenu.click()
    }

    async clickPhysical() {

        await this.physicalMenu.click()
    }

    async clickNetwork() {

        await this.networkMenu.click()
    }

    async clickSecurity() {

        await this.securityMenu.click()
    }

    async saveConfig() {

        const save = this.page.locator('[class="btn btn-primary w-xs ng-binding"]')
        
        if(await save.isDisabled()){

            console.log("The button is disabled")
        }
        else{
            
            await save.click()
            console.log("The configuration has been saved")
        }
    }
}