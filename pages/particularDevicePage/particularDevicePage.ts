import { Page, Locator } from "@playwright/test"
import loginPage from "../loginPage/loginPage"
import { test, expect} from "@playwright/test";

// This is the page of a particular Device 


export class ParticularDevicePage{

    private readonly deviceDiagram : Locator = this.page.locator('[class="col-md-12 no-padder ng-scope"]').nth(0)
    private readonly dashboardMenu : Locator = this.page.locator('[cns-auto="Dashboard"]')
    private readonly notificationsMenu : Locator = this.page.locator('[cns-auto="Notifications"]')
    private readonly configurationMenu : Locator = this.page.locator('[cns-auto="Configuration"]')
    private readonly detailsMenu : Locator = this.page.locator('[cns-auto="Details"]')
    private readonly performanceMenu : Locator = this.page.locator('[cns-auto="Performance"]')
    private readonly softwareUpgradeMenu : Locator = this.page.locator('[cns-auto="Software Update"]')
    private readonly toolsMenu : Locator = this.page.locator('[cns-auto="Tools"]')
    private readonly detailsDashboard : Locator = this.page.locator('[class="col-xs-12 col-sm-6 col-md-3 no-padder"]')
    private readonly dashboardSwitchName = (switchName: string) => this.page.locator('[class="v-middle ng-scope"]', {hasText: `${switchName}`})

    constructor (public page: Page){

    }

    async clickDashboard(): Promise<void> {

        await this.dashboardMenu.click({timeout: 20000})
    }

    async clickNotification(): Promise<void> {

        await this.notificationsMenu.click({timeout: 20000})
    }

    async clickConfiguration(): Promise<void> {

        await this.configurationMenu.click({timeout: 20000})
    }

    async clickDetails(): Promise<void> {

        await this.detailsMenu.click({timeout: 20000})
    }

    async clickPerformance(): Promise<void> {

        await this.performanceMenu.click({timeout: 20000})
    }

    async clickSoftwareUpgrade(): Promise<void> {

        await this.softwareUpgradeMenu.click({timeout: 20000})
    }

    async clickTools(): Promise<void> {

        await this.toolsMenu.click({timeout: 20000})
    }
    
    async expectDeviceNameToBe(switchName: string) {

        await expect(await this.dashboardSwitchName(switchName)).toHaveText(switchName, {timeout: 30000})
    }
}




