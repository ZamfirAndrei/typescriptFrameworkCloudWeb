import { Page, Locator } from "@playwright/test"
import { escape } from "querystring"

// This is the page of cnMaestro Switch Group Page

export default class switchgroupPage {

    private readonly searchbar: Locator = this.page.locator('[type="search"]').nth(1)
    private readonly switchgroupstable: Locator = this.page.locator('[class="table-wrapper"]')
    private readonly addswitchgroup: Locator = this.page.locator('[title="Add New Switch Group"]')
    private readonly edit_switch_group : Locator = this.page.locator('[title="Edit"]')
    private readonly delete_message: Locator = this.page.locator('[id="cns-toaster-msg"]')
    

    constructor (public page: Page) {

    }

    async searchSwitchGroup(switch_group_name: string) {

        // Searching for a Swith Group

        await this.searchbar.fill(switch_group_name)
        await this.searchbar.press("Enter")
    }

    async searchingForSwitchGroup(switch_group_name: string) {

        // Searching for a Swith Group

        await this.searchSwitchGroup(switch_group_name)
        await this.page.waitForTimeout(2000)

        if(await this.page.locator('[class="cn-link ng-binding"]', {hasText: `${switch_group_name}`}).isVisible()) {

            console.log(`The Switch Group ${switch_group_name} exists`)
            const switch_group = await this.page.locator('[class="cn-link ng-binding"]', {hasText: `${switch_group_name}`}).textContent()
            return switch_group?.trim()
        }

        else {
            
            console.log(`The Switch Group ${switch_group_name} does not exist`)
            return undefined
        }
        
    }

    async clickSwitchGroup(switch_group_name:string){

        await this.searchbar.fill(switch_group_name)
        await this.searchbar.press("Enter")
        await this.page.waitForTimeout(2000)
        const switch_group = await this.page.locator('[class="cn-link ng-binding"]').getByText(switch_group_name)
        await switch_group.click()
    }

    async getNrOfSwitchGroups(){

        // Getting the Nr. of Switch Groups

        await this.page.waitForTimeout(1500)
        const nr_of_switch_groups_text = await this.page.locator('[class="dataTables_info"]').textContent()
        // console.log(nr_of_switch_groups_text)
        const nr_of_switch_groups = nr_of_switch_groups_text?.split(":")[1].trim()
        console.log("The nr of switch groups is: " + nr_of_switch_groups);
        
        return nr_of_switch_groups

    }
    async getRowContent(index: number): Promise <Locator> {

        // Getting the locator of the row

        const row = this.switchgroupstable.getByRole('row').nth(index)
        // console.log(await row.textContent())

        return row
    }

    async getSwitchGroupName(index:number): Promise <string> {

        // Getting the Switch Group Name 

       const row =  await this.getRowContent(index)
       const name_switchgroup_text = await row.locator('[data-column-id="name"]').textContent()
    //    console.log(name_switchgroup_text);

       return (name_switchgroup_text as string).trim()
    }  

    async getSwitchGroupNrOfSwitches(index:number): Promise <string> {

        // Getting the Switch Group Nr.of Switches

       const row =  await this.getRowContent(index)
       const nr_of_switches_of_switchgroup_text = await row.locator('[data-column-id="col-1"]').textContent()
    // console.log(nr_of_switches_of_switchgroup_text)
       const nr_of_switches_of_switchgroup = nr_of_switches_of_switchgroup_text?.split("of")[1].trim()
       console.log("The nr of switches is: " +nr_of_switches_of_switchgroup)
       

       return nr_of_switches_of_switchgroup as string
        
    }

    async getSwitchGroupNrOfflineSwitches(index:number): Promise <string> {

        // Getting the Switch Group Nr.of Switches

       const row =  await this.getRowContent(index)
       const nr_of_switches_offline_switchgroup_text = await row.locator('[data-column-id="col-1"]').textContent()
    // console.log(nr_of_switches_offline_switchgroup_text)
       const nr_of_switches_offline_switchgroup = nr_of_switches_offline_switchgroup_text?.split("of")[0].trim()
       console.log("The nr of offline switches is: " + nr_of_switches_offline_switchgroup)
       

       return nr_of_switches_offline_switchgroup as string
        
    }

    async clickAddSwitchGroup(){

        // Clicking the Add button

        await this.addswitchgroup.click()
    }

    async getNrOfPorts(index:number) {

        // Getting the number of Up Ports from the total

        const row = await this.getRowContent(index)
        const nr_of_up_ports_text = await row.locator('[data-column-id="col-4"]').textContent()
        // console.log(nr_of_up_ports_text);
        const nr_of_up_ports = nr_of_up_ports_text?.split("of")[0].trim()
        const nr_of_total_ports = nr_of_up_ports_text?.split("of")[1].trim()
        console.log("Nr of Up Ports is: " + nr_of_up_ports)
        console.log("Nr of Total Ports is: " + nr_of_total_ports)

        return [nr_of_total_ports, nr_of_up_ports]
    }

    async getNrOfVLANs(index:number) {

        // Getting the number of Up Ports from the total

        const row = await this.getRowContent(index)
        const nr_of_vlans_text = await row.locator('[data-column-id="vlans"]').textContent()
        console.log(nr_of_vlans_text);
        const nr_of_vlans : string [] = (nr_of_vlans_text as string).split(",")
        console.log("Nr of VLANs is: " + nr_of_vlans)
        // console.log(nr_of_vlans[0], nr_of_vlans[1])

        return nr_of_vlans
    }

    async getAutoSync(index:number) {

        // Getting if Auto-Sync is enabled or not

        const row = await this.getRowContent(index)
        const auto_sync = await row.locator('[data-column-id="autoSync"]').textContent()
        console.log("Auto-sync is: " + auto_sync);
        
        return auto_sync
    }

    async deleteSwitchGroup(index:number) {

        // Deleting a Switch Group using the index of the row

        const row = await this.getRowContent(index)
        await row.locator('[title="Delete"]').click()

        await this.page.locator('[class="btn btn-primary w-xs"]').click()
        console.log(`The Switch Group from Row ${index} has been deleted`)

        const message = await this.delete_message.textContent()
        // console.log(message)

        return message?.trim()
    }

    async deleteSwitchGroupByName(switch_group_name: string) {

        // Deleting a Switch Group using the name of the switch group

        const switch_group = await this.searchingForSwitchGroup(switch_group_name)
        // console.log(switch_group)
        
        if (switch_group == switch_group_name && switch_group != undefined) {

            await this.page.locator('[title="Delete"]').click()

            await this.page.locator('[class="btn btn-primary w-xs"]').click()
            console.log(`The Switch Group${switch_group_name} has been deleted`)

            const message = await this.delete_message.textContent()
            // console.log(message)

            return message?.trim()
        }

        else {

            console.log(`The Switch Group${switch_group_name} does not exists`)
        }

    } 


    async editSwitchGroup(switch_group_name:string) {

        // Editing a Switch Group

        await this.searchSwitchGroup(switch_group_name)
        await this.page.waitForTimeout(2000)
        await this.edit_switch_group.click()
    }

}