import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";

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

    async changeTypePort(type: string) {

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
    
    async insertVlan(vlan: string) {

        if (await this.vlanId.isDisabled()) {

            console.log("The button VLAN ID is disabled")
        }
        
        else {

            await this.vlanId.fill(vlan)
            console.log(`The VLAN ${vlan} has been configured`)
        }
    }

    async insertNativeVlans(vlanNative: string) {

        if (await this.nativeVlan.isDisabled()){

            console.log("The button Native VLAN is disabled")
        }

        else {

            await this.nativeVlan.fill(vlanNative)
            console.log(`The Native VLAN ${vlanNative} has been configured`)
        }
    }

    async checkTagged(answer: string) {

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

    async selectStatusSTP(status: string){

        if (status == "Enable" || status == "Disable"){
                
            await this.stpStatus.nth(0).click()
            await this.stpStatus.nth(0).locator(`[title="${status}"]`).click()
            console.log(`The status ${status} has been selected succesfully`)
        }
        else {

            console.log("The status received can not be processed. Choose a valid Status!")
        }
    }

    async selectStatusBPDUGuard(status: string){
        
        if (status == "Enable" || status == "Disable"){

            await this.bpduGuardStatus.click()
            await this.bpduGuardStatus.locator('[role="menu"]').locator(`[title="${status}"]`).click()
            console.log(`The status ${status} has been selected succesfully`)
        }
        else {

            console.log("The status received can not be processed. Choose a valid Status!")
        }

    }

    async selectStatusPortFast(status: string){
        
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