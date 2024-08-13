import { Page, Locator, expect } from "@playwright/test"


export class BasicPage {

    private readonly addSwitchGroupName : Locator = this.page.locator('[name="profileName"]')
    private readonly autoSyncCheckBox : Locator = this.page.locator('[class="i-checks i-checks-sm"]')
    private readonly descriptionBox : Locator = this.page.locator('[name="desc"]')

    constructor(public page:Page) {

    }

    async addNameSwitchGroup(name: string): Promise <void> {
        await this.addSwitchGroupName.fill(name)
    }

    async checkAutoSync(): Promise <void> {

        await this.autoSyncCheckBox.nth(0).check()
    }

    async unCheckAutoSync(): Promise <void> {

        await this.autoSyncCheckBox.nth(0).uncheck()
    }

    async addDescription(description: string): Promise <void> {

        await this.descriptionBox.fill(description)
    }
}