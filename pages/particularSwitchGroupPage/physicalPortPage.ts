import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";

export class PhysicalPortPage {

    private readonly administrativeStateMenu : Locator = this.page.locator('[id="shutdown"]')
    private readonly speedMenu : Locator = this.page.locator('[id="speed"]')

    constructor (public page: Page) {

    }

    async changeAdministrativeStatePort(state: string) {

        await this.page.waitForTimeout(1000)
        await this.administrativeStateMenu.click({timeout: 2000})
        await this.page.click(`[title="${state}"]`)
    }

    async changeSpeedPort(speed: string) {

        await this.page.waitForTimeout(1000)
        await this.speedMenu.click({timeout: 2000})
        await this.page.click(`[title="${speed}"]`)
    }

}