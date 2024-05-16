import { CloudObjects } from "../management/cloudObjects";
import { Page } from "@playwright/test";
import { test, expect} from "@playwright/test";

export class LoginFlow {

    private readonly cloud = new CloudObjects(this.page)

    constructor(public page: Page) {

    }

    async introduceUser(user: string) {

        await this.cloud.login_obj.introduceUser(user)
        await this.cloud.login_obj.clickSubmit()
        await this.cloud.login_obj.clickSubmit()

    }

    async introduceUserAndPassword(user: string, password: string) {

        await this.cloud.login_obj.introduceUser(user)
        await this.cloud.login_obj.clickSubmit()
        await this.cloud.login_obj.introducePassword(password)
        await this.cloud.login_obj.clickSubmit()
    }

    async confirmLoginEmail() {

        const message : string | null = await this.cloud.page.locator('[class="alert cs-instructions"]').textContent()
        console.log(message.trim())

        expect(message).toContain("Please enter your email address")
    }

    async confirmLoginWithWrongCredentials() {

        const message : string | null = await this.cloud.page.locator('[class="alert alert-danger"]').textContent()
        console.log(message?.trim())

        const page_title = await this.cloud.page.title()
        console.log(page_title)

        expect(message?.trim()).toBe("Invalid email address or password")
        expect(page_title).toBe("Log In / Cambium Networks Support")

        await this.cloud.page.waitForTimeout(2000)
    }

    async confirmLoginWithoutPassword() {

        const message : string | null = await this.cloud.page.locator('[class="alert cs-instructions"]').textContent()
        console.log(message?.trim())

        const alert : string  | null = await this.cloud.page.locator('[class="text-danger"]').textContent()
        console.log(alert?.trim())

        const page_title = await this.cloud.page.title()
        console.log(page_title)

        expect(message?.trim()).toBe("Please enter your password.")
        expect(alert?.trim()).toBe("Required")
        expect(page_title).toBe("Log In / Cambium Networks Support")

        await this.cloud.page.waitForTimeout(2000)
    }

    async confirmLoginWithProperCredentials() {

        const page_title = await this.cloud.page.title()
        console.log(page_title)

        expect(page_title).toBe("cnMaestro™")

        await this.cloud.page.waitForTimeout(2000)
    }

    async confirmCheckBox() {
    
        const checkbox_before : string | null = await this.cloud.page.locator('[type="checkbox"]').isChecked()
        console.log(checkbox_before)
    
        expect(checkbox_before).not.toBe(true)
    
        await this.cloud.login_obj.checkRememberMe()
        await this.cloud.page.waitForTimeout(1000)
    
        const checkbox_after : string | null = await this.cloud.page.locator('[type="checkbox"]').isChecked()
        console.log(checkbox_after)
    
        expect(checkbox_after).toBe(true)
    }

    async expectPageTitle(expected_page_title : string) {

        const page_title = await this.cloud.page.title()
        console.log(page_title)

        expect(page_title).toBe(expected_page_title)

        await this.cloud.page.waitForTimeout(2000)
    }

}