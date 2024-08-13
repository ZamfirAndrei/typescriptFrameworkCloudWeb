import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";


export class PortPage {

    private readonly basicMenu : Locator = this.page.locator('[title="Basic"]').nth(0)
    private readonly physicalMenu : Locator = this.page.locator('[title="Physical"]').nth(0)
    private readonly networkMenu : Locator = this.page.locator('[title="Network"]').nth(0)
    private readonly securityMenu : Locator = this.page.locator('[title="Security"]').nth(0)

    private saveButton = () => this.page.locator('[class="btn btn-primary w-xs ng-binding"]')
    private checkSaveButtonIsDisabled = () => this.saveButton().isDisabled()

    constructor (public page: Page) {

    }

    async clickBasic() : Promise<void> {

        await this.basicMenu.click()
    }

    async clickPhysical() : Promise<void> {

        await this.physicalMenu.click()
    }

    async clickNetwork() : Promise<void> {

        await this.networkMenu.click()
    }

    async clickSecurity() : Promise<void> {

        await this.securityMenu.click()
    }

    async clickSaveConfig() : Promise<void> {

        if(await this.checkSaveButtonIsDisabled()){

            console.log("The button is disabled")
        }
        else {

          await this.saveButton().click()
        }
    }
}