import { Locator, Page } from "@playwright/test";
import { CloudObjects } from "../management/cloudObjects";
import { expect } from "@playwright/test";
import { job_message } from "../constants/mocks";
import { TIMEOUT } from "dns";


export class switchGroupFlow {

    private readonly cloud : CloudObjects

    apply_configuration_button : Locator = this.page.locator('[class="ng-binding"]', {hasText: "Apply Configuration"})

    constructor(public page: Page){

        this.cloud = new CloudObjects(this.page)
    }

    async searchAndSelectSwitch(switch_name: string) {

        // Searching and selecting the device which you want to upgrade

        await this.cloud.toolbar_obj.clickDevicePage()
        await this.cloud.device_obj.clickSwitches()
 
        await this.page.waitForTimeout(2000)
        await this.cloud.device_obj.clickDevice(switch_name)
        await this.page.waitForTimeout(2000)

    }

    async createSwitchGroup(switch_group_name: string, admin_password: string, guest_password: string) {

        // Going to the Switch Group Page

        await this.cloud.toolbar_obj.clickSwitchGroupsPage()

        // Creating a Switch Group

        await this.cloud.switchgroup_obj.clickAddSwitchGroup()
        await this.cloud.basic_obj.addNameSwitchGroup(switch_group_name)
        await this.cloud.addswitchgroup_obj.clickManagement()
        await this.cloud.mngm_obj.createPasswordAdmin(admin_password)
        await this.cloud.mngm_obj.createPasswordGuest(guest_password)
        await this.cloud.addswitchgroup_obj.clickSave()
    }

    async confirmSwithGroupCreation(message: string) {

        // Checking the message is correct

        const save_message = await this.cloud.addswitchgroup_obj.getMessageAfterSave()
        console.log(save_message)

        expect(save_message).toBe(message)

        if (message == "The specified profile name already exists.") {

            // Leaving the configuraion page without saving

            await this.cloud.toolbar_obj.clickSwitchGroupsPage()
            await this.cloud.page.locator('[class="btn btn-primary w-xs"]', {hasText: "Yes"}).click()
        }
    }
    
    async checkTheSwitchGroupHasBeenCreated(search_switch_group_name: string) {

        // Checking if the Switch Group was created

        await this.cloud.toolbar_obj.clickSwitchGroupsPage()

        const switch_group = await this.cloud.addswitchgroup_obj.searchForSwithGroupOnTheMainPage(search_switch_group_name)
        // console.log(switch_group)

        expect(switch_group).toBe(search_switch_group_name)
        console.log(`The Switch Group ${switch_group} has been created`)
      
        await this.cloud.page.waitForTimeout(2000)
    }

    async checkIfTheSwitchGroupExists(search_switch_group_name: string) {

        // Check if a Switch Group exists

        await this.cloud.toolbar_obj.clickSwitchGroupsPage()

        const switch_group = await this.cloud.switchgroup_obj.searchingForSwitchGroup(search_switch_group_name)
        // console.log(switch_group)

        expect(switch_group).toBe(search_switch_group_name)

    }

    async checkDeleteSwitchGroup(switch_group: string, message: string) {

        // Delete a Switch Group

        const delete_message = await this.cloud.switchgroup_obj.deleteSwitchGroupByName(switch_group)
        console.log(delete_message)

        expect(delete_message).toBe(message)
        
    }

    async selectConfigurationPageOfTheSwitch(switch_name: string) {

        // Selecting the Switch and going to the configuration page of the Switch

        await this.searchAndSelectSwitch(switch_name)
        await this.cloud.part_device.clickConfiguration()
        await this.cloud.page.waitForTimeout(3000)

    }

    async gettingDetailsOfTheSwitch() {

        // Getting the Sync Status of the device and the Value of Switch Group BEFORE syncing

        const sync_status_device = await this.cloud.conf_obj.getSyncStatusDevice()
        const value_switch_group = await this.cloud.conf_obj.getValueSwitchGroup()

        return [sync_status_device, value_switch_group]

    }

    async selectSwitchGroupToSync(switch_group_name: string) {

        // Selecting the Switch Group to sync

        await this.cloud.conf_obj.selectSwitchGroup(switch_group_name)
        await this.cloud.page.waitForTimeout(2000)
        await this.cloud.conf_obj.clickApplyConfiguration()
        await this.cloud.page.waitForTimeout(2000)

    }

    async checkIfTheSwitchGroupIsNotAlreadyConfigured(switch_group_name: string) {

        const value_switch_group = await this.cloud.conf_obj.getValueSwitchGroup()
        console.log(`The value is: ${value_switch_group}`)

        if (value_switch_group != switch_group_name) {

            console.log("The Switch Group is not configured!")
            this.selectSwitchGroupToSync(switch_group_name)
        }

        else {

            console.log("The Switch Group was configured before...We will apply the configuration!")
            await this.cloud.page.waitForTimeout(2000)
            await this.cloud.conf_obj.clickApplyConfiguration()
        }
    }

    async confirmDetailsSwitch(sync_status_message: string) {

        // Getting the Details of the Switch 

        var [sync_status_device, value_switch_group] = await this.gettingDetailsOfTheSwitch()
        console.log("The sync status of the device is : " + sync_status_device)
        console.log("The value of the switch group of the device is : " + value_switch_group)

        // expect(sync_status_device).toBe(sync_status_message)
        
    }

    async goToSwitchGroupConfigurationPageOfASwitch(switch_group_name: string) {

        await this.selectConfigurationPageOfTheSwitch(switch_group_name)
        await this.cloud.conf_obj.clickEdit()
        await this.cloud.page.waitForLoadState()
    }

    async verifyIfSwitchGroupSaveButtonIsEnabled() {

        // Verify if the Save Button of the Switch Group is enabled or not

        const check = await this.cloud.addswitchgroup_obj.checkIfSaveButtonIsEnabled()
        console.log(check)
        await this.cloud.page.waitForTimeout(2000)

        if (check == true) {

            await this.cloud.part_switchgroup_obj.clickSwitches()
        }
        
        else {

            await this.cloud.addswitchgroup_obj.clickSave()
            await this.cloud.page.waitForTimeout(2000)
            await this.cloud.part_switchgroup_obj.clickSwitches()
        }
        
        await this.cloud.page.waitForLoadState()
    }

    async changeSTPofTheSwitchGroup(stp_mode: string) {

        await this.cloud.addswitchgroup_obj.clickNetwork()
        await this.cloud.addswitchgroup_obj.checkShowAdvancedButton()
        await this.cloud.page.waitForTimeout(2000)
        await this.cloud.network_obj.changeSpanningTree(stp_mode)
        // await cloud.page.waitForTimeout(3000)

        this.verifyIfSwitchGroupSaveButtonIsEnabled()
    }

    async goToConfigurationPageOfASwitchFromSwitchGroup(switch_name: string) {

        await this.cloud.switches_obj.clickSwitch(switch_name)
        await this.cloud.page.waitForLoadState()
        await this.cloud.page.waitForTimeout(2000)
        await this.cloud.part_device.clickConfiguration()
    }

    async applySwitchConfiguration() {

        await this.cloud.conf_obj.clickApplyConfiguration()
        await this.cloud.page.waitForTimeout(2000)
    }

    async goToConfigurationPageOfASwitchFromSwitchGroupAndApplyConfiguration(switch_name: string) {

        await this.goToConfigurationPageOfASwitchFromSwitchGroup(switch_name)
        await this.applySwitchConfiguration()
    }

    async confirmSwitchGroupSyncing(switch_name: string, switch_group_name: string, job_message: string, sync_status_message: string){

        await this.selectConfigurationPageOfTheSwitch(switch_name)
        // await this.cloud.page.waitForTimeout(2000)
        await expect(this.apply_configuration_button).toBeVisible({timeout:3000})
        await this.checkIfTheSwitchGroupIsNotAlreadyConfigured(switch_group_name)

        // await this.cloud.page.waitForTimeout(2000)
        await expect(this.apply_configuration_button).toBeVisible({timeout:3000})

        // Getting the sync message of the Switch Group Configuration

        console.log("####### Getting the sync message of the Switch Group Configuration #######")

        const message = await this.cloud.conf_obj.getMessageApplyConfiguration()
        console.log(message)
        expect(message).toBe(job_message)

        // Getting the Details of the Switch AFTER applying the configuration and syncing

        console.log("####### Getting the Details of the Switch AFTER applying the configuration and syncing #######")

        // await this.confirmDetailsSwitch(sync_status_message)
        await this.cloud.conf_obj.expectSyncStatusDeviceToBe(sync_status_message)
    }

    async confirmApplyConfigurationSyncing(job_message: string, sync_status_message:string ) {

        await this.cloud.page.waitForTimeout(2000)
        await this.applySwitchConfiguration()

        console.log("####### Getting the sync message of the Switch Group Configuration #######")

        const message = await this.cloud.conf_obj.getMessageApplyConfiguration()
        console.log(message)
        expect(message).toBe(job_message)

        console.log("####### Getting the Details of the Switch AFTER applying the configuration and syncing #######")

        
        await this.cloud.conf_obj.expectSyncStatusDeviceToBe(sync_status_message)
    }









    
}