import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";

export class PhysicalPortPage {

    private readonly administrativeStateMenu : Locator = this.page.locator('[id="shutdown"]')
    private readonly speedMenu : Locator = this.page.locator('[id="speed"]')

    constructor (public page: Page) {

    }

    async changeAdministrativeStatePort(state: string): Promise<void> {

        await this.page.waitForTimeout(1000)
        await this.administrativeStateMenu.click({timeout: 2000})
    }

    async changeSpeedPort(speed: string): Promise<void> {

        await this.page.waitForTimeout(1000)
        await this.speedMenu.click({timeout: 2000})
    }

}