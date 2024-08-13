import { Page, Locator } from "@playwright/test"
import loginPage from "../loginPage/loginPage"
import { isNumberObject } from "util/types"
import { log } from "console"
import { AddSwitchgroupPage } from "../addSwitchGroupPage/addswitchgroupPage"
import { NetworkPage } from "../addSwitchGroupPage/networkPage" 

export class ParticularSwitchGroupPage {

    private readonly dashboardMenu : Locator = this.page.locator('[cns-auto="Dashboard"]')
    private readonly notificationsMenu : Locator = this.page.locator('[cns-auto="Notifications"]')
    private readonly configurationMenu : Locator = this.page.locator('[cns-auto="Configuration"]')
    private readonly statisticsMenu : Locator = this.page.locator('[cns-auto="Statistics"]').nth(0)
    private readonly switchesMenu : Locator = this.page.locator('[cns-auto="Switches"]')
    private readonly switchPortsMenu : Locator = this.page.locator('[cns-auto="Switch Ports"]')
    private readonly managementMenu : Locator = this.page.locator('[title="Management"]')

    constructor(public page:Page) {

    }

    async clickDashboard() {

        await this.dashboardMenu.click()
    }

    async clickNotification() {

        await this.notificationsMenu.click()
    }

    async clickConfiguration() {

        await this.configurationMenu.click()
    }

    async clickStatistics() {

        await this.statisticsMenu.click()
    }

    async clickSwitches() {

        await this.switchesMenu.click()
    }

    async clickSwitchPorts() {

        await this.switchPortsMenu.click()
    }

}





















