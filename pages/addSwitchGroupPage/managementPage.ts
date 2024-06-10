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

    async clickAdminEdit(){

        await this.adminEdit.click()
    }

    async clickGuestEdit(){

        await this.guestEdit.click()
    }


    async addPasswordAdmin(password: string){

        await this.addPassword.fill(password)
    }

    async confirmPasswordAdmin(password: string){

        await this.confirmPassword.fill(password)
    }

    async addPasswordGuest(password: string){

        await this.addPassword.fill(password)
    }

    async confirmPasswordGuest(password: string){

        await this.confirmPassword.fill(password)
    }

    async clickUpdatePassword() {

        await this.updatePassword.click()
    }

    async checkTelnet(answer: string){

        if (answer=="Yes"){
            await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(0).check()
        }
        else if (answer=="No"){
            await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(0).uncheck()
        }
    }

    async checkHTTP(answer: string){

        if (answer=="Yes"){
            await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(1).check()
        }
        else if (answer=="No"){
            await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(1).uncheck()
        }
    }

    async checkSSH(answer:string){

        if (answer=="Yes"){
            await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(2).check()
        }
        else if (answer=="No"){
            await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(2).uncheck()
        }
    }

    async createPasswordAdmin(password: string) {

        await this.clickAdminEdit()
        await this.addPasswordAdmin(password)
        await this.confirmPasswordAdmin(password)
        await this.clickUpdatePassword()

    }

    async createPasswordGuest(password: string) {
    
        await this.clickGuestEdit()
        await this.addPasswordGuest(password)
        await this.confirmPasswordGuest(password)
        await this.clickUpdatePassword()

    }
}