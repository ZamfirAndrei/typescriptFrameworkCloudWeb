import { Locator, Page } from "@playwright/test";
import { CloudObjects } from "../management/cloudObjects";
import SwitchgroupPage from "../pages/switchGroupPage/switchGroupPage";
import { expect } from "@playwright/test";
import { jobMessage } from "../constants/mocks";
import { TIMEOUT } from "dns";


export class SwitchGroupFlow {

    private readonly cloud : CloudObjects

    private readonly applyConfigurationButton : Locator = this.page.locator('[class="ng-binding"]', {hasText: "Apply Configuration"})
    

    constructor(public page: Page){

        this.cloud = new CloudObjects(page)
    }

    async searchingSwitchGroup(switchGroupName: string) {

        await this.cloud.switchgroupObj.searchSwitchGroup(switchGroupName)
        await this.page.waitForTimeout(2000)

        if(await this.page.locator('[class="cn-link ng-binding"]', {hasText: `${switchGroupName}`}).isVisible()) {

            console.log(`The Switch Group ${switchGroupName} exists`)
            const switchGroup = await this.page.locator('[class="cn-link ng-binding"]', {hasText: `${switchGroupName}`}).textContent()
            return switchGroup?.trim()
        }

        else {
            
            console.log(`The Switch Group ${switchGroupName} does not exist`)
            return undefined
        }
        
    }

    async searchAndSelectSwitch(switchName: string) : Promise <void> {

        // Searching and selecting the device which you want to upgrade

        await this.cloud.toolbarObj.clickDevicePage()
        await this.cloud.deviceObj.clickSwitches()
 
        // await this.page.waitForTimeout(2000)
        await this.cloud.deviceObj.clickDevice(switchName)
        // await this.page.waitForTimeout(2000)

    }

    async createSwitchGroup(switchGroupName: string, admin_password: string, guest_password: string) : Promise <void> {

        // Going to the Switch Group Page

        await this.cloud.toolbarObj.clickSwitchGroupsPage()

        // Creating a Switch Group

        await this.cloud.switchgroupObj.clickAddSwitchGroup()
        await this.cloud.basicObj.addNameSwitchGroup(switchGroupName)
        await this.cloud.addSwitchgroupObj.clickManagement()
        await this.cloud.mngmObj.createPasswordAdmin(admin_password)
        await this.cloud.mngmObj.createPasswordGuest(guest_password)
        await this.cloud.addSwitchgroupObj.clickSave()
    }

    async confirmSwithGroupCreation(message: string) : Promise <void> {

        // Checking the message is correct

        const saveMessage = await this.cloud.addSwitchgroupObj.getMessageAfterSave()
        console.log(saveMessage)

        expect(saveMessage).toBe(message)

        if (message == "The specified profile name already exists.") {

            // Leaving the configuration page without saving

            await this.cloud.toolbarObj.clickSwitchGroupsPage()
            await this.cloud.page.locator('[class="btn btn-primary w-xs"]', {hasText: "Yes"}).click()
        }
    }
    
    async checkIfTheSwitchGroupHasBeenCreatedOnTheMainPage(searchSwitchGroupName: string) : Promise <void> {

        await this.cloud.toolbarObj.clickSwitchGroupsPage()
        await this.cloud.addSwitchgroupObj.expectSwitchGroupToBeCreated(searchSwitchGroupName)
        console.log(`The Switch Group ${searchSwitchGroupName} has been created`)
    }

    async checkIfTheSwitchGroupHasBeenCreated(searchSwitchGroupName: string) : Promise <void> {

        await this.cloud.toolbarObj.clickSwitchGroupsPage()
        // await this.page.waitForTimeout(1000)
        await this.cloud.switchgroupObj.searchSwitchGroup(searchSwitchGroupName)
        await this.cloud.addSwitchgroupObj.expectSwitchGroupToBeCreated(searchSwitchGroupName)
        console.log(`The Switch Group ${searchSwitchGroupName} has been created`)
    }

    async checkIfTheSwitchGroupExists(searchSwitchGroupName: string) : Promise <void> {

        await this.cloud.toolbarObj.clickSwitchGroupsPage()

        await this.page.waitForLoadState()
        const switchGroup = await this.cloud.switchgroupObj.searchingForSwitchGroup(searchSwitchGroupName)
        // console.log(switchGroup)

        expect(switchGroup).toBe(searchSwitchGroupName)

    }

    async checkDeleteSwitchGroup(switchGroup: string, message: string) : Promise <void> {

        const deleteMessage = await this.cloud.switchgroupObj.deleteSwitchGroupByName(switchGroup)
        console.log(deleteMessage)

        expect(deleteMessage).toBe(message)
        
    }

    async selectConfigurationPageOfTheSwitch(switchName: string) : Promise <void> {

        await this.searchAndSelectSwitch(switchName)
        await this.cloud.partDeviceObj.clickConfiguration()
        // await this.cloud.page.waitForTimeout(3000)

    }

    async gettingDetailsOfTheSwitch() {

        const syncStatusDevice = await this.cloud.confObj.getSyncStatusDevice()
        const valueSwitchGroup = await this.cloud.confObj.getValueSwitchGroup()

        return [syncStatusDevice, valueSwitchGroup]

    }

    async selectSwitchGroupToSync(switchGroupName: string) : Promise <void> {

        await this.cloud.confObj.selectSwitchGroup(switchGroupName)
        // await this.cloud.page.waitForTimeout(2000)
        await this.cloud.confObj.clickApplyConfiguration()

    }

    async checkIfTheSwitchGroupIsNotAlreadyConfigured(switchGroupName: string) : Promise <void> {

        const valueSwitchGroup = await this.cloud.confObj.getValueSwitchGroup()
        console.log(`The value is: ${valueSwitchGroup}###`)

        if (valueSwitchGroup != switchGroupName.trim()) {

            console.log("The Switch Group is not configured!")
            await this.selectSwitchGroupToSync(switchGroupName)
        }

        else if (valueSwitchGroup == "None") {

            console.log("The Switch Group is None. Pass to next step!")
        }

        else {

            console.log("The Switch Group was configured before...We will apply the configuration!")
            await this.cloud.page.waitForTimeout(2000)
            await this.cloud.confObj.clickApplyConfiguration()
        }
    }

    async confirmDetailsSwitch(syncStatusMessage: string) : Promise <void> {

        var [syncStatusDevice, valueSwitchGroup] = await this.gettingDetailsOfTheSwitch()
        console.log("The sync status of the device is : " + syncStatusDevice)
        console.log("The value of the switch group of the device is : " + valueSwitchGroup)

        expect(syncStatusDevice).toBe(syncStatusMessage)
        
    }

    async navigateToSwitchGroupConfigurationPageOfASwitch(switchName : string) : Promise <void> {

        await this.selectConfigurationPageOfTheSwitch(switchName)
        await this.cloud.confObj.clickEdit()
        await this.cloud.page.waitForLoadState()
    }

    async verifyIfSwitchGroupSaveButtonIsEnabled() : Promise <void> {

        const check = await this.cloud.addSwitchgroupObj.checkIfSaveButtonIsEnabled()
        // console.log(check)
        await this.cloud.page.waitForTimeout(2000)

        if (check == true) {

            await this.cloud.partSwitchgroupObj.clickSwitches()
        }
        
        else {

            await this.cloud.addSwitchgroupObj.clickSave()
            await this.cloud.page.waitForTimeout(2000)
            await this.cloud.partSwitchgroupObj.clickSwitches()
        }
        
        await this.cloud.page.waitForLoadState()
    }

    async changeSTPofTheSwitchGroup(stpMode: string) : Promise <void> {

        await this.cloud.configSwitchgroupObj.clickNetwork()
        await this.cloud.configSwitchgroupObj.checkShowAdvancedButton()
        // await this.cloud.page.waitForTimeout(2000)
        await this.cloud.networkSwitchgroupObj.changeSpanningTree(stpMode)

        // await this.verifyIfSwitchGroupSaveButtonIsEnabled()
    }

    async changeInstancePriorityPVRST(instance: string, priority: string) : Promise <void> {

        await this.cloud.networkSwitchgroupObj.selectInstancePVRST(instance)
        await this.cloud.networkSwitchgroupObj.clickBulkEdit()
        await this.cloud.networkSwitchgroupObj.selectPriorityPVRST(priority)
        await this.cloud.networkSwitchgroupObj.clickUpdate()

    }

    async changeInstancePriorityMSTP(regionName: string, instanceID: number, vlans: string, priority: string) : Promise <void> {

        await this.cloud.networkSwitchgroupObj.configureMSTPRegion(regionName)
        await this.cloud.networkSwitchgroupObj.clickEditMSTPInstance(instanceID)
        await this.cloud.networkSwitchgroupObj.selectVlansForInstanceMSTP(vlans)
        await this.cloud.networkSwitchgroupObj.selectPriorityMSTP(priority)
        await this.cloud.networkSwitchgroupObj.clickUpdate()

    }

    async changePriorityRSTP(priority: string) : Promise <void> {

        await this.cloud.networkSwitchgroupObj.configureStpPriorityRSTP(priority)
    }

    async navigateToConfigurationPageOfASwitchFromSwitchGroup(switchName: string) : Promise <void> {

        await this.verifyIfSwitchGroupSaveButtonIsEnabled()
        await this.cloud.switchesObj.clickSwitch(switchName)
        await this.cloud.page.waitForLoadState()
        // await this.cloud.page.waitForTimeout(2000)
        await this.cloud.partDeviceObj.expectDeviceNameToBe(switchName)
        await this.cloud.partDeviceObj.clickConfiguration()
    }

    async applySwitchConfiguration() : Promise <void> {

        await this.cloud.confObj.clickApplyConfiguration()
        // await this.cloud.page.waitForTimeout(2000)
    }

    async navigateToConfigurationPageOfASwitchFromSwitchGroupAndApplyConfiguration(switchName: string) : Promise <void> {

        await this.navigateToConfigurationPageOfASwitchFromSwitchGroup(switchName)
        await this.applySwitchConfiguration()
    }

    async confirmSwitchGroupSyncing(switchName: string, switchGroupName: string, syncStatusMessage: string) : Promise <void> {

        await this.selectConfigurationPageOfTheSwitch(switchName)
        await this.cloud.page.waitForLoadState()
        await expect(this.applyConfigurationButton).toBeVisible({timeout:30000})
        await this.checkIfTheSwitchGroupIsNotAlreadyConfigured(switchGroupName)
        await expect(this.applyConfigurationButton).toBeVisible({timeout:30000})
        await this.cloud.confObj.expectSyncStatusDeviceToBe(syncStatusMessage)
    }

    async confirmApplyConfigurationSyncing(jobMessages: string, syncStatusMessage: string) : Promise <void> {

        // await this.cloud.page.waitForTimeout(2000)
        await this.applySwitchConfiguration()
        expect(await this.cloud.confObj.getMessageApplyConfiguration()).toBe(jobMessages)
        await this.cloud.confObj.expectSyncStatusDeviceToBe(syncStatusMessage)
    }









    
}