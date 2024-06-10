import { Page, Locator } from "@playwright/test"

// This is the login page of cnMaestro. We enter on the main browser, login and choose the user

export default class LoginPage {

    private readonly signIn : Locator = this.page.locator('[class="signin"]').locator('[role="button"]').nth(0)
    private readonly email : Locator = this.page.locator('[id="cs-email"]')
    private readonly submit : Locator = this.page.locator('[type="submit"]')
    private readonly password : Locator = this.page.locator('[type="password"]')
    private readonly checkbox : Locator = this.page.locator('[type="checkbox"]')
    private readonly menu : Locator = this.page.locator('[id="acctsMenu"]')

    constructor(public page : Page){

    }

    async login(user: string, password: string) {

        await this.signIn.click()
        await this.email.fill(user),
        await this.submit.click()
        await this.password.fill(password),
        await this.checkbox.check(),
        await this.submit.click()

    }

    async selectAccount(account: string){

        await this.menu.click()
        await this.page.locator(`[title="${account}"]`).nth(0).click()
    }

    async introduceUser(user: string) {

        await this.email.fill(user)
    }

    async introducePassword(password: string) {

        await this.password.fill(password)   
    }

    async clickSignIn() {

        await this.signIn.click()
    }

    async clickSubmit() {

        await this.submit.click()
    }

    async checkRememberMe() {

        await this.checkbox.check()

    }
}