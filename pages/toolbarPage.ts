import { Page, Locator } from "@playwright/test"

// This is the toolbar page of cnMaestro

export default class ToolbarPage {

    private readonly devicesPg: Locator = this.page.locator('[title="Devices"]');
    private readonly homePg: Locator = this.page.locator('[title="Home"]')
    private readonly systemPg: Locator = this.page.locator('[title="System"]')
    private readonly wifiprofilePg: Locator = this.page.locator('[title="Wi-Fi Profiles"]')
    private readonly nsegroupsPg: Locator = this.page.locator('[title="NSE Groups"]').nth(0)
    private readonly switchgroupsPg: Locator = this.page.locator('[title="Switch Groups"]').nth(0)
    private readonly sitesPg: Locator = this.page.locator('[title="Sites"]').nth(0)
    private readonly onboardPg: Locator = this.page.locator('[title="Onboard"]')
    private readonly configurationPg: Locator = this.page.locator('[title="Configuration"]')
    private readonly networkservicesPg: Locator = this.page.locator('[title="Network Services"]')
    private readonly administrationPg: Locator = this.page.locator('[title="Administration"]')
    private readonly managesubscriptionsPg: Locator = this.page.locator('[title="Manage Subscriptions"]')
    

    constructor (public page: Page) {

    }

    async clickDevicePage()
    {
        await this.devicesPg.click()
    }

    async clickSwitchGroupsPage()
    {
        await this.switchgroupsPg.click()
    }

    async clickHomePage()
    {
        await this.homePg.click()
    }

    async clickOnBoardPage()
    {
        await this.onboardPg.click()
    }

    async clickJobsPage() {

        await this.administrationPg.hover()
        await this.page.locator('[cns-auto="Nav-Jobs"]').click()
    }
}