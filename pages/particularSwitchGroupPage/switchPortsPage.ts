import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";


export class SwitchPortsPage {

    private readonly configurationMenu : Locator = this.page.locator('[cns-auto="Configuration"]').nth(1)
    private readonly statisticsMenu : Locator = this.page.locator('[cns-auto="Statistics"]').nth(1)
    private readonly generalButton : Locator = this.page.locator('[title="General"]')
    private readonly physicalButton : Locator = this.page.locator('[title="Physical"]')
    private readonly networkButton : Locator = this.page.locator('[title="Network"]')
    private readonly securityButton : Locator = this.page.locator('[title="Security"]')
    public searchPlaceholder : Locator = this.page.locator('[placeholder="Search"]')

    private getRowContent = (port: string) => this.page.getByRole('row', {name: `${port}`})
    private getAdministrativeStateLocator = (port: string) => this.getRowContent(port).locator('[data-column-id="adminState"]')
    private getOperationalStateLocator = (port: string) => this.getRowContent(port).locator('[data-column-id="operState"]')
    private portLocatorBySwitchName = (switchName: string) => this.page.locator('[role="row"]', {hasText: `${switchName}`})
    private getAdministrativeStateLocatorByName = (switchName: string) => this.portLocatorBySwitchName(switchName).locator('[data-column-id="adminState"]')
    private getOperationalStateLocatorByName = (switchName: string) => this.portLocatorBySwitchName(switchName).locator('[data-column-id="operState"]')
    private getTypeLocatorByName = (switchName: string) => this.portLocatorBySwitchName(switchName).locator('[data-column-id="type"]')
    private getVlansLocatorByName = (switchName: string) => this.portLocatorBySwitchName(switchName).locator('[data-column-id="vlans"]')
    private getNativeVlansLocatorByName = (switchName: string) => this.portLocatorBySwitchName(switchName).locator('[data-column-id="nativeVlan"]')


    constructor(public page:Page) {

    }

    async clickStatistics() {

        await this.statisticsMenu.click()
    }

    async clickConfiguration() {

        await this.configurationMenu.click()
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

    async searchPort(port: string) {

        await this.searchPlaceholder.nth(1).fill(port)
        await this.page.waitForTimeout(2000)
        await this.searchPlaceholder.nth(1).press("Enter", {timeout: 2000})
    }


    async getAdministrativeStateByName(switchName: string){

        return this.getAdministrativeStateLocatorByName(switchName).textContent({timeout:2000})
    }

    async getAdministrativeState(port: string){

        return this.getAdministrativeStateLocator(port).textContent({timeout:2000})
    }

    async getOperationalStateByName(switchName: string){

        return this.getOperationalStateLocatorByName(switchName).textContent({timeout:2000})
    }

    async getOperationalState(port: string){

        return this.getOperationalStateLocator(port).textContent({timeout:2000})
    }

    async getTypeByName(switchName: string) {
        
        return this.getTypeLocatorByName(switchName).textContent({timeout:2000})
    }

    async getVlansByName(switchName: string) {
        
        return this.getVlansLocatorByName(switchName).textContent({timeout:2000})
    }

    async getNativeVlansByName(switchName: string) {
        
        return this.getNativeVlansLocatorByName(switchName).textContent({timeout:2000})
    }

}