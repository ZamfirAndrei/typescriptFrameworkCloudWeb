import { Page, Locator, expect } from "@playwright/test"
import { escape } from "querystring"

// This is the page of cnMaestro Switch Group Page

export default class SwitchgroupPage {

    private readonly searchbar: Locator = this.page.locator('[type="search"]').nth(1)
    private readonly switchGroupsTable: Locator = this.page.locator('[class="table-wrapper"]')
    private readonly addSwitchGroup: Locator = this.page.locator('[title="Add New Switch Group"]')
    private readonly editswitchGroupButton : Locator = this.page.locator('[title="Edit"]')
    private readonly deleteMessage: Locator = this.page.locator('[id="cns-toaster-msg"]')
    private readonly deleteButton : Locator = this.page.locator('[title="Delete"]')
    private readonly yesDelete : Locator = this.page.locator('[class="btn btn-primary w-xs"]')
    private readonly nrOfSwitchGroups : Locator = this.page.locator('[class="dataTables_info"]')

    private getRowContentByName = (switchGroupName: string) => this.page.getByRole('row', {name: `${switchGroupName}`})
    private getSwitchGroupEditLocator = () => this.page.getByTitle('Edit', { exact: true })
    private getEditSwitchGroup = (switchGroupName: string) => this.getRowContentByName(switchGroupName).locator('[data-column-id="actions"]').locator('[title="Edit"]')
    private getActivePoEPorts = (switchGroupName: string) => this.getRowContentByName(switchGroupName).locator('[data-column-id="poePortCount"]')
    private getSwitchGroupToClickLocator = (switchGroupName: string) => this.getRowContentByName(switchGroupName).locator('[class="cn-link ng-binding"]')
    private getSwitchGroupNameLocator = (switchGroupName: string) => {return this.page.locator('[class="cn-link ng-binding"]').getByText(`${switchGroupName}`, {exact:true})}
    
    constructor (public page: Page) {

    }

    async searchSwitchGroup(switchGroupName: string) : Promise <void> {

        await this.searchbar.fill(switchGroupName)
        await this.page.waitForLoadState()
        await this.searchbar.press("Enter")
    }

    async searchingForSwitchGroup(switchGroupName: string) {

        await this.searchSwitchGroup(switchGroupName)
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

    async expectSwitchGroupToBeCreated(switchGroupName: string) : Promise <void> {

        await this.searchSwitchGroup(switchGroupName)
        await expect(this.getSwitchGroupNameLocator(switchGroupName)).toHaveText(switchGroupName, {timeout: 20000})
    }

    async clickSwitchGroup(switchGroupName: string) : Promise <void> {

        await this.searchbar.fill(switchGroupName)
        await this.searchbar.press("Enter")
        await this.page.waitForTimeout(2000)
        await this.getSwitchGroupToClickLocator(switchGroupName).click()
    }

    async getNrOfSwitchGroups(){

        await this.page.waitForTimeout(1500)
        const nrOfSwitchGroupsText = await this.nrOfSwitchGroups.textContent()
        const nrOfSwitchGroups = nrOfSwitchGroupsText?.split(":")[1].trim()
        console.log("The nr of switch groups is: " + nrOfSwitchGroups);
        
        return nrOfSwitchGroups

    }
    async getRowContent(index: number): Promise <Locator> {

        const row = this.switchGroupsTable.getByRole('row').nth(index)

        return row
    }

    async getSwitchGroupName(index: number): Promise <string> {

       const row =  await this.getRowContent(index)
       const nameSwitchgroupText = await row.locator('[data-column-id="name"]').textContent()

       return (nameSwitchgroupText as string).trim()
    }  

    async getSwitchGroupNrOfSwitches(index: number): Promise <string> {

       const row =  await this.getRowContent(index)
       const nrOfSwitchesOfSwitchgroupText = await row.locator('[data-column-id="col-1"]').textContent()
       const nrOfSwitchesOfSwitchgroup = nrOfSwitchesOfSwitchgroupText?.split("of")[1].trim()
       
       
       return nrOfSwitchesOfSwitchgroup as string
        
    }

    async getSwitchGroupNrOfflineSwitches(index: number): Promise <string> {

       const row =  await this.getRowContent(index)
       const nrOfSwitchesOfflineSwitchgroupText = await row.locator('[data-column-id="col-1"]').textContent()
       const nrOfSwitchesOfflineSwitchgroup = nrOfSwitchesOfflineSwitchgroupText?.split("of")[0].trim()
       
       return nrOfSwitchesOfflineSwitchgroup as string
        
    }

    async clickAddSwitchGroup(){

        await this.addSwitchGroup.click()
    }

    async getNrOfPorts(index: number) {

        const row = await this.getRowContent(index)
        const nrOfUpPortsText = await row.locator('[data-column-id="col-4"]').textContent()
        const nrOfUpPorts = nrOfUpPortsText?.split("of")[0].trim()
        const nrOfTotalPorts = nrOfUpPortsText?.split("of")[1].trim()
        console.log("Nr of Up Ports is: " + nrOfUpPorts)
        console.log("Nr of Total Ports is: " + nrOfTotalPorts)

        return [nrOfTotalPorts, nrOfUpPorts]
    }

    async getNrOfVLANs(index: number) {

        const row = await this.getRowContent(index)
        const nrOfVlansText = await row.locator('[data-column-id="vlans"]').textContent()
        const nrOfVlans : string [] = (nrOfVlansText as string).split(",")
        console.log("Nr of VLANs is: " + nrOfVlans)

        return nrOfVlans
    }

    async getAutoSync(index: number) {

        const row = await this.getRowContent(index)
        const autoSync = await row.locator('[data-column-id="autoSync"]').textContent()
        console.log("Auto-sync is: " + autoSync);
        
        return autoSync
    }

    async getRowContentByNameFunc(switchName: string) {

        const row = this.page.locator("[role='row']", {hasText: `${switchName}`})

        return row
    }  

    async getNrOfPoEPorts(switchGroupName: string) {

        return await this.getActivePoEPorts(switchGroupName).textContent()
    }

    async deleteSwitchGroup(index: number) {

        const row = await this.getRowContent(index)
        await row.locator('[title="Delete"]').click()
        await this.yesDelete.click()
        console.log(`The Switch Group from Row ${index} has been deleted`)

        const message = await this.deleteMessage.textContent()

        return message?.trim()
    }

    async deleteSwitchGroupByName(switchGroupName: string) {

        const switchGroup = await this.searchingForSwitchGroup(switchGroupName)
        
        if (switchGroup == switchGroupName && switchGroup != undefined) {

            await this.deleteButton.click()
            await this.yesDelete.click()
            console.log(`The Switch Group ${switchGroupName} has been deleted`)

            const message = await this.deleteMessage.textContent()

            return message?.trim()
        }

        else {

            console.log(`The Switch Group${switchGroupName} does not exists`)
        }

    } 

    async editSwitchGroup(switchGroupName: string) : Promise <void> {

        await this.searchSwitchGroup(switchGroupName)
        await this.page.waitForLoadState()
        await this.page.waitForTimeout(2000)
        await this.editswitchGroupButton.click()
    }

    async editSwitchGroupByName(switchGroupName: string) : Promise <void> {

        await this.getEditSwitchGroup(switchGroupName).click()
    }

}