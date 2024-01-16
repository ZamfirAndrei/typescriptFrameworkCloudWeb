import { Page, Locator } from "@playwright/test"
import loginPage from "./loginPage"

// This is the page of a particular Device 


export class ParticularDevicePage{

    private readonly deviceDiagram : Locator = this.page.locator('[class="col-md-12 no-padder ng-scope"]').nth(0)
    private readonly dashboard_menu : Locator = this.page.locator('[cns-auto="Dashboard"]')
    private readonly notifications_menu : Locator = this.page.locator('[cns-auto="Notifications"]')
    private readonly configuration_menu : Locator = this.page.locator('[cns-auto="Configuration"]')
    private readonly details_menu : Locator = this.page.locator('[cns-auto="Details"]')
    private readonly performance_menu : Locator = this.page.locator('[cns-auto="Performance"]')
    private readonly software_upgrade_menu : Locator = this.page.locator('[cns-auto="Software Update"]')
    private readonly tools_menu : Locator = this.page.locator('[cns-auto="Tools"]')
    private readonly details_dashboard : Locator = this.page.locator('[class="col-xs-12 col-sm-6 col-md-3 no-padder"]')

    constructor (public page: Page){

    }

    async clickDashboard() {

        await this.dashboard_menu.click()
    }

    async clickNotification() {

        await this.notifications_menu.click()
    }

    async clickConfiguration() {

        await this.configuration_menu.click()
    }

    async clickDetails() {

        await this.details_menu.click()
    }

    async clickPerformance() {

        await this.performance_menu.click()
    }

    async clickSoftwareUpgrade() {

        await this.software_upgrade_menu.click()
    }

    async clickTools() {

        await this.tools_menu.click()
    }

}


export class ConfigurationPage{

    private readonly switch_group_table : Locator = this.page.locator('[name="dropDownButton"]').nth(2)
    private readonly status : Locator = this.page.locator('[class="col-md-8 b b-form-muted r p-y-4 ng-scope"]')

    constructor(public page:Page){

    }

    async selectSwitchGroup(switch_group:string) {

        // Selecting the Switch Group for the device

        await this.switch_group_table.click()
        // await this.page.waitForTimeout(1000)
        // await this.switch_group_table.locator('[name="searchInp"]').fill(switch_group)
        await this.page.locator('[name="searchInp"]').nth(2).fill(switch_group)
        await this.page.locator('[ng-show="dropDownType.name"]').nth(11).click()
        // console.log(await this.page.locator('[ng-show="dropDownType.name"]').nth(11).textContent())
    }

    async clickApplyConfiguration() {

        await this.page.locator('[class="btn btn-primary m-r-xs"]').click()
    }

    async getSyncStatusDevice() {

        const sync_status_device_text = await this.status.textContent()
        const status = sync_status_device_text?.split(" ")
        console.log(status)
        const sync_status_device = (status[3] + " " + status[4] + " " + status[5]).trim()
        console.log(sync_status_device)
        
        return sync_status_device
    }

    async getIpAddressDevice() {

        const ip_address_text = await this.page.locator('[class="cn-link ng-binding ng-scope"]').textContent()
        // console.log(ip_address_text);
        const ip_address = ip_address_text?.trim()
        console.log(ip_address)

        return ip_address
    }

    async getSerialNumberDevice() {

        const serial_number_text = await this.page.locator('[class="col-md-8 read-form-control ng-binding"]').nth(0).textContent()
        // console.log(serial_number_text)
        const serial_number = serial_number_text?.trim()
        console.log(serial_number)

        return serial_number
    }

    async getMacAddressDevice() {

        const mac_address_text = await this.page.locator('[class="col-md-8 read-form-control ng-binding"]').nth(1).textContent()
        // console.log(mac_address_text)
        const mac_address = mac_address_text?.trim()
        console.log(mac_address)

        return mac_address
    }
}

export class SoftwareUpdatePage{

    private readonly img_dropbox : Locator = this.page.locator('[class="col-md-7 no-padder ng-isolate-scope"]')
    private readonly add_software_job : Locator = this.page.locator('[class="ng-binding ng-scope"]', {hasText : "Add Software Job"})
    private readonly view_jobs : Locator = this.page.locator('[class="cn-link"]', {hasText: "View Update Jobs"})
    private readonly job_option : Locator = this.page.locator('[class="cnico cnico-action-add-remove-rect-outline"]')
    
    constructor(public page:Page){

    }

    async selectImgForUpdate(img_version : string){

        await this.img_dropbox.click()
        await this.page.waitForTimeout(2000)
        await this.page.locator(`[title="${img_version}"]`).nth(1).click()
        
        // console.log(await this.img_dropbox.textContent())
        // console.log(await this.page.locator(`[title="${img_version}"]`).nth(1).textContent());
        
    }

    async expandJobOptions(){

        console.log(await this.job_option.isDisabled());
        
        if (await this.job_option.isDisabled() == true ){

            await this.job_option.click()
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

        // console.log(await this.page.locator('[translate="software.labels.DisableAutoReboot"]').isChecked())
        
    }

    async addSoftwareJob() {

        this.add_software_job.click()
    }

    async clickViewUpdateJobs() {

        await this.view_jobs.click()
    }


}

export class ToolsPage{

    private readonly cli_command_box : Locator = this.page.locator('[placeholder="Type CLI command"]')
    private readonly run_button : Locator = this.page.locator('[class="btn btn-primary w-xs ng-binding"]')
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

        await this.cli_command_box.fill(command)
        await this.cli_command_box.press("Enter")
        await this.run_button.click()
    }

    async getOutputFromCommand() {

        const output_text = await this.output.textContent()
        console.log(output_text)

        return output_text
    }


}