import { Page, Locator, expect } from "@playwright/test"


export class BasicPage {

    constructor(public page:Page) {

    }

    async addNameSwitchGroup(name:string) {

        await this.page.locator('[name="profileName"]').fill(name)
    }

    async checkAutoSync(answer:string) {

        if (answer == "No")
            await this.page.locator('[class="i-checks i-checks-sm"]').nth(0).uncheck()
        else{
            await this.page.locator('[class="i-checks i-checks-sm"]').nth(0).check()
        }
    }

    async addDescription(description:string) {

        await this.page.locator('[name="desc"]').fill(description)
    }
}