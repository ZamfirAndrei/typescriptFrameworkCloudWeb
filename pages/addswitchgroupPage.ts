import { Page, Locator, expect } from "@playwright/test"

// This is the page of cnMaestro Add Switch Group


export class AddSwitchgroupPage {
    
    public readonly basic: Locator = this.page.locator('[title="Basic"]')
    public readonly management: Locator = this.page.locator('[title="Management"]')
    public readonly network: Locator = this.page.locator('[title="Network"]')
    public readonly security: Locator = this.page.locator('[title="Security"]')
    public readonly showAdvanced: Locator = this.page.locator('[class="i-switch bg-primary v-middle pull-right xmd-pull-none m-l-xs"]')
    public readonly messageAfterSave : Locator = this.page.locator('[id="cns-toaster-msg"]')
    public saveButton : Locator = this.page.locator('[class="btn btn-primary w-xs m-r-sm ng-binding"]')
    public disableSaveButton : Locator = this.page.locator('[class="col-md-10 wrapper-sm b-l m-n form-actns"]').locator('[disabled="disabled"]')

    constructor (public page: Page) {

    }

    async clickBasic() {

        await this.basic.click()
    }

    async clickManagement() {

        await this.management.click()
    }

    async clickNetwork() {

        await this.network.click()
    }

    async clickSecurity() {

        await this.security.click()
    }

    async checkShowAdvancedButton() {

       await this.showAdvanced.check()
        
    }

    async unCheckShowAdvancedButton() {

        await this.showAdvanced.uncheck()
         
     }

    async clickSave() {

        await this.saveButton.click()
            
    }

    async checkIfSaveButtonIsEnabled() {

        if (await this.disableSaveButton.isVisible()){

            console.log("The button is disabled")
            return await this.disableSaveButton.isVisible()
        }
        
        else {

            console.log("The button is enabled")
            return await this.disableSaveButton.isVisible()
        }
    }

    async getMessageAfterSave() {

        const message = await this.messageAfterSave.textContent()

        return message?.trim()
    }

    async searchForSwithGroupOnTheMainPage(switchGroup: string) {

        // const nameSwitchGroup = await this.page.locator('[class="cn-link ng-binding"]', {hasText: `${switchGroup}`}).textContent()
        const nameSwitchGroup = await this.page.locator('[class="cn-link ng-binding"]').getByText(`${switchGroup}`, {exact:true}).textContent()

        return nameSwitchGroup?.trim()
    }

    async expectSwitchGroupToBeCreated(switchGroup: string) {

        const nameSwitchGroup = this.page.locator('[class="cn-link ng-binding"]').getByText(`${switchGroup}`, {exact:true})

        await expect(nameSwitchGroup).toHaveText(switchGroup, {timeout: 20000})
    }

}

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

export class NetworkPage {

    private readonly addvlan : Locator = this.page.locator('[class="btn btn-plain"]').nth(1)
    private readonly stpDropdown : Locator = this.page.locator('[id="stpMode"]')
    private readonly rstpPriorityMenu : Locator = this.page.locator('[id="stpPriority"]')

    constructor(public page:Page){

    }

    async addVlan(vlanId: string, vlanName: string|null = null) {

        await this.addvlan.click()
        await this.page.locator('[name="vlanId"]').fill(vlanId)

        if (vlanName != null)
            await this.page.locator('[name="vlanName"]').fill(vlanName)

        await this.page.locator('[class="btn btn-primary w-xs ng-binding"]').click()
        console.log(`The VLAN id ${vlanId} and name ${vlanName} have been configured`)

    }

    async changeSpanningTree(mode: string) {

        await this.stpDropdown.nth(1).click()
        await this.page.click(`[title="${mode}"]`)
        console.log(`The mode ${mode} of STP has been choosen`)
    }

    async enableSTP(answer: string) {

        const checkbox = this.page.locator('[class="form-group checkbox m-b-none"]').locator('[class="i-checks i-checks-sm"]').locator('[translate="common.Enable"]')
        if (answer == "Yes"){
            await checkbox.check()
            console.log("The STP has been enabled")
        }
        else if (answer == "No"){
            await checkbox.uncheck()
            console.log("The STP has been disabled")
        }
    }

    async choosePathCost(pathCostMethod: string){

        const pathcost = this.page.locator('[class="col-md-12 no-padder radio"]')
        await pathcost.locator(`[translate="switchGroup.labels.${pathCostMethod}"]`).click()
        console.log(`The pathcost has been choosen to be: ${pathCostMethod}`)
    }

    async configureStpPriorityRSTP(priority: string){

        await this.rstpPriorityMenu.click()
        await this.page.locator(`[title="${priority}"]`).click()
        console.log(`The STP priority has been configured to : ${priority}`);
        
    }
}