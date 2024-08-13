import { Page, Locator } from "@playwright/test"
import { waitForDebugger } from "inspector"
import { test, expect} from "@playwright/test";

export class JobsPage {

    private readonly configurationUpdateMenu = this.page.locator('[cns-auto="Configuration Update"]')
    private readonly softwareUpdateMenu = this.page.locator('[cns-auto="Software Update"]')
    private readonly reportsMenu = this.page.locator('[cns-auto="Reports"]')
    private readonly actionsMenu = this.page.locator('[cns-auto="Actions"]')

    constructor(public page: Page) {

    }

    async clickConfigurationUpdate(){

        await this.configurationUpdateMenu.click()
    }

    async clickSoftwareUpdate(){

        await this.softwareUpdateMenu.click()
    }

    async clickReports(){

        await this.reportsMenu.click()
    }

    async clickActions(){

        await this.actionsMenu.click()
    }
}