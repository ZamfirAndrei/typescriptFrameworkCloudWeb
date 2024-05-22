import { CloudObjects } from "../management/cloudObjects";
import { Page } from "@playwright/test";
import { test, expect} from "@playwright/test";

export class LoginFlow {

    private readonly cloud = new CloudObjects(this.page)

    constructor(public page: Page) {

    }

    async introduceUser(user: string) {

        await this.cloud.loginObj.introduceUser(user)
        await this.cloud.loginObj.clickSubmit()
        await this.cloud.loginObj.clickSubmit()

    }

    async introduceUserAndPassword(user: string, password: string) {

        await this.cloud.loginObj.introduceUser(user)
        await this.cloud.loginObj.clickSubmit()
        await this.cloud.loginObj.introducePassword(password)
        await this.cloud.loginObj.clickSubmit()
    }

    async confirmLoginEmail() {

        const message : string | null = await this.cloud.page.locator('[class="alert cs-instructions"]').textContent()
        // console.log(message?.trim())

        expect(message).toContain("Please enter your email address")
    }

    async confirmLoginWithWrongCredentials() {

        const message : string | null = await this.cloud.page.locator('[class="alert alert-danger"]').textContent()
        // console.log(message?.trim())

        const pageTitle = await this.cloud.page.title()
        // console.log(pageTitle)

        expect(message?.trim()).toBe("Invalid email address or password")
        expect(pageTitle).toBe("Log In / Cambium Networks Support")

        await this.cloud.page.waitForTimeout(2000)
    }

    async confirmLoginWithoutPassword() {

        const message : string | null = await this.cloud.page.locator('[class="alert cs-instructions"]').textContent()
        // console.log(message?.trim())

        const alert : string  | null = await this.cloud.page.locator('[class="text-danger"]').textContent()
        // console.log(alert?.trim())

        const pageTitle = await this.cloud.page.title()
        // console.log(pageTitle)

        expect(message?.trim()).toBe("Please enter your password.")
        expect(alert?.trim()).toBe("Required")
        expect(pageTitle).toBe("Log In / Cambium Networks Support")

        await this.cloud.page.waitForTimeout(2000)
    }

    async confirmLoginWithProperCredentials() {

        const pageTitle = await this.cloud.page.title()
        // console.log(pageTitle)

        expect(pageTitle).toBe("cnMaestro™")

        await this.cloud.page.waitForTimeout(2000)
    }

    async confirmCheckBox() {
    
        const checkboxBefore : boolean = await this.cloud.page.locator('[type="checkbox"]').isChecked()
        // console.log(checkboxBefore)
    
        expect(checkboxBefore).not.toBe(true)
    
        await this.cloud.loginObj.checkRememberMe()
        await this.cloud.page.waitForTimeout(1000)
    
        const checkboxAfter : boolean = await this.cloud.page.locator('[type="checkbox"]').isChecked()
        // console.log(checkboxAfter)
    
        expect(checkboxAfter).toBe(true)
    }

    async expectPageTitle(expectedPageTitle : string) {

        const pageTitle = await this.cloud.page.title()
        // console.log(pageTitle)

        expect(pageTitle).toBe(expectedPageTitle)

        await this.cloud.page.waitForTimeout(2000)
    }

}