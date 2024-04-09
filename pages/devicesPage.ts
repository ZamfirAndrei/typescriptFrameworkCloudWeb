import { Page,Locator } from "@playwright/test"

// This is the devices page of cnMaestro

export default class devicePage {

    private readonly deviceTable: Locator = this.page.locator('[class="row wrapper-sm ng-scope"]');
    private readonly devices: Locator = this.page.locator('[id="content-wrapper"]');
    private readonly APs: Locator = this.page.locator('[cns-auto="APs"]');
    private readonly Switches: Locator = this.page.locator('[cns-auto="Switches"]');
    private readonly NSEs: Locator = this.page.locator('[cns-auto="NSEs"]');
    private readonly check_box_device : Locator = this.page.locator('[type="checkbox"]')
    private readonly delete_button : Locator = this.page.locator('[title="Bulk Delete"]')

    constructor (public page:Page){

    }

    async clickAPs() {
        
        // Clicking on the APs Tab
        await this.APs.click()
    }

    async clickSwitches() {

        // Clicking on the Switches Tab
        await this.Switches.click()
    }

    async clickNSEs() {

        // Clicking on the NSEs Tab
        await this.NSEs.click()
    }


    async searchToolbar(device_name:string) {
        
        // Searching for a particular device name

        await this.page.locator('[type="search"]').nth(1).fill(device_name)
        // await this.page.waitForTimeout(1000)
        await this.page.locator('[type="search"]').nth(1).press("Enter")
        await this.page.waitForTimeout(2000)
        
    }

    async clickDevice(device_name:string){

        await this.page.locator('[type="search"]').nth(1).fill(device_name)
        await this.page.locator('[type="search"]').nth(1).press("Enter")
        await this.page.waitForTimeout(2000)
        await this.page.locator('[class="cn-link ng-binding"]').click()
    }

    async numberOfDevicesFound() {

        // Getting the number of devices found in the Search Tool Bar
        
        await this.page.waitForTimeout(1500)
        const text = await this.page.locator('[class="dataTables_info"]').textContent()
        // console.log(text)
        const list_of_text = text?.split(":")
        // console.log(list_of_text)
        const nr_of_devices_found = list_of_text[1].trim()
        console.log(nr_of_devices_found)

        return nr_of_devices_found
    }

    async deleteDevice(device_name:string) {

        // Deleting the device from the Cloud
        
        await this.searchToolbar(device_name)
        await this.page.waitForTimeout(2000)
        await this.check_box_device.nth(1).check()

        if (await this.delete_button.isDisabled()) {

            console.log("The button is disabled")
        }

        else {

            await this.delete_button.click()
            await this.page.locator(`[ng-click="confirm('OK')"]`).click()
            
        }
    }   

    async getRowContent(index: number): Promise <Locator> {

        // returning the locator of the row of the table

        const row = this.deviceTable.getByRole('row').nth(index)
        // console.log(await row.textContent())

        return row
    }

    async getRowContentByName(switch_name: string) {

        const row = this.page.locator("[role='row']", {hasText: `${switch_name}`})

        return row
    }  

    async getDeviceName(index: number): Promise <string> {

        // Getting the Device Name 

        const row = await this.getRowContent(index)
        const deviceNameText = await row.locator('[data-column-id="deviceName"]').textContent()
        console.log(deviceNameText.trim());
        

        return (deviceNameText as string).trim()
    }

    async getDeviceNameByName(switch_name: string): Promise <string> {

        // Getting the Device Name 

        const row = await this.getRowContentByName(switch_name)
        const deviceNameText = await row.locator('[data-column-id="deviceName"]').textContent()
        // console.log(deviceNameText.trim());
        

        return (deviceNameText as string).trim()
    }


    async getDeviceMac(index: number): Promise <string> {

        // Getting the Device MAC

        const row = await this.getRowContent(index)
        const deviceMACText = await row.locator('[data-column-id="mac"]').textContent()
        console.log(deviceMACText.trim());
        

        return (deviceMACText as string).trim()
    }

    async getDeviceSwitchGroup(index: number): Promise <string> {

        // Getting the Switch Group

        const row = await this.getRowContent(index)
        const deviceSwitchGroupText = await row.locator('[data-column-id="swGroup"]').textContent()
        console.log(deviceSwitchGroupText.trim());
        

        return (deviceSwitchGroupText as string).trim()
    }

    async getDeviceStatus(index: number): Promise <string> {

        // Getting the Device Status

        const row = await this.getRowContent(index)
        const deviceStatusText = await row.locator('[data-column-id="healthStr"]').textContent()
        console.log(deviceStatusText.trim());
        

        return (deviceStatusText as string).trim()
    }

    async getDeviceImgVersion(index: number): Promise <string> {

        // Getting the Device img version

        const row = await this.getRowContent(index)
        const deviceImgVersionText = await row.locator('[data-column-id="actSw"]').textContent()
        console.log(deviceImgVersionText?.trim());
        

        return (deviceImgVersionText as string).trim()
    }

    async getDeleteMessage() {
        
        const message_1 = await this.page.locator('[class="toaster"]').locator('[class="mr-auto"]').textContent()
        const message_2 = await this.page.locator('[class="toaster"]').locator('[id="cns-toaster-msg"]').textContent()
        
        // console.log(message_1)
        // console.log(message_2)

        return [message_1?.trim(), message_2?.trim()]
    }
}   
