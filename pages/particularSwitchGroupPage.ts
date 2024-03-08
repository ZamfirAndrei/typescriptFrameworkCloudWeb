import { Page, Locator } from "@playwright/test"
import loginPage from "./loginPage"
import { isNumberObject } from "util/types"
import { log } from "console"

// This is the page of cnMaestro particular Switch Group Page

export class ParticularSwitchGroupPage {

    private readonly dashboard_menu : Locator = this.page.locator('[cns-auto="Dashboard"]')
    private readonly notifications_menu : Locator = this.page.locator('[cns-auto="Notifications"]')
    private readonly configuration_menu : Locator = this.page.locator('[cns-auto="Configuration"]')
    private readonly statistics_menu : Locator = this.page.locator('[cns-auto="Statistics"]').nth(0)
    private readonly switches_menu : Locator = this.page.locator('[cns-auto="Switches"]')
    private readonly switch_ports_menu : Locator = this.page.locator('[cns-auto="Switch Ports"]')
   

    constructor(public page:Page) {

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

    async clickStatistics() {

        await this.statistics_menu.click()
    }

    async clickSwitches() {

        await this.switches_menu.click()
    }

    async clickSwitchPorts() {

        await this.switch_ports_menu.click()
    }

}

export class SwitchPortsPage {

    private readonly configuration_menu : Locator = this.page.locator('[cns-auto="Configuration"]').nth(1)
    private readonly statistics_menu : Locator = this.page.locator('[cns-auto="Statistics"]').nth(1)
    private readonly general_button : Locator = this.page.locator('[title="General"]')
    private readonly physical_button : Locator = this.page.locator('[title="Physical"]')
    private readonly network_button : Locator = this.page.locator('[title="Network"]')
    private readonly security_button : Locator = this.page.locator('[title="Security"]')

    constructor(public page:Page) {

    }

    async clickStatistics() {

        await this.statistics_menu.click()
    }

    async clickConfiguration() {

        await this.configuration_menu.click()
    }

    async searchForPort(port:string, switch_name:string){

        // Searching for a specific port in a Switch Group

        await this.page.locator('[placeholder="Search"]').nth(1).fill(port)
        await this.page.locator('[placeholder="Search"]').nth(1).press("Enter")
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switch_text : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let port_to_click : Locator = this.page.locator('[class="t-black ng-binding"]')

        while(await switch_text.textContent() != switch_name){

            switch_text = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            // console.log(await switch_text.textContent());
            // console.log(i)
            i = i + 1
            
        }
        
        // console.log("After exiting the loop " + i)

        // if (await switch_text.textContent() == switch_name){
            
        if (i > 0){

            i = i - 1
        }

        // console.log(`i is ${i} and switch_text is ${await switch_text.textContent()}`)
        await port_to_click.nth(i).click()
            
        // }
    }

    async clickGeneral() {

        await this.general_button.click()
    }

    async clickPhysical() {

        await this.physical_button.click()
    }

    async clickNetwork() {

        await this.network_button.click()
    }

    async clickSecurity() {

        await this.security_button.click()
    }

    async getAdministrativeState(port:string, switch_name:string){

        // Getting the Administrative State for a specific port in a particular Switch Group

        await this.page.locator('[placeholder="Search"]').nth(1).fill(port)
        await this.page.locator('[placeholder="Search"]').nth(1).press("Enter")
        await this.clickGeneral()
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switch_text : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let admins_state_text : Locator = this.page.locator('[data-column-id="adminState"]')

        while(await switch_text.textContent() != switch_name){

            switch_text = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            // console.log(await switch_text.textContent());
            // console.log(i)
            i = i + 1
            
        }

        if (i == 0){

            i = i + 1
        }
        
        // console.log(`i is ${i} and switch_text is ${await switch_text.textContent()}`)
        // console.log(await admins_state_text.nth(i).textContent());
        // console.log("###################")
        const admins_state = await admins_state_text.nth(i).textContent()
        console.log(admins_state?.trim()) 

        return admins_state.trim()

    }

    async getOperationalState(port:string, switch_name:string){

        // Getting the Administrative State for a specific port in a particular Switch Group

        await this.page.locator('[placeholder="Search"]').nth(1).fill(port)
        await this.page.locator('[placeholder="Search"]').nth(1).press("Enter")
        await this.clickGeneral()
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switch_text : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let operational_state_text : Locator = this.page.locator('[data-column-id="operState"]')

        while(await switch_text.textContent() != switch_name){

            switch_text = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            // console.log(await switch_text.textContent());
            // console.log(i)
            i = i + 1
            
        }

        if (i == 0){

            i = i + 1
        }
        
        // console.log(`i is ${i} and switch_text is ${await switch_text.textContent()}`)
        const operational_state= await operational_state_text.nth(i).textContent()
        console.log(operational_state?.trim()) 
        
        return operational_state.trim()
    }

    async getType(port:string, switch_name:string) {

        // Getting the Port Type of a port of a Switch in a particular Switch Group
        
        await this.page.locator('[placeholder="Search"]').nth(1).fill(port)
        await this.page.locator('[placeholder="Search"]').nth(1).press("Enter")
        await this.clickNetwork()
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switch_text : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let type_text : Locator = this.page.locator('[data-column-id="type"]')

        while(await switch_text.textContent() != switch_name){

            switch_text = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            // console.log(await switch_text.textContent());
            // console.log(i)
            i = i + 1
            
        }

        if (i == 0){

            i = i + 1
        }
        
        const type = await type_text.nth(i).textContent()
        console.log(await type?.trim())

        return type.trim()
    }

    async getVLANs(port:string, switch_name:string) {

        // Getting the VLANs of a port of a Switch in a particular Switch Group
        
        await this.page.locator('[placeholder="Search"]').nth(1).fill(port)
        await this.page.locator('[placeholder="Search"]').nth(1).press("Enter")
        await this.clickNetwork()
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switch_text : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let vlans_text : Locator = this.page.locator('[data-column-id="vlans"]')

        while(await switch_text.textContent() != switch_name){

            switch_text = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            // console.log(await switch_text.textContent());
            // console.log(i)
            i = i + 1
            
        }

        if (i == 0){

            i = i + 1
        }
        
        const vlans = await vlans_text.nth(i).textContent()
        console.log(vlans)

        const vlans_list = vlans?.split(',')
        console.log(vlans_list)
        
        return vlans_list
    }

    async getNativeVlan(port:string, switch_name:string) {

        // Getting the Native VLAN of a port of a Switch in a particular Switch Group
        
        await this.page.locator('[placeholder="Search"]').nth(1).fill(port)
        await this.page.locator('[placeholder="Search"]').nth(1).press("Enter")
        await this.clickNetwork()
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switch_text : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let native_vlan_text : Locator = this.page.locator('[data-column-id="nativeVlan"]')

        while(await switch_text.textContent() != switch_name){

            switch_text = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            // console.log(await switch_text.textContent());
            // console.log(i)
            i = i + 1
            
        }

        if (i == 0){

            i = i + 1
        }
        
        const native_vlan = await native_vlan_text.nth(i).textContent()
        console.log(native_vlan)
        
        return native_vlan?.trim()
    }


}

export class PortPage {

    private readonly basic_menu : Locator = this.page.locator('[title="Basic"]').nth(0)
    private readonly physical_menu : Locator = this.page.locator('[title="Physical"]').nth(0)
    private readonly network_menu : Locator = this.page.locator('[title="Network"]').nth(0)
    private readonly security_menu : Locator = this.page.locator('[title="Security"]').nth(0)

    constructor (public page: Page) {

    }

    async clickBasic() {

        await this.basic_menu.click()
    }

    async clickPhysical() {

        await this.physical_menu.click()
    }

    async clickNetwork() {

        await this.network_menu.click()
    }

    async clickSecurity() {

        await this.security_menu.click()
    }

    async saveConfig() {

        const save = this.page.locator('[class="btn btn-primary w-xs ng-binding"]')
        
        if(await save.isDisabled()){

            console.log("The button is disabled")
        }
        else{
            
            await save.click()
            console.log("The configuration has been saved")
        }
    }
}

export class PhysicalPortPage {

    private readonly administrative_state_menu : Locator = this.page.locator('[id="shutdown"]')
    private readonly speed_menu : Locator = this.page.locator('[id="speed"]')

    constructor (public page: Page) {

    }

    async changeAdministrativeStatePort(state:string) {

        // Enabling/Disabling the ports

        await this.administrative_state_menu.click()
        await this.page.click(`[title="${state}"]`)
        console.log(`The port has been ${state}d`)
    }

    async changeSpeedPort(speed:string) {

        // Changing the speed port

        await this.speed_menu.click()
        await this.page.click(`[title="${speed}"]`)
        console.log(`The port speed has been changed to ${speed}`)
    }

}


export class NetworkPortPage {

    private readonly port_type_menu : Locator = this.page.locator('[id="accessMode"]')
    private readonly stp_status : Locator = this.page.locator('[id="stpStatus"]')
    private readonly bpdu_guard_status : Locator = this.page.locator('[id="bpduGuard"]')
    private readonly portfast_status : Locator = this.page.locator('[id="portFast"]')
    private readonly vlan_id : Locator = this.page.locator('[name="vlanId"]')
    private readonly available_vlans : Locator = this.page.locator('[class="inline m-t-xs m-l-xs"]')
    private readonly native_vlan : Locator = this.page.locator('[name="nativeVlan"]')
    private readonly tagged_check : Locator = this.page.locator('[class="i-checks i-checks-sm"]')
    private readonly vlan_priority_menu : Locator = this.page.locator('[class="col-md-2 no-padder table-responsive table-lg"]')
    private readonly vlan_stp_priority_menu: Locator = this.page.locator('[id="stpPriority"]')

    constructor(public page:Page) {

    }

    async changeTypePort(type:string) {

        // Changing the Port Type of a particular port

        await this.port_type_menu.click()

        if (type == "Access") {

            await this.page.locator(`[title="${type}"]`).nth(0).click()
        }

        else if (type == "Hybrid") {

            await this.page.locator(`[title="${type}"]`).nth(2).click()
        }

        else if (type == "Trunk") {

            await this.page.locator(`[title="${type}"]`).nth(0).click()
        }

        else {

            console.log("The type for the port is not VALID")
        }
    }

    async checkAvailableVlans() {

        const available_vlans_text = await this.available_vlans.textContent()
        console.log(await available_vlans_text)

        const vlan_list = available_vlans_text.split(" - ")[1].trim()
        console.log(vlan_list.split(","))

        return vlan_list.split(",")
    }
    
    async insertVlan(vlan:string) {

        // Inserting VLAN id

        if (await this.vlan_id.isDisabled()) {

            console.log("The button VLAN ID is disabled")
        }
        
        else {

            await this.vlan_id.fill(vlan)
            console.log(`The VLAN ${vlan} has been configured`)
        }
    }

    async insertNativeVlans(vlan_native:string) {

        // Inserting Native VLAN id

        if (await this.native_vlan.isDisabled()){

            console.log("The button Native VLAN is disabled")
        }

        else {

            await this.native_vlan.fill(vlan_native)
            console.log(`The Native VLAN ${vlan_native} has been configured`)
        }
    }

    async checkTagged(answer:string) {

        if (answer == "Yes") {

            if (await this.tagged_check.isVisible()) {

                await this.tagged_check.check()
                console.log("The Tagged has been checked")
            }

            else {

                console.log("The buttong tagged_check is not visible")
            }
        }
    }

    async selectStatusSTP(status:string){

        // Selecting the STP Status
        if (status == "Enable" || status == "Disable"){
                
            await this.stp_status.nth(0).click()
            await this.stp_status.nth(0).locator(`[title="${status}"]`).click()
            console.log(`The status ${status} has been selected succesfully`)
        }
        else {

            console.log("The status received can not be processed. Choose a valid Status!")
        }
    }

    async selectStatusBPDUGuard(status:string){

        // Selecting the BPDU Guard Status
        
        if (status == "Enable" || status == "Disable"){

            await this.bpdu_guard_status.click()
            await this.bpdu_guard_status.locator('[role="menu"]').locator(`[title="${status}"]`).click()
            console.log(`The status ${status} has been selected succesfully`)
        }
        else {

            console.log("The status received can not be processed. Choose a valid Status!")
        }

    }

    async selectStatusPortFast(status:string){

        // Selecting the Port Fast Status
        
        if (status == "Enable" || status == "Disable"){

            await this.portfast_status.click()
            await this.portfast_status.locator('[role="menu"]').locator(`[title="${status}"]`).click()
            console.log(`The status ${status} has been selected succesfully`)
        }

        else {

            console.log("The status received can not be processed. Choose a valid Status!")
        }
    }

    async configurePriorityVLAN(vlan:string, priority:string) {

        // Configuring the Priority for a Specific VLAN

        if (Number(vlan)) {
        
            if (parseInt(priority) % 16 == 0) {

                
                const vlan_id = this.page.locator('[class="p-t-xs ng-binding"]')
                let i = 0

                while(await vlan_id.nth(i).textContent() != vlan) {

                    console.log(await vlan_id.nth(i).textContent())
                    i += 1
                    
                }

                console.log(await vlan_id.nth(i).textContent())
                console.log("The index is: " + i)

                if (await vlan_id.nth(i).textContent() == vlan) {

                    await this.vlan_stp_priority_menu.nth(i).click()
                    await this.vlan_stp_priority_menu.nth(i).locator('[role="menu"]').locator(`[title="${priority}"]`).click()

                }
            }
            
            else{
                
                console.log("Select a valid priority. The priority must be multiple of 16")
            }
        }

        else {

            console.log("Select a valid VLAN");
            
        }
    }

    async configureStatusSTPVLAN(vlan:string, status:string) {

        // Configuring the STP status for a Specific VLAN

        if (Number(vlan)) {

            if (status == "Enable" || status == "Disable") {

                const vlan_id = this.page.locator('[class="p-t-xs ng-binding"]')
                let i = 0

                while(await vlan_id.nth(i).textContent() != vlan) {

                    console.log(await vlan_id.nth(i).textContent())
                    i += 1
                    
                }

                console.log(await vlan_id.nth(i).textContent())
                console.log("The index is: " + i)

                if (await vlan_id.nth(i).textContent() == vlan) {

                    await this.stp_status.nth(i+1).click()
                    await this.stp_status.nth(i+1).locator('[role="menu"]').locator(`[title="${status}"]`).click()

                }
            }

            else {

                console.log("The status received can not be processed. Choose a valid Status")
            }
        }
        else {
            console.log("Select a valid VLAN")
        }
    }
}

export class StatisticsPage {

    constructor(public page: Page) {

    }

    async getRow(index:number) {

        const row = await this.page.getByRole('row').nth(index)
        // console.log(await row.textContent())

        return row
    }

    async getPortId(index:number) {

        const row = await this.getRow(index)
        const port_id = await row.locator('[data-column-id="port"]').textContent()
        console.log(port_id);
        
        return port_id
    }

    async getPortDescription(index:number) {

        const row = await this.getRow(index)
        const description = await row.locator('[data-column-id="description"]').textContent()
        console.log(description);
        
        return description
    }

    async getTotalRxPackets(index:number) {

        const row = await this.getRow(index)
        const total_rx_packets = await row.locator('[data-column-id="RxTotalPkts"]').textContent()
        console.log(total_rx_packets)

        return total_rx_packets
    }

    async getTotalTxPackets(index:number) {

        const row = await this.getRow(index)
        const total_tx_packets = await row.locator('[data-column-id="TxTotalPkts"]').textContent()
        console.log(total_tx_packets)

        return total_tx_packets
    }

    async getPortLinkTransitions(index:number) {

        const row = await this.getRow(index)
        const nr_of_link_transitions = await row.locator('[data-column-id="ifCnPortLinkTransitions"]').textContent()
        console.log(nr_of_link_transitions);
        
        return nr_of_link_transitions
    }
    
    async getSwitchNameOfPort(index:number) {

        const row = await this.getRow(index)
        const switch_name_of_port = await row.locator('[data-column-id="switch"]').textContent()
        console.log(switch_name_of_port);
        
        return switch_name_of_port
    }
    
}

export class SoftwareUpgrade {

    private readonly actions_menu : Locator = this.page.locator('[default-label="Actions"]')
    private readonly configuration_button : Locator = this.page.locator('[class="ng-binding ng-scope"]',{hasText: "Configuration"})
    private readonly softupgrade_button : Locator = this.page.locator('[class="ng-binding ng-scope"]',{hasText: "Software Upgrade"})
    private readonly searchbar: Locator = this.page.locator('[type="search"]').nth(1)
    private readonly checkbox : Locator = this.page.locator('[type="checkbox"]')
    private readonly software_image_dropdown : Locator = this.page.locator('[name="dropDownButton"]')
    private readonly add_software_job_to_device_button : Locator = this.page.locator('[type="button"]', {hasText: "Add Software Job to  device(s)"})
    private readonly view_jobs : Locator = this.page.locator('[class="cn-link"]', {hasText: "View Update Jobs"})
    private readonly disableAutoReboot_checkbox : Locator = this.page.locator('[class="i-checks i-checks-sm"]', {hasText: "Disable Auto Reboot"})
    private readonly software_version : Locator = this.page.locator('[data-column-id="actSw"]')
    private readonly dropdown_image_menu : Locator = this.page.locator('[class="dropdown-menu h-down"]')
    private readonly switch_group_name : Locator = this.page.locator('[data-column-id="swGroup"]')

    constructor(public page:Page) {

    }

    async clickActions() {

        // console.log(await this.actions_menu.isDisabled())
        // console.log(await this.actions_menu.isEnabled())
        // console.log(await this.actions_menu.isVisible())
        // console.log(await this.actions_menu.isHidden())

        if (await this.actions_menu.isEnabled()) {

            // console.log("The button is 'Actions' is enabled")
            await this.actions_menu.click()
        }
        
        else {
            console.log("The button 'Actions' is disabled")
        }
        
    }
    async searchSwitch(switch_name: string) {

        // Searching for a Swith Group

        await this.searchbar.fill(switch_name)
        await this.searchbar.press("Enter")
    }

    async clickCheckSwitch(switch_name:string, id: number){

        // Checking the Switch

        await this.searchbar.fill(switch_name)
        await this.searchbar.press("Enter")
        await this.page.waitForTimeout(2000)
        await this.checkbox.nth(id).click()
    }

    async clickCheckAll() {

        await this.page.waitForTimeout(2000)
        await this.checkbox.nth(0).click()
    }


    async clickConfiguration() {

        await this.configuration_button.click()
    }

    async clickSoftUpdate() {

        await this.softupgrade_button.click()
    }

    async chooseSoftwareImageForUpdate(image:string) {

        // Choosing the software image to update to

        await this.software_image_dropdown.click()
        await this.page.waitForTimeout(1000)
        await this.dropdown_image_menu.locator(`[title="${image}"]`).click()
    }

    async clickAddSoftwareUpdate() {

        await this.add_software_job_to_device_button.click()
    }

    async clickViewJobs() {

        await this.view_jobs.click()
    }

    async checkDisableAutoReboot() {

        // console.log(await this.disableAutoReboot_checkbox.isChecked())
        await this.disableAutoReboot_checkbox.check()
        // console.log(await this.disableAutoReboot_checkbox.isChecked())
    }

    async getSoftwareVersion(id: number) {

        const soft_version = await this.software_version.nth(id).textContent()
        console.log(soft_version?.trim())

        return soft_version?.trim()
    }

    async getSwitchGroup(id: number) {

        const switch_group = await this.switch_group_name.nth(id).textContent()
        console.log(switch_group?.trim())

        return switch_group?.trim()
    }
}