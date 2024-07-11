import { CloudObjects } from "../management/cloudObjects";
import { NetworkPortPage } from "../pages/particularSwitchGroupPage/networkPortPage";
import { SwitchPortsPage } from "../pages/particularSwitchGroupPage/switchPortsPage";
import { Page } from "@playwright/test";
import { test, expect, Locator} from "@playwright/test";
import { SwitchGroupFlow } from "./switchgroupFlow";

export class PortConfigurationFlow {

    private readonly cloud : CloudObjects
    private readonly networkportsObj : NetworkPortPage
    private readonly switchportsObj : SwitchPortsPage
    private readonly switchGroupFlow: SwitchGroupFlow

    private getRowContent = (port: string) => this.page.getByRole('row', {name: `${port}`})
    private portLocatorBySwitchName = (switchName: string) => this.page.locator('[role="row"]', {hasText: `${switchName}`})

    constructor(public page: Page) {

        this.cloud = new CloudObjects(page)
        this.networkportsObj = new NetworkPortPage(page)
        this.switchportsObj = new SwitchPortsPage(page)
        this.switchGroupFlow = new SwitchGroupFlow(page)
    }

    async configureVlan(vlan: string): Promise<void> {

        if (await this.networkportsObj.checkVlanIdButton()) {

            await this.networkportsObj.insertVlan(vlan)
            console.log(`The VLAN ${vlan} has been configured`)
            
        }
        
        else {

            console.log("The button VLAN ID is disabled")
        }
    }

    async configureNativeVlan(vlanNative: string) : Promise<void> {  

        if (await this.networkportsObj.checkNativeVlanButton()){

            console.log("The button Native VLAN is disabled")
        }

        else {

            await  this.networkportsObj.insertNativeVlan(vlanNative)
            console.log(`The Native VLAN ${vlanNative} has been configured`)
        }
    }

    async searchPort(port: string) : Promise<void> {

        await this.page.waitForTimeout(2000)
        await this.switchportsObj.searchPlaceholder.nth(1).fill(port)
        // await this.page.waitForTimeout(2000)
        await this.switchportsObj.searchPlaceholder.nth(1).press("Enter", {timeout: 2000})
    }

    async searchAndClickPort(port: string, switchName: string) : Promise<void> {

        await this.searchPort(port)
        await this.page.waitForTimeout(2000)
        await this.portLocatorBySwitchName(switchName).locator('[data-column-id="port"]').click({timeout: 2000})

    }

    async selectStatusSTP(status: string) : Promise<void> {

        if (status == "Enable" || status == "Disable"){
                
            this.networkportsObj.selectStatusSTP(status)
            console.log(`The status ${status} has been selected succesfully`)
        }
        else {

            console.log("The status received can not be processed. Choose a valid Status!")
        }
    }

    async selectStatusBPDUGuard(status: string) : Promise<void> {
        
        if (status == "Enable" || status == "Disable"){

            await this.networkportsObj.selectStatusBPDUGuard(status)
            console.log(`The status ${status} has been selected succesfully`)
        }
        else {

            console.log("The status received can not be processed. Choose a valid Status!")
        }

    }

    async selectStatusPortFast(status: string) : Promise<void> {
        
        if (status == "Enable" || status == "Disable"){

            await this.networkportsObj.selectStatusPortFast(status)
            console.log(`The status ${status} has been selected succesfully`)
        }

        else {

            console.log("The status received can not be processed. Choose a valid Status!")
        }
    }

    async configureSTPPortPriority(priority: string) : Promise<void> {

        if (!isNaN(Number(priority)) && parseInt(priority) % 16 == 0) {
        
            await this.networkportsObj.configureSTPPortPriority(priority)
            console.log(`The port-priority ${priority} has been configured succesfully`)

        }

        else {

            console.log("Select a valid priority. The priority must be a number and multiple of 16")
        }
    }

    async configurePVRSTPortPriority(vlanId: string, priority: string) : Promise<void> {

        if (!isNaN(Number(vlanId)) && !isNaN(Number(priority)) && parseInt(priority) % 16 == 0) {
        
            await this.networkportsObj.configurePVRSTPortPriority(vlanId, priority)
            console.log(`The port-priority ${priority} has been configured succesfully for vlan ${vlanId}`)

        }

        else {

            console.log("Select a valid priority. The priority must be a number and multiple of 16")
        }
    }

    async configurePVRSTStatusSTPVlan(vlanId: string, status: string) : Promise<void> {

        if (!isNaN(Number(vlanId))) {

            if(status == "Enable" || status == "Disable") {
        
                await this.networkportsObj.configurePVRSTStatusSTPVlan(vlanId, status)
                console.log(`The status ${status} has been configured succesfully for vlan ${vlanId}`)
            }

            else {

                console.log("Select a valid priority. The priority must be a number and multiple of 16")
            }
            
        }
        
        else {

            console.log("Select a valid VLAN")
        }
    }

    async navigatoToSwitchPortConfigurationOfSwitchGroup(switchGroup: string, port: string, device: string) : Promise<void> {

        await this.cloud.toolbarObj.clickSwitchGroupsPage()
        await this.cloud.switchgroupObj.clickSwitchGroup(switchGroup)
        await this.cloud.partSwitchgroupObj.clickSwitchPorts()
        await this.searchAndClickPort(port, device)
    }

    async navigateToDeviceConfigurationFromPortConfiguration(device: string) : Promise<void> {

        await this.page.waitForTimeout(2000)
        await this.cloud.toolbarObj.clickDevicePage()
        await this.cloud.deviceObj.clickSwitches()
        await this.cloud.deviceObj.clickDevice(device)
        await this.cloud.partDeviceObj.clickConfiguration()
    }

    a
    async confirmApplyConfigurationSyncing(jobMessages: string, syncStatusMessage: string) : Promise <void> {

        await this.cloud.page.waitForTimeout(2000)
        await this.switchGroupFlow.applySwitchConfiguration()
        expect(await this.cloud.confObj.getMessageApplyConfiguration()).toBe(jobMessages)
        await this.cloud.confObj.expectSyncStatusDeviceToBe(syncStatusMessage)
    }
    

}