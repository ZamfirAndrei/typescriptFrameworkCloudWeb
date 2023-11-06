import {Page} from  "@playwright/test"

// This is the login page of cnMaestro. We enter on the main browser, login and choose the user

export default class loginPage {

    constructor(public page : Page){

    }

    async login(user:string, password:string) {

        await this.page.locator('[class="signin"]').locator('[role="button"]').nth(0).click()
        await this.page.locator('[id="cs-email"]').fill(user),
        await this.page.locator('[type="submit"]').click()
        await this.page.locator('[type="password"]').fill(password),
        await this.page.locator('[type="checkbox"]').check(),
        await this.page.locator('[type="submit"]').click()

    }

    async selectAccount(account:string){

        await this.page.locator('[id="acctsMenu"]').click()

        if (account == "LUXOFT301SRV4") {
            await this.page.locator('[title="LUXOFT301SRV4"]').nth(0).click()
        }
        
        else if (account == "QA_USSRV3_LUXOFT") {
            await this.page.locator('[title="QA_USSRV3_LUXOFT"]').nth(0).click()
        }
        else {
            console.log("Choose one of this accounts!")
        }
    }

    async introduceUser(user:string) {

        await this.page.locator('[id="cs-email"]').fill(user)
    }

    async introducePassword(password:string) {

        await this.page.locator('[id="cs-password"]').fill(password)   
    }

    async clickSignIn() {

        await this.page.locator('[class="signin"]').locator('[role="button"]').nth(0).click()
    }

    async clickSubmit() {

        await this.page.locator('[type="submit"]').click()
    }

    async checkRememberMe() {

        await this.page.locator('[type="checkbox"]').check()

    }
}