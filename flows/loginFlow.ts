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

        const message : string | null = await this.alertInstruction.textContent()

        expect(message).toContain("Please enter your email address")
    }

    async confirmLoginWithWrongCredentials() : Promise <void> {

        const message : string | null = await this.alertDanger.textContent()
        const pageTitle = await this.cloud.page.title()

        expect(message?.trim()).toBe("Invalid email address or password")
        expect(pageTitle).toBe("Log In / Cambium Networks Support")

        await this.cloud.page.waitForTimeout(2000)
    }

    async confirmLoginWithoutPassword() : Promise <void> {

        const message : string | null = await this.alertInstruction.textContent()
        const alert : string  | null = await this.alert.textContent()
        const pageTitle = await this.cloud.page.title()

        expect(message?.trim()).toBe("Please enter your password.")
        expect(alert?.trim()).toBe("Required")
        expect(pageTitle).toBe("Log In / Cambium Networks Support")

        await this.cloud.page.waitForTimeout(2000)
    }

    async confirmLoginWithProperCredentials() : Promise <void> {

        const pageTitle = await this.cloud.page.title()
        expect(pageTitle).toBe("cnMaestro™")

        await this.cloud.page.waitForTimeout(2000)
    }

    async confirmCheckBox() : Promise <void> {
    
        const checkboxBefore : boolean = await this.checkBox.isChecked()
        expect(checkboxBefore).not.toBe(true)
    
        await this.cloud.loginObj.checkRememberMe()
        await this.cloud.page.waitForTimeout(1000)
    
        const checkboxAfter : boolean = await this.checkBox.isChecked()
        expect(checkboxAfter).toBe(true)
    }

    async expectPageTitle(expectedPageTitle : string) : Promise <void> {

        const pageTitle = await this.cloud.page.title()

        expect(pageTitle).toBe(expectedPageTitle)

        await this.cloud.page.waitForTimeout(2000)
    }

}