import { Page, Locator, expect } from "@playwright/test"


export class ManagementPage {

    private readonly adminEdit : Locator = this.page.locator('[class="text-right xmd-t-l"]').nth(0)
    private readonly guestEdit : Locator = this.page.locator('[class="text-right xmd-t-l"]').nth(1)
    private readonly administratoraccess : Locator = this.page.locator('[class="col-md-12 wrapper p-t-sm b m-b-sm"]').nth(0)
    private readonly addPassword : Locator = this.page.locator('[id="adminPwd"]')
    private readonly confirmPassword : Locator = this.page.locator('[id="adminCnfrmPwd"]')
    private readonly updatePassword : Locator = this.page.locator('[class="btn btn-primary w-xs ng-binding"]')

    constructor(public page: Page){

    }

    async clickAdminEdit(): Promise <void> {

        await this.adminEdit.click()
    }

    async clickGuestEdit(): Promise <void> {

        await this.guestEdit.click()
    }


    async addPasswordAdmin(password: string): Promise <void> {

        await this.addPassword.fill(password)
    }

    async confirmPasswordAdmin(password: string): Promise <void> {

        await this.confirmPassword.fill(password)
    }

    async addPasswordGuest(password: string): Promise <void> {

        await this.addPassword.fill(password)
    }

    async confirmPasswordGuest(password: string): Promise <void> {

        await this.confirmPassword.fill(password)
    }

    async clickUpdatePassword(): Promise <void> {

        await this.updatePassword.click()
    }

    async checkTelnet(): Promise <void> {

        await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(0).check()
    }

    async unCheckTelnet(): Promise <void> {

        await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(0).uncheck()
    }

    async checkHTTP(): Promise <void> {

        await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(1).check()
    }

    async unCheckHTTP(): Promise <void> {

        await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(1).uncheck()
    }

    async checkSSH(): Promise <void> {

        await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(2).check() 
    }

    async unCheckSSH(): Promise <void> {

        await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(2).uncheck() 
    }

    async createPasswordAdmin(password: string): Promise <void> {

        await this.clickAdminEdit()
        await this.addPasswordAdmin(password)
        await this.confirmPasswordAdmin(password)
        await this.clickUpdatePassword()

    }

    async createPasswordGuest(password: string): Promise <void> {
    
        await this.clickGuestEdit()
        await this.addPasswordGuest(password)
        await this.confirmPasswordGuest(password)
        await this.clickUpdatePassword()

    }
}