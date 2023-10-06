import { Locator, Page } from "@playwright/test"

// This is the home page of cnMaestro

export default class homePage {

    private readonly devicePanel: Locator = this.page.locator('[id="devicesCount"]').nth(1)
    private readonly alarmPanel: Locator = this.page.locator('[id="alarmGraph"]').nth(1)
    private readonly systemDetailsPanel: Locator = this.page.locator('[id="systemDetails"]')

    constructor (public page:Page){

    }
    
    async getNumberOfDevices() {
        
        // Getting the number of devices from the panel of the home page

        var nr_of_devices = await this.devicePanel.locator('[class="text-center text-ellipsis"]').nth(0).textContent()
        var tete = await this.devicePanel.locator('[class="text-center text-ellipsis"]').nth(0).getAttribute("title")
        // same thing as above
        // var tete2 = await devicesPanel.locator('[class="text-center text-ellipsis"]').nth(0) 
        console.log(nr_of_devices)
        // console.log(tete)
        
        return nr_of_devices
    }

    async getNumberOfDevicesOffline() {

        // Getting the number of offline devices from the panel of the home page

        const nr_of_devices_offline = await this.devicePanel.locator('[class="text-center text-ellipsis"]').nth(1).textContent()
        console.log(nr_of_devices_offline)

        return nr_of_devices_offline
    } 

    async getNumberOfDevicesOnboarding() {

        // Getting the number of offline devices from the panel of the home page

        const nr_of_devices_onboarding = await this.devicePanel.locator('[class="text-center bg-soft-blue"]').textContent()
        console.log(nr_of_devices_onboarding)

        return nr_of_devices_onboarding
    } 

    async getMajorAlarms() {

        // Getting the number of major alarms

        const nr_of_major_alarms_text = await this.alarmPanel.locator('[cns-auto="majorAlarmsCount"]').textContent()
        // console.log(nr_of_major_alarms_text?.split("Major")[0])
        const nr_of_major_alarms = nr_of_major_alarms_text?.split("Major")[0]
        console.log(nr_of_major_alarms)

        return nr_of_major_alarms
    }

    async getMinorAlarms() {

        // Getting the number of minor alarms

        const nr_of_minor_alarms_text = await this.alarmPanel.locator('[cns-auto="minorAlarmsCount"]').textContent()
        // console.log(nr_of_minor_alarms_text?.split("Minor")[0])
        const nr_of_minor_alarms = nr_of_minor_alarms_text?.split("Minor")[0]
        console.log(nr_of_minor_alarms)

        return nr_of_minor_alarms
    }

    async getCriticalAlarms() {

        // Getting the number of critical alarms

        const nr_of_critical_alarms_text = await this.alarmPanel.locator('[cns-auto="criticalAlarmsCount"]').textContent()
        // console.log(nr_of_critical_alarms_text?.split("Critical")[0])
        const nr_of_critical_alarms = nr_of_critical_alarms_text?.split("Critical")[0]
        console.log(nr_of_critical_alarms)

        return nr_of_critical_alarms
    }


    async getSwitchGroupsNumber() {

        // Getting the number of switch groups from the account

        const nr_of_switch_groups = await this.systemDetailsPanel.locator('[class="widget-text-ellipsis"]').nth(4).textContent()
        console.log(nr_of_switch_groups)

        return nr_of_switch_groups
    }
    
}