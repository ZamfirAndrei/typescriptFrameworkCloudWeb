import { Page, Locator } from "@playwright/test"
import loginPage from "./loginPage"

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
            console.log(await switch_text.textContent());
            console.log(i)
            i = i + 1
            
        }
        
        // console.log("After exiting the loop " + i)

        // if (await switch_text.textContent() == switch_name){
            
        if (i > 0){

            i = i - 1
        }

        console.log(`i is ${i} and switch_text is ${await switch_text.textContent()}`)
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

        // Getting the Administrative State for a specific port in a Switch Group

        await this.page.locator('[placeholder="Search"]').nth(1).fill(port)
        await this.page.locator('[placeholder="Search"]').nth(1).press("Enter")
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switch_text : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let admins_state_text : Locator = this.page.locator('[data-column-id="adminState"]')

        while(await switch_text.textContent() != switch_name){

            switch_text = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            console.log(await switch_text.textContent());
            console.log(i)
            i = i + 1
            
        }

        if (i == 0){

            i = i + 1
        }
        
        console.log(`i is ${i} and switch_text is ${await switch_text.textContent()}`)
        // console.log(await admins_state_text.nth(i).textContent());
        // console.log("###################")
        const admins_state = await admins_state_text.nth(i).textContent()
        console.log(admins_state?.trim()) 

        return admins_state

    }

    async getOperationalState(port:string, switch_name:string){

        // Getting the Administrative State for a specific port in a Switch Group

        await this.page.locator('[placeholder="Search"]').nth(1).fill(port)
        await this.page.locator('[placeholder="Search"]').nth(1).press("Enter")
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switch_text : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let operational_state_text : Locator = this.page.locator('[data-column-id="operState"]')

        while(await switch_text.textContent() != switch_name){

            switch_text = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            console.log(await switch_text.textContent());
            // console.log(i)
            i = i + 1
            
        }

        if (i == 0){

            i = i + 1
        }
        
        console.log(`i is ${i} and switch_text is ${await switch_text.textContent()}`)
        const operational_state= await operational_state_text.nth(i).textContent()
        console.log(operational_state?.trim()) 
        
        return operational_state
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
    private readonly vlan_id : Locator = this.page.locator('[name="vlanId"]')
    private readonly available_vlans : Locator = this.page.locator('[class="inline m-t-xs m-l-xs"]')
    private readonly native_vlan : Locator = this.page.locator('[name="nativeVlan"]')
    private readonly tagged_check : Locator = this.page.locator('[class="i-checks i-checks-sm"]')

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

        // Inserting VLAN

        if (await this.vlan_id.isDisabled()) {

            console.log("The button VLAN ID is disabled")
        }
        
        else {

            await this.vlan_id.fill(vlan)
            console.log(`The VLAN ${vlan} has been configured`)
        }
    }

    async insertNativeVlans(vlan_native:string) {

        if (await this.native_vlan.isDisabled()){

            console.log("The button Native VLAN is disabled")
        }

        else {

            await this.native_vlan.fill(vlan_native)
            console.log(`The Native VLAN ${vlan_native} has been configured`)
        }
    }

    async checkTagged(answer:string) {
        
        // Trb sa rezolv cu butonul asta ca nu merge

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
}