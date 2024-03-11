import { Page } from "@playwright/test";
import { CloudObjects } from "../management/cloudObjects";
import { expect } from "@playwright/test";


export class switchGroupFlow {

    private readonly cloud : CloudObjects

    constructor(public page: Page){

        this.cloud = new CloudObjects(this.page)
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





    
}