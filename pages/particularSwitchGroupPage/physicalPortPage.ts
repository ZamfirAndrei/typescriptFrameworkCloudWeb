import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";

export class PhysicalPortPage {

    private readonly administrativeStateMenu : Locator = this.page.locator('[id="shutdown"]')
    private readonly speedMenu : Locator = this.page.locator('[id="speed"]')

    constructor (public page: Page) {

    }

    async changeAdministrativeStatePort(state: string) {

        await this.administrativeStateMenu.click()
        await this.page.click(`[title="${state}"]`)
        console.log(`The port has been ${state}d`)
    }

    async changeSpeedPort(speed: string) {

        await this.speedMenu.click()
        await this.page.click(`[title="${speed}"]`)
        console.log(`The port speed has been changed to ${speed}`)
    }

}