import { Page, Locator } from "@playwright/test"

// This is the login page of cnMaestro. We enter on the main browser, login and choose the user

export default class loginPage {

    private readonly signIn : Locator = this.page.locator('[class="signin"]').locator('[role="button"]').nth(0)
    private readonly email : Locator = this.page.locator('[id="cs-email"]')
    private readonly submit : Locator = this.page.locator('[type="submit"]')
    private readonly password : Locator = this.page.locator('[type="password"]')
    private readonly checkbox : Locator = this.page.locator('[type="checkbox"]')
    private readonly menu : Locator = this.page.locator('[id="acctsMenu"]')

    constructor(public page : Page){

    }

    async login(user:string, password:string) {

        await this.signIn.click()
        await this.email.fill(user),
        await this.submit.click()
        await this.password.fill(password),
        await this.checkbox.check(),
        await this.submit.click()

    }

    async selectAccount(account:string){

        await this.menu.click()
        await this.page.locator(`[title="${account}"]`).nth(0).click()

        // if (account == "LUXOFT301SRV4") {
        //     await this.page.locator('[title="LUXOFT301SRV4"]').nth(0).click()
        // }
        
        // else if (account == "QA_USSRV3_LUXOFT") {
        //     await this.page.locator('[title="QA_USSRV3_LUXOFT"]').nth(0).click()
        // }
        // else {
        //     console.log("Choose one of this accounts!")
        // }
    }

    async introduceUser(user: string) {

        await this.email.fill(user)
    }

    async introducePassword(password:string) {

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