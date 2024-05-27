import { Page, Locator } from "@playwright/test"
import loginPage from "./loginPage"
import { test, expect} from "@playwright/test";

// This is the page of a particular Device 


export class ParticularDevicePage{

    private readonly deviceDiagram : Locator = this.page.locator('[class="col-md-12 no-padder ng-scope"]').nth(0)
    private readonly dashboardMenu : Locator = this.page.locator('[cns-auto="Dashboard"]')
    private readonly notificationsMenu : Locator = this.page.locator('[cns-auto="Notifications"]')
    private readonly configurationMenu : Locator = this.page.locator('[cns-auto="Configuration"]')
    private readonly detailsMenu : Locator = this.page.locator('[cns-auto="Details"]')
    private readonly performanceMenu : Locator = this.page.locator('[cns-auto="Performance"]')
    private readonly softwareUpgradeMenu : Locator = this.page.locator('[cns-auto="Software Update"]')
    private readonly toolsMenu : Locator = this.page.locator('[cns-auto="Tools"]')
    private readonly detailsDashboard : Locator = this.page.locator('[class="col-xs-12 col-sm-6 col-md-3 no-padder"]')

    constructor (public page: Page){

    }

    async clickDashboard() {

        await this.dashboardMenu.click()
    }

    async clickNotification() {

        await this.notificationsMenu.click()
    }

    async clickConfiguration() {

        await this.configurationMenu.click()
    }

    async clickDetails() {

        await this.detailsMenu.click()
    }

    async clickPerformance() {

        await this.performanceMenu.click()
    }

    async clickSoftwareUpgrade() {

        await this.softwareUpgradeMenu.click()
    }

    async clickTools() {

        await this.toolsMenu.click()
    }

}


export class ConfigurationPage{

    private readonly status : Locator = this.page.locator('[class="col-md-8 b b-form-muted r p-y-4 ng-scope"]')
    private readonly switchGroupMenu : Locator = this.page.locator('[class="btn-group w-full"]').nth(2)
    private readonly switchGroupSearchBar : Locator = this.page.locator('[name="searchInp"]').nth(2)
    private readonly applyConfigurationButton : Locator = this.page.locator('[class="ng-binding"]', {hasText: "Apply Configuration"})
    private readonly applyConfigurationMessage: Locator = this.page.locator('[id="cns-toaster-msg"]')
    private readonly editButton : Locator = this.page.locator('[class="cn-link v-middle ng-binding"]').getByText("Edit", {exact: true})
    private readonly editPortsButton : Locator = this.page.locator('[class="cn-link v-middle ng-binding"]', {hasText: "Edit Ports"})

    constructor(public page:Page){

    }

    async clickSwitchGroup() {

        await this.switchGroupMenu.click()
    }

    async clickEdit() {

        await this.editButton.click()
    }

    async clickEditPorts() {

        await this.editPortsButton.click()
    }

    async selectSwitchGroup(switchGroup: string) {

        await this.switchGroupMenu.click()
        await this.switchGroupSearchBar.fill(switchGroup)
        await this.page.locator(`[title="${switchGroup}"]`).click()
        
    }

    async getValueSwitchGroup() {

        const value = await this.switchGroupMenu.locator('[name="dropDownButton"]').textContent()

        return value?.trim()
    }

    async clickApplyConfiguration() {

        await this.applyConfigurationButton.click()
    }
    
    async getMessageApplyConfiguration() {

        const message = await this.applyConfigurationMessage.textContent()

        return message?.trim()
    }

    async getSyncStatusDevice() {
        
        const syncStatusDeviceText = await this.status.locator('[class="inline ng-binding"]').textContent()
        
        return syncStatusDeviceText?.trim()
    }

    async getIpAddressDevice() {

        const ipAddressText = await this.page.locator('[class="cn-link ng-binding ng-scope"]').textContent()
        const ipAddress = ipAddressText?.trim()

        return ipAddress
    }

    async getSerialNumberDevice() {

        const serialNumberText = await this.page.locator('[class="col-md-8 read-form-control ng-binding"]').nth(0).textContent()
        const serialNumber = serialNumberText?.trim()

        return serialNumber
    }

    async getMacAddressDevice() {

        const macAddressText = await this.page.locator('[class="col-md-8 read-form-control ng-binding"]').nth(1).textContent()
        const macAddress = macAddressText?.trim()

        return macAddress
    }

    async getSyncStatusLocator () : Promise <Locator> {

        const syncStatusLocator = this.status.locator('[class="inline ng-binding"]')

        return syncStatusLocator

    }

    async expectSyncStatusDeviceToBe(syncStatusDevice: string) {

        await expect(await this.getSyncStatusLocator()).toHaveText(syncStatusDevice,
            {timeout: 20000})
    }
}

export class SoftwareUpdatePage{

    private readonly imgDropbox : Locator = this.page.locator('[class="col-md-7 no-padder ng-isolate-scope"]')
    private readonly addSoftwarejob : Locator = this.page.locator('[class="ng-binding ng-scope"]', {hasText : "Add Software Job"})
    private readonly viewJobs : Locator = this.page.locator('[class="cn-link"]', {hasText: "View Update Jobs"})
    private readonly jobOption : Locator = this.page.locator('[class="cnico cnico-action-add-remove-rect-outline"]')
    
    constructor(public page:Page){

    }

    async selectImgForUpdate(imgVersion : string){

        await this.imgDropbox.click()
        await this.page.waitForTimeout(2000)
        await this.page.locator(`[title="${imgVersion}"]`).nth(1).click()
        
    }

    async expandJobOptions(){

        console.log(await this.jobOption.isDisabled());
        
        if (await this.jobOption.isDisabled() == true ){

            await this.jobOption.click()
        }

        else {

            console.log("The job option is expanded already")
        }
    }

    async checkDisableAutoReboot(answer : string) {

        console.log(await this.page.locator('[translate="software.labels.DisableAutoReboot"]').isChecked())

        if (answer == "Yes"){

            await this.page.locator('[translate="software.labels.DisableAutoReboot"]').check()
        }
        
    }

    async addSoftwareJob() {

        this.addSoftwarejob.click()
    }

    async clickViewUpdateJobs() {

        await this.viewJobs.click()
    }

}

export class ToolsPage{

    private readonly cliCommandBox : Locator = this.page.locator('[placeholder="Type CLI command"]')
    private readonly runButton : Locator = this.page.locator('[class="btn btn-primary w-xs ng-binding"]')
    private readonly output : Locator = this.page.locator('[id="resultContainer"]')

    constructor(public page:Page){

    }

    async clickStatus() {

        await this.page.locator('[cns-auto="Status"]').click()

    }

    async clickRemoteCLI() {

        await this.page.locator('[cns-auto="Remote CLI"]').click()

    }

    async clickNewtorkConnectivity() {

        await this.page.locator('[cns-auto="Network Connectivity"]').click()

    }

    async typeCommandCLI(command : string) {

        await this.cliCommandBox.fill(command)
        await this.cliCommandBox.press("Enter")
        await this.runButton.click()
    }

    async getOutputFromCommand() {

        const outputText = await this.output.textContent()

        return outputText
    }


}