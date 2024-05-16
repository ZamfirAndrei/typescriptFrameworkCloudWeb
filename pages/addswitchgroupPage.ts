import { Page, Locator } from "@playwright/test"

// This is the page of cnMaestro Add Switch Group


export class addswitchgroupPage {
    
    public readonly basic: Locator = this.page.locator('[title="Basic"]')
    public readonly management: Locator = this.page.locator('[title="Management"]')
    public readonly network: Locator = this.page.locator('[title="Network"]')
    public readonly security: Locator = this.page.locator('[title="Security"]')
    public readonly show_advanced: Locator = this.page.locator('[class="i-switch bg-primary v-middle pull-right xmd-pull-none m-l-xs"]')
    public readonly message_after_save : Locator = this.page.locator('[id="cns-toaster-msg"]')
    public save_button : Locator = this.page.locator('[class="btn btn-primary w-xs m-r-sm ng-binding"]')
    public disable_save_button : Locator = this.page.locator('[class="col-md-10 wrapper-sm b-l m-n form-actns"]').locator('[disabled="disabled"]')

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

       await this.show_advanced.check()
        
    }

    async unCheckShowAdvancedButton() {

        await this.show_advanced.uncheck()
         
     }

    async clickSave() {
        
        // Saving the configuration of the Switch Group

        await this.save_button.click()
            
    }

    async checkIfSaveButtonIsEnabled() {

        if (await this.disable_save_button.isVisible()){

            console.log("The button is disabled")
            return await this.disable_save_button.isVisible()
        }
        
        else {

            console.log("The button is enabled")
            return await this.disable_save_button.isVisible()
        }
    }

    async getMessageAfterSave() {

        // Getting the message after saving the Switch Group

        const message = await this.message_after_save.textContent()
        // console.log(message?.trim())

        return message?.trim()
    }

    async searchForSwithGroupOnTheMainPage(switchgroup: string) {

        const name_switch_group = await this.page.locator('[class="cn-link ng-binding"]', {hasText: `${switchgroup}`}).textContent()
        // const name_switch_group = await this.page.locator(`[title ="${switchgroup}"]`).textContent()
        // console.log(name_switch_group?.trim())

        return name_switch_group?.trim()
    }


}

export class BasicPage {

    constructor(public page:Page) {

    }

    async addNameSwitchGroup(name:string) {

        // Nameing the Switch Group

        await this.page.locator('[name="profileName"]').fill(name)
    }

    async checkAutoSync(answer:string) {

        // Checking the Auto-Sync
        if (answer == "No")
            await this.page.locator('[class="i-checks i-checks-sm"]').nth(0).uncheck()
        else{
            await this.page.locator('[class="i-checks i-checks-sm"]').nth(0).check()
        }
    }

    async addDescription(description:string) {

        // Adding description

        await this.page.locator('[name="desc"]').fill(description)
    }
}

export class ManagementPage {

    private readonly adminEdit : Locator = this.page.locator('[class="text-right xmd-t-l"]').nth(0)
    private readonly guestEdit : Locator = this.page.locator('[class="text-right xmd-t-l"]').nth(1)
    private readonly administratoraccess : Locator = this.page.locator('[class="col-md-12 wrapper p-t-sm b m-b-sm"]').nth(0)

    constructor(public page: Page){

    }

    async clickAdminEdit(){

        await this.adminEdit.click()
    }

    async clickGuestEdit(){

        await this.guestEdit.click()
    }


    async addPasswordAdmin(password:string){

        // Adding the password to admin user from the switch group

        
        await this.page.locator('[id="adminPwd"]').fill(password)
    }

    async confirmPasswordAdmin(password:string){

        // Adding the password to admin user from the switch group
        
        
        await this.page.locator('[id="adminCnfrmPwd"]').fill(password)
    }

    async addPasswordGuest(password:string){

        // Adding the password to admin user from the switch group

        
        await this.page.locator('[id="adminPwd"]').fill(password)
    }

    async confirmPasswordGuest(password:string){

        // Adding the password to admin user from the switch group
        
        await this.page.locator('[id="adminCnfrmPwd"]').fill(password)
    }

    async clickUpdatePassword() {

        await this.page.locator('[class="btn btn-primary w-xs ng-binding"]').click()
    }

    async checkTelnet(answer:string){

        if (answer=="Yes"){
            await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(0).check()
        }
        else if (answer=="No"){
            await this.administratoraccess.locator('[class="i-checks i-checks-sm"]').nth(0).uncheck()
        }
    }

    async checkHTTP(answer:string){

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

        // Creating the password for the admin user

        await this.clickAdminEdit()
        await this.addPasswordAdmin(password)
        await this.confirmPasswordAdmin(password)
        await this.clickUpdatePassword()

    }

    async createPasswordGuest(password: string) {

        // Creating the password for the admin user
    
        await this.clickGuestEdit()
        await this.addPasswordGuest(password)
        await this.confirmPasswordGuest(password)
        await this.clickUpdatePassword()

    }
}

export class NetworkPage {

    private readonly addvlan = this.page.locator('[class="btn btn-plain"]').nth(1)
    private readonly stpdropdown = this.page.locator('[id="stpMode"]')

    constructor(public page:Page){

    }

    async addVlan(vlan_id:string, vlan_name:string|null = null) {
        
        // Adding the VLAN ID

        await this.addvlan.click()
        await this.page.locator('[name="vlanId"]').fill(vlan_id)

        if (vlan_name != null)
            await this.page.locator('[name="vlanName"]').fill(vlan_name)

        await this.page.locator('[class="btn btn-primary w-xs ng-binding"]').click()
        console.log(`The VLAN id ${vlan_id} and name ${vlan_name} have been configured`)

    }

    async changeSpanningTree(mode:string) {
        
        // Change Spanning Tree

        await this.stpdropdown.nth(1).click()
        // await this.page.selectOption('[class="dropdown-menu h-down"]',{
        //     label:mode
        // })
        await this.page.click(`[title="${mode}"]`)
        console.log(`The mode ${mode} of STP has been choosen`)
    }

    async enableSTP(answer:string) {

        // Enabling/Disabling Spanning Tree
        
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

    async choosePathCost(path_cost_method:string){

        // Choosing the path cost for Spanning Tree

        const pathcost = this.page.locator('[class="col-md-12 no-padder radio"]')
        await pathcost.locator(`[translate="switchGroup.labels.${path_cost_method}"]`).click()
        console.log(`The pathcost has been choosen to be: ${path_cost_method}`)
    }

    async configureStpPriority(priority:string){

        // Configuring the STP priority

        await this.page.locator('[id="stpPriority"]').click()
        await this.page.locator(`[title="${priority}"]`).click()
        console.log(`The STP priority has been configured to : ${priority}`);
        
    }
}