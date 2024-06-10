import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";


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