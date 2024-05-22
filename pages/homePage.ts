import { Locator, Page } from "@playwright/test"

// This is the home page of cnMaestro

export default class homePage {

    private readonly devicePanel: Locator = this.page.locator('[id="devicesCount"]').nth(1)
    private readonly alarmPanel: Locator = this.page.locator('[id="alarmGraph"]').nth(1)
    private readonly systemDetailsPanel: Locator = this.page.locator('[id="systemDetails"]')

    constructor (public page:Page){

    }
    
    async getNumberOfDevices() {

        var nrOfDevices = await this.devicePanel.locator('[class="text-center text-ellipsis"]').nth(0).textContent()
        var tete = await this.devicePanel.locator('[class="text-center text-ellipsis"]').nth(0).getAttribute("title")
        // same thing as above
        // var tete2 = await devicesPanel.locator('[class="text-center text-ellipsis"]').nth(0) 
        
        return nrOfDevices
    }

    async getNumberOfDevicesOffline() {

        const nrOfDevicesOffline = await this.devicePanel.locator('[class="text-center text-ellipsis"]').nth(1).textContent()

        return nrOfDevicesOffline
    } 

    async getNumberOfDevicesOnboarding() {

        const nrOfDevicesOnboarding = await this.devicePanel.locator('[class="text-center bg-soft-blue"]').textContent()

        return nrOfDevicesOnboarding
    } 

    async getMajorAlarms() {

        const nrOfMajorAlarmsText = await this.alarmPanel.locator('[cns-auto="majorAlarmsCount"]').textContent()
        const nrOfMajorAlarms = nrOfMajorAlarmsText?.split("Major")[0]

        return nrOfMajorAlarms
    }

    async getMinorAlarms() {

        const nrOfMinorAlarmsText = await this.alarmPanel.locator('[cns-auto="minorAlarmsCount"]').textContent()
        const nrOfMinorAlarms = nrOfMinorAlarmsText?.split("Minor")[0]

        return nrOfMinorAlarms
    }

    async getCriticalAlarms() {

        const nrOfCriticalAlarmsText = await this.alarmPanel.locator('[cns-auto="criticalAlarmsCount"]').textContent()
        const nrOfCriticalAlarms = nrOfCriticalAlarmsText?.split("Critical")[0]

        return nrOfCriticalAlarms
    }


    async getSwitchGroupsNumber() {

        const nrOfSwitchGroups = await this.systemDetailsPanel.locator('[class="widget-text-ellipsis"]').nth(4).textContent()

        return nrOfSwitchGroups
    }
    
}