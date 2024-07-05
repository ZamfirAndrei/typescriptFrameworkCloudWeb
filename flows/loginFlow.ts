import { CloudObjects } from "../management/cloudObjects";
import { Page } from "@playwright/test";
import { test, expect, Locator} from "@playwright/test";

export class LoginFlow {

    private readonly cloud = new CloudObjects(this.page)
    private readonly alertInstruction : Locator = this.page.locator('[class="alert cs-instructions"]')
    private readonly alertDanger : Locator = this.page.locator('[class="alert alert-danger"]')
    private readonly alert : Locator = this.page.locator('[class="text-danger"]')
    private readonly checkBox : Locator = this.page.locator('[type="checkbox"]')

    constructor(public page: Page) {

    }

    async introduceUser(user: string) : Promise <void> {

        await this.cloud.loginObj.introduceUser(user)
        await this.cloud.loginObj.clickSubmit()
        await this.cloud.loginObj.clickSubmit()

    }

    async introduceUserAndPassword(user: string, password: string) : Promise <void> {

        await this.cloud.loginObj.introduceUser(user)
        await this.cloud.loginObj.clickSubmit()
        await this.cloud.loginObj.introducePassword(password)
        await this.cloud.loginObj.clickSubmit()
    }

    async confirmLoginEmail() : Promise <void> {

        expect(await this.alertInstruction.textContent()).toContain("Please enter your email address")
    }

    async confirmLoginWithWrongCredentials() : Promise <void> {

        expect(await this.alertDanger.textContent()).toContain("Invalid email address or password")
        expect(await this.cloud.page.title()).toBe("Log In / Cambium Networks Support")
    }

    async confirmLoginWithoutPassword() : Promise <void> {

        expect(await this.alertInstruction.textContent()).toContain("Please enter your password.")
        expect(await this.alert.textContent()).toContain("Required")
        expect(await this.cloud.page.title()).toBe("Log In / Cambium Networks Support")
    }

    async confirmLoginWithProperCredentials() : Promise <void> {

        expect(await this.cloud.page.title()).toBe("cnMaestro™")
    }

    async confirmCheckbox() : Promise <void> {
    
        expect(await this.checkBox.isChecked()).not.toBe(true)
    
        await this.cloud.loginObj.checkRememberMe()
        await this.cloud.page.waitForTimeout(1000)
    
        expect(await this.checkBox.isChecked()).toBe(true)
    }

    async confirmPageTitle(pageTitle : string) : Promise <void> {

        expect(await this.cloud.page.title()).toBe(pageTitle)
    }

}