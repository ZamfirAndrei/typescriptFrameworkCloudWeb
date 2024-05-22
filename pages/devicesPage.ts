import { Page,Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";


// This is the devices page of cnMaestro

export default class devicePage {

    private readonly deviceTable: Locator = this.page.locator('[class="row wrapper-sm ng-scope"]');
    private readonly devices: Locator = this.page.locator('[id="content-wrapper"]');
    private readonly APs: Locator = this.page.locator('[cns-auto="APs"]');
    private readonly Switches: Locator = this.page.locator('[cns-auto="Switches"]');
    private readonly NSEs: Locator = this.page.locator('[cns-auto="NSEs"]');
    private readonly checkBoxDevice : Locator = this.page.locator('[type="checkbox"]')
    private readonly deleteButton : Locator = this.page.locator('[title="Bulk Delete"]')
    private readonly messageDelete1 = this.page.locator('[class="toaster"]').locator('[class="mr-auto"]')
    private readonly messageDelete2 = this.page.locator('[class="toaster"]').locator('[id="cns-toaster-msg"]')
    private readonly searchMenu : Locator = this.page.locator('[type="search"]')

    constructor (public page:Page){

    }

    async clickAPs() {
        
        await this.APs.click()
    }

    async clickSwitches() {

        await this.Switches.click()
    }

    async clickNSEs() {

        await this.NSEs.click()
    }


    async searchToolbar(deviceName:string) {

        await this.searchMenu.nth(1).fill(deviceName)
        // await this.page.waitForTimeout(1000)
        await this.searchMenu.nth(1).press("Enter")
        await this.page.waitForTimeout(2000)
        
    }

    async clickDevice(deviceName: string){

        await this.searchMenu.nth(1).fill(deviceName)
        await this.searchMenu.nth(1).press("Enter")
        await this.page.waitForLoadState()
        await this.page.waitForTimeout(2000)
        await this.page.locator('[class="cn-link ng-binding"]', {hasText: `${deviceName}`}).click()
    }

    async numberOfDevicesFound() {

        // Getting the number of devices found in the Search Tool Bar
        
        await this.page.waitForTimeout(1500)
        const text = await this.page.locator('[class="dataTables_info"]').textContent()
        const listOfText = text?.split(":")
        const nrOfDevicesFound = listOfText[1]?.trim()

        return nrOfDevicesFound
    }

    async deleteDevice(deviceName:string) {
        
        await this.searchToolbar(deviceName)
        await this.page.waitForTimeout(2000)
        await this.checkBoxDevice.nth(1).check()

        if (await this.deleteButton.isDisabled()) {

            console.log("The button is disabled")
        }

        else {

            await this.deleteButton.click()
            await this.page.locator(`[ng-click="confirm('OK')"]`).click()
            
        }
    }   

    async getRowContent(index: number): Promise <Locator> {

        const row = this.deviceTable.getByRole('row').nth(index)

        return row
    }

    async getRowContentByName(switchName: string) {

        const row = this.page.locator("[role='row']", {hasText: `${switchName}`})

        return row
    }  

    async getDeviceName(index: number): Promise <string> {

        const row = await this.getRowContent(index)
        const deviceNameText = await row.locator('[data-column-id="deviceName"]').textContent()
        

        return (deviceNameText as string).trim()
    }

    async getDeviceNameByName(switchName: string): Promise <string> {

        const row = await this.getRowContentByName(switchName)
        const deviceNameText = await row.locator('[data-column-id="deviceName"]').textContent()
        

        return (deviceNameText as string).trim()
    }


    async getDeviceMac(index: number): Promise <string> {

        const row = await this.getRowContent(index)
        const deviceMACText = await row.locator('[data-column-id="mac"]').textContent()
        
        return (deviceMACText as string).trim()
    }

    async getDeviceSwitchGroup(index: number): Promise <string> {

        const row = await this.getRowContent(index)
        const deviceSwitchGroupText = await row.locator('[data-column-id="swGroup"]').textContent()

        return (deviceSwitchGroupText as string).trim()
    }

    async getDeviceStatus(index: number): Promise <string> {

        const row = await this.getRowContent(index)
        const deviceStatusText = await row.locator('[data-column-id="healthStr"]').textContent()
        
        return (deviceStatusText as string).trim()
    }

    async getDeviceImgVersion(index: number): Promise <string> {

        const row = await this.getRowContent(index)
        const deviceImgVersionText = await row.locator('[data-column-id="actSw"]').textContent()

        return (deviceImgVersionText as string).trim()
    }

    async getDeleteMessage() {
        
        const message1 = await this.page.locator('[class="toaster"]').locator('[class="mr-auto"]').textContent()
        const message2 = await this.page.locator('[class="toaster"]').locator('[id="cns-toaster-msg"]').textContent()

        return [message1?.trim(), message2?.trim()]
    }

    async getDeviceNameLocator(switchName: string) : Promise <Locator> {

        const row = await this.getRowContentByName(switchName)
        const deviceName = row.locator('[data-column-id="deviceName"]')

        return deviceName
    }

    async expectDeleteMessage1ToBe(deleteMessage: string) {

        await expect(this.messageDelete1).toHaveText(deleteMessage,
            {timeout: 30000})
    }

    async expectDeleteMessage2ToBe(deleteMessage: string) {

        await expect(this.messageDelete2).toHaveText(deleteMessage,
            {timeout: 30000})
    }

    async expectDeviceToBeAvailable(switchName: string) {

        await expect(await this.getDeviceNameLocator(switchName)).toHaveText(switchName,
            {timeout: 30000})
    }
}   
