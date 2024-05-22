import { Page, Locator } from "@playwright/test"
import loginPage from "./loginPage"
import { isNumberObject } from "util/types"
import { log } from "console"
import { NetworkPage, addswitchgroupPage } from "./addswitchgroupPage"

// This is the page of cnMaestro particular Switch Group Page

export class ParticularSwitchGroupPage {

    private readonly dashboardMenu : Locator = this.page.locator('[cns-auto="Dashboard"]')
    private readonly notificationsMenu : Locator = this.page.locator('[cns-auto="Notifications"]')
    private readonly configurationMenu : Locator = this.page.locator('[cns-auto="Configuration"]')
    private readonly statisticsMenu : Locator = this.page.locator('[cns-auto="Statistics"]').nth(0)
    private readonly switchesMenu : Locator = this.page.locator('[cns-auto="Switches"]')
    private readonly switchPortsMenu : Locator = this.page.locator('[cns-auto="Switch Ports"]')
    private readonly managementMenu : Locator = this.page.locator('[title="Management"]')

    constructor(public page:Page) {

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

    async clickStatistics() {

        await this.statisticsMenu.click()
    }

    async clickSwitches() {

        await this.switchesMenu.click()
    }

    async clickSwitchPorts() {

        await this.switchPortsMenu.click()
    }

}

export class SwitchPortsPage {

    private readonly configurationMenu : Locator = this.page.locator('[cns-auto="Configuration"]').nth(1)
    private readonly statisticsMenu : Locator = this.page.locator('[cns-auto="Statistics"]').nth(1)
    private readonly generalButton : Locator = this.page.locator('[title="General"]')
    private readonly physicalButton : Locator = this.page.locator('[title="Physical"]')
    private readonly networkButton : Locator = this.page.locator('[title="Network"]')
    private readonly securityButton : Locator = this.page.locator('[title="Security"]')
    private readonly searchPlaceholder : Locator = this.page.locator('[placeholder="Search"]')

    constructor(public page:Page) {

    }

    async clickStatistics() {

        await this.statisticsMenu.click()
    }

    async clickConfiguration() {

        await this.configurationMenu.click()
    }

    async searchForPort(port: string, switchName: string){

        await this.searchPlaceholder.nth(1).fill(port)
        await this.searchPlaceholder.nth(1).press("Enter")
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switchText : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let portToClick : Locator = this.page.locator('[class="t-black ng-binding"]')

        while(await switchText.textContent() != switchName){

            switchText = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            // console.log(await switchText.textContent());
            // console.log(i)
            i = i + 1
            
        }
        
        // console.log("After exiting the loop " + i)

        // if (await switchText.textContent() == switchName){
            
        if (i > 0){

            i = i - 1
        }

        // console.log(`i is ${i} and switchText is ${await switchText.textContent()}`)
        await portToClick.nth(i).click()
            
        // }
    }

    async clickGeneral() {

        await this.generalButton.click()
    }

    async clickPhysical() {

        await this.physicalButton.click()
    }

    async clickNetwork() {

        await this.networkButton.click()
    }

    async clickSecurity() {

        await this.securityButton.click()
    }

    async getAdministrativeState(port: string, switchName: string){

        await this.searchPlaceholder.nth(1).fill(port)
        await this.searchPlaceholder.nth(1).press("Enter")
        await this.clickGeneral()
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switchText : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let adminsStateText : Locator = this.page.locator('[data-column-id="adminState"]')

        while(await switchText.textContent() != switchName){

            switchText = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            // console.log(await switchText.textContent());
            // console.log(i)
            i = i + 1
            
        }

        if (i == 0){

            i = i + 1
        }
        
        // console.log(`i is ${i} and switchText is ${await switchText.textContent()}`)
        // console.log(await adminsStateTest.nth(i).textContent());
        // console.log("###################")
        const adminsState = await adminsStateText.nth(i).textContent()
        // console.log(adminsState?.trim()) 

        return adminsState?.trim()

    }

    async getOperationalState(port: string, switchName: string){

        await this.searchPlaceholder.nth(1).fill(port)
        await this.searchPlaceholder.nth(1).press("Enter")
        await this.clickGeneral()
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switchText : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let operationalStateText : Locator = this.page.locator('[data-column-id="operState"]')

        while(await switchText.textContent() != switchName){

            switchText = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            // console.log(await switchText.textContent());
            // console.log(i)
            i = i + 1
            
        }

        if (i == 0){

            i = i + 1
        }
        
        // console.log(`i is ${i} and switchText is ${await switchText.textContent()}`)
        const operationalState= await operationalStateText.nth(i).textContent()
        // console.log(operationalState?.trim()) 
        
        return operationalState?.trim()
    }

    async getType(port: string, switchName: string) {
        
        await this.searchPlaceholder.nth(1).fill(port)
        await this.searchPlaceholder.nth(1).press("Enter")
        await this.clickNetwork()
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switchText : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let typeText : Locator = this.page.locator('[data-column-id="type"]')

        while(await switchText.textContent() != switchName){

            switchText = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            // console.log(await switchText.textContent());
            // console.log(i)
            i = i + 1
            
        }

        if (i == 0){

            i = i + 1
        }
        
        const type = await typeText.nth(i).textContent()
        // console.log(type?.trim())

        return type?.trim()
    }

    async getVLANs(port: string, switchName: string) {
        
        await this.searchPlaceholder.nth(1).fill(port)
        await this.searchPlaceholder.nth(1).press("Enter")
        await this.clickNetwork()
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switchText : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let vlansText : Locator = this.page.locator('[data-column-id="vlans"]')

        while(await switchText.textContent() != switchName){

            switchText = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            // console.log(await switchText.textContent());
            // console.log(i)
            i = i + 1
            
        }

        if (i == 0){

            i = i + 1
        }
        
        const vlans = await vlansText.nth(i).textContent()
        // console.log(vlans)

        const vlansList = vlans?.split(',')
        // console.log(vlansList)
        
        return vlansList
    }

    async getNativeVlan(port: string, switchName: string) {
        
        await this.searchPlaceholder.nth(1).fill(port)
        await this.searchPlaceholder.nth(1).press("Enter")
        await this.clickNetwork()
        await this.page.waitForTimeout(2000)
        
        let i = 0
        let switchText : Locator = this.page.locator('[title="View Switch Dashboard"]').nth(i)
        let nativeVlanText : Locator = this.page.locator('[data-column-id="nativeVlan"]')

        while(await switchText.textContent() != switchName){

            switchText = this.page.locator('[title="View Switch Dashboard"]').nth(i)
            // console.log(await switchText.textContent());
            // console.log(i)
            i = i + 1
            
        }

        if (i == 0){

            i = i + 1
        }
        
        const nativeVlan = await nativeVlanText.nth(i).textContent()
        console.log(nativeVlan)
        
        return nativeVlan?.trim()
    }

}

export class PortPage {

    private readonly basicMenu : Locator = this.page.locator('[title="Basic"]').nth(0)
    private readonly physicalMenu : Locator = this.page.locator('[title="Physical"]').nth(0)
    private readonly networkMenu : Locator = this.page.locator('[title="Network"]').nth(0)
    private readonly securityMenu : Locator = this.page.locator('[title="Security"]').nth(0)

    constructor (public page: Page) {

    }

    async clickBasic() {

        await this.basicMenu.click()
    }

    async clickPhysical() {

        await this.physicalMenu.click()
    }

    async clickNetwork() {

        await this.networkMenu.click()
    }

    async clickSecurity() {

        await this.securityMenu.click()
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

    private readonly administrativeStateMenu : Locator = this.page.locator('[id="shutdown"]')
    private readonly speedMenu : Locator = this.page.locator('[id="speed"]')

    constructor (public page: Page) {

    }

    async changeAdministrativeStatePort(state: string) {

        await this.administrativeStateMenu.click()
        await this.page.click(`[title="${state}"]`)
        console.log(`The port has been ${state}d`)
    }

    async changeSpeedPort(speed:string) {

        await this.speedMenu.click()
        await this.page.click(`[title="${speed}"]`)
        console.log(`The port speed has been changed to ${speed}`)
    }

}


export class NetworkPortPage {

    private readonly port_type_menu : Locator = this.page.locator('[id="accessMode"]')
    private readonly stpStatus : Locator = this.page.locator('[id="stpStatus"]')
    private readonly bpduGuardStatus : Locator = this.page.locator('[id="bpduGuard"]')
    private readonly portfast_status : Locator = this.page.locator('[id="portFast"]')
    private readonly vlanId : Locator = this.page.locator('[name="vlanId"]')
    private readonly availableVlans : Locator = this.page.locator('[class="inline m-t-xs m-l-xs"]')
    private readonly nativeVlan : Locator = this.page.locator('[name="nativeVlan"]')
    private readonly taggedCheck : Locator = this.page.locator('[class="i-checks i-checks-sm"]')
    private readonly vlanPriorityMenu : Locator = this.page.locator('[class="col-md-2 no-padder table-responsive table-lg"]')
    private readonly vlanStpPriorityMenu: Locator = this.page.locator('[id="stpPriority"]')

    constructor(public page:Page) {

    }

    async changeTypePort(type:string) {

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

        const availableVlansText = await this.availableVlans.textContent()
        const vlanList = availableVlansText?.split(" - ")[1].trim()

        return vlanList?.split(",")
    }
    
    async insertVlan(vlan:string) {

        if (await this.vlanId.isDisabled()) {

            console.log("The button VLAN ID is disabled")
        }
        
        else {

            await this.vlanId.fill(vlan)
            console.log(`The VLAN ${vlan} has been configured`)
        }
    }

    async insertNativeVlans(vlanNative:string) {

        if (await this.nativeVlan.isDisabled()){

            console.log("The button Native VLAN is disabled")
        }

        else {

            await this.nativeVlan.fill(vlanNative)
            console.log(`The Native VLAN ${vlanNative} has been configured`)
        }
    }

    async checkTagged(answer:string) {

        if (answer == "Yes") {

            if (await this.taggedCheck.isVisible()) {

                await this.taggedCheck.check()
                console.log("The Tagged has been checked")
            }

            else {

                console.log("The buttong tagged_check is not visible")
            }
        }
    }

    async selectStatusSTP(status:string){

        if (status == "Enable" || status == "Disable"){
                
            await this.stpStatus.nth(0).click()
            await this.stpStatus.nth(0).locator(`[title="${status}"]`).click()
            console.log(`The status ${status} has been selected succesfully`)
        }
        else {

            console.log("The status received can not be processed. Choose a valid Status!")
        }
    }

    async selectStatusBPDUGuard(status:string){
        
        if (status == "Enable" || status == "Disable"){

            await this.bpduGuardStatus.click()
            await this.bpduGuardStatus.locator('[role="menu"]').locator(`[title="${status}"]`).click()
            console.log(`The status ${status} has been selected succesfully`)
        }
        else {

            console.log("The status received can not be processed. Choose a valid Status!")
        }

    }

    async selectStatusPortFast(status:string){
        
        if (status == "Enable" || status == "Disable"){

            await this.portfast_status.click()
            await this.portfast_status.locator('[role="menu"]').locator(`[title="${status}"]`).click()
            console.log(`The status ${status} has been selected succesfully`)
        }

        else {

            console.log("The status received can not be processed. Choose a valid Status!")
        }
    }

    async configurePriorityVLAN(vlan: string, priority: string) {

        if (Number(vlan)) {
        
            if (parseInt(priority) % 16 == 0) {

                
                const vlanId = this.page.locator('[class="p-t-xs ng-binding"]')
                let i = 0

                while(await vlanId.nth(i).textContent() != vlan) {

                    console.log(await vlanId.nth(i).textContent())
                    i += 1
                    
                }

                console.log(await vlanId.nth(i).textContent())
                console.log("The index is: " + i)

                if (await vlanId.nth(i).textContent() == vlan) {

                    await this.vlanStpPriorityMenu.nth(i).click()
                    await this.vlanStpPriorityMenu.nth(i).locator('[role="menu"]').locator(`[title="${priority}"]`).click()

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

    async configureStatusSTPVLAN(vlan: string, status: string) {

        if (Number(vlan)) {

            if (status == "Enable" || status == "Disable") {

                const vlanId = this.page.locator('[class="p-t-xs ng-binding"]')
                let i = 0

                while(await vlanId.nth(i).textContent() != vlan) {

                    console.log(await vlanId.nth(i).textContent())
                    i += 1
                    
                }

                console.log(await vlanId.nth(i).textContent())
                console.log("The index is: " + i)

                if (await vlanId.nth(i).textContent() == vlan) {

                    await this.stpStatus.nth(i+1).click()
                    await this.stpStatus.nth(i+1).locator('[role="menu"]').locator(`[title="${status}"]`).click()

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

        const row = this.page.getByRole('row').nth(index)

        return row
    }

    async getPortId(index:number) {

        const row = await this.getRow(index)
        const portId = await row.locator('[data-column-id="port"]').textContent()
 
        return portId
    }

    async getPortDescription(index: number) {

        const row = await this.getRow(index)
        const description = await row.locator('[data-column-id="description"]').textContent()
        
        return description
    }

    async getTotalRxPackets(index: number) {

        const row = await this.getRow(index)
        const totalRxPackets = await row.locator('[data-column-id="RxTotalPkts"]').textContent()

        return totalRxPackets
    }

    async getTotalTxPackets(index: number) {

        const row = await this.getRow(index)
        const totalTxPackets = await row.locator('[data-column-id="TxTotalPkts"]').textContent()

        return totalTxPackets
    }

    async getPortLinkTransitions(index: number) {

        const row = await this.getRow(index)
        const nrOfLinkTransitions = await row.locator('[data-column-id="ifCnPortLinkTransitions"]').textContent()
        
        return nrOfLinkTransitions
    }
    
    async getSwitchNameOfPort(index: number) {

        const row = await this.getRow(index)
        const switchNameOfPort = await row.locator('[data-column-id="switch"]').textContent()
        
        return switchNameOfPort
    }
    
}

export class SwitchesPage {

    private readonly searchBar : Locator = this.page.locator('[placeholder="Search"]').nth(1)

    constructor(public page: Page) {

    }

    async searchForSwitch(switchName: string){

        await this.searchBar.fill(switchName)
        await this.searchBar.press('Enter')
        
    }

    async clickSwitch(switchName: string) {

        await this.searchForSwitch(switchName)
        await this.page.waitForTimeout(2000)
        await this.page.locator('[title="View Dashboard Details"]').getByText(switchName).click()
    }
}

export class SoftwareUpgrade {

    private readonly actionsMenu : Locator = this.page.locator('[default-label="Actions"]')
    private readonly configurationButton : Locator = this.page.locator('[class="ng-binding ng-scope"]',{hasText: "Configuration"})
    private readonly softupgradeButton : Locator = this.page.locator('[class="ng-binding ng-scope"]',{hasText: "Software Upgrade"})
    private readonly searchBar: Locator = this.page.locator('[type="search"]').nth(1)
    private readonly checkbox : Locator = this.page.locator('[type="checkbox"]')
    private readonly softwareImageDropdown : Locator = this.page.locator('[name="dropDownButton"]')
    private readonly addSoftwareJobToDeviceButton : Locator = this.page.locator('[type="button"]', {hasText: "Add Software Job to  device(s)"})
    private readonly viewJobs : Locator = this.page.locator('[class="cn-link"]', {hasText: "View Update Jobs"})
    private readonly disableAutoReboot_checkbox : Locator = this.page.locator('[class="i-checks i-checks-sm"]', {hasText: "Disable Auto Reboot"})
    private readonly softwareVersion : Locator = this.page.locator('[data-column-id="actSw"]')
    private readonly dropdownImageMenu : Locator = this.page.locator('[class="dropdown-menu h-down"]')
    private readonly switchGroupName : Locator = this.page.locator('[data-column-id="swGroup"]')

    constructor(public page:Page) {

    }

    async clickActions() {

        if (await this.actionsMenu.isEnabled()) {

            await this.actionsMenu.click()
        }
        
        else {
            console.log("The button 'Actions' is disabled")
        }
        
    }
    async searchSwitch(switchName: string) {

        await this.searchBar.fill(switchName)
        await this.searchBar.press("Enter")
    }

    async clickCheckSwitch(switchName: string, id: number){

        await this.searchBar.fill(switchName)
        await this.searchBar.press("Enter")
        await this.page.waitForTimeout(2000)
        await this.checkbox.nth(id).click()
    }

    async clickCheckAll() {

        await this.page.waitForTimeout(2000)
        await this.checkbox.nth(0).click()
    }


    async clickConfiguration() {

        await this.configurationButton.click()
    }

    async clickSoftUpdate() {

        await this.softupgradeButton.click()
    }

    async chooseSoftwareImageForUpdate(image:string) {

        await this.softwareImageDropdown.click()
        await this.page.waitForTimeout(1000)
        await this.dropdownImageMenu.locator(`[title="${image}"]`).click()
    }

    async clickAddSoftwareUpdate() {

        await this.addSoftwareJobToDeviceButton.click()
    }

    async clickViewJobs() {

        await this.viewJobs.click()
    }

    async checkDisableAutoReboot() {

        await this.disableAutoReboot_checkbox.check()
    }

    async getSoftwareVersion(id: number) {

        const softVersion = await this.softwareVersion.nth(id).textContent()

        return softVersion?.trim()
    }

    async getSwitchGroup(id: number) {

        const switchGroup = await this.switchGroupName.nth(id).textContent()

        return switchGroup?.trim()
    }
}
export class ConfigurationPageSwitchGroup extends addswitchgroupPage {

    constructor(public page:Page){

        super(page)
    }

}

export class NetworkPageSwitchGroup extends NetworkPage {

    private readonly brgPriorityTable : Locator = this.page.locator('[class="dataTables_wrapper form-inline no-footer"]').last()
    private readonly vlanName : Locator = this.page.locator('[data-column-id="vlanName"]')
    private readonly vlanId : Locator = this.page.locator('[data-column-id="vlanId"]')
    private readonly bulkEditButton : Locator = this.page.locator('[class="btn btn-plain m-r-xs"]', {hasText: "Bulk Edit"})
    private readonly priorityInstanceMenu : Locator = this.page.locator('[id="priority"]')
    private readonly updateButton : Locator = this.page.locator('[class="btn btn-primary w-xs ng-binding"]', {hasText: "Update"})

    constructor(public page:Page){

        super(page)
    }

    private getRowContentBridgePriority = (vlanId : string) => {

        const row = this.brgPriorityTable.locator("[role='row']", {hasText: `${vlanId}`}).first()
        // const row = this.brgPriorityTable.getByRole('row').getByText(`${vlanId}`, {exact: true})

        return row
    }

    async selectInstancePVRST(vlanId: string): Promise<void> {

        const row = this.getRowContentBridgePriority(vlanId)
        await row.locator('[type="checkbox"]').click()
        await this.page.waitForTimeout(2000)

    }

    async clickBulkEdit() {

        await this.bulkEditButton.click()
    }

    async selectPriorityPVRST(priority: string) {

        await this.priorityInstanceMenu.click()
        await this.page.locator(`[title="${priority}"]`).click()
    }

    async clickUpdate() {

        await this.updateButton.click()
    }


}


