import { Page, Locator, expect } from "@playwright/test"


export class BasicPage {

    constructor(public page:Page) {

    }

    async addNameSwitchGroup(name: string): Promise <void> {

        await this.page.locator('[name="profileName"]').fill(name)
    }

    async checkAutoSync(): Promise <void> {

        await this.page.locator('[class="i-checks i-checks-sm"]').nth(0).check()
    }

    async unCheckAutoSync(): Promise <void> {

        await this.page.locator('[class="i-checks i-checks-sm"]').nth(0).uncheck()
    }

    async addDescription(description: string): Promise <void> {

        await this.page.locator('[name="desc"]').fill(description)
    }
}