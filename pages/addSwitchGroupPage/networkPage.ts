import { Page, Locator, expect } from "@playwright/test"


export class NetworkPage {

    private readonly addvlan : Locator = this.page.locator('[class="btn btn-plain"]').nth(1)
    private readonly stpDropdown : Locator = this.page.locator('[id="stpMode"]')
    private readonly rstpPriorityMenu : Locator = this.page.locator('[id="stpPriority"]')
    private readonly rstpPriorityDropDown : Locator = this.page.locator('[class="dropdown-menu h-down"]').nth(2)

    constructor(public page:Page){

    }

    async addVlan(vlanId: string, vlanName: string|null = null) {

        await this.addvlan.click()
        await this.page.locator('[name="vlanId"]').fill(vlanId)

        if (vlanName != null)
            await this.page.locator('[name="vlanName"]').fill(vlanName)

        await this.page.locator('[class="btn btn-primary w-xs ng-binding"]').click()
        console.log(`The VLAN id ${vlanId} and name ${vlanName} have been configured`)

    }

    async changeSpanningTree(mode: string) {

        await this.stpDropdown.nth(1).click({timeout:3000})
        await this.page.click(`[title="${mode}"]`)
        console.log(`The mode ${mode} of STP has been choosen`)
    }

    async enableSTP(answer: string) {

        const checkbox = this.page.locator('[class="form-group checkbox m-b-none"]').locator('[class="i-checks i-checks-sm"]').locator('[translate="common.Enable"]')
        if (answer == "Yes"){
            await checkbox.check()
            console.log("The STP has been enabled")
        }
        else if (answer == "No"){
            await checkbox.uncheck()
            console.log("The STP has been disabled")
        }
    }

    async choosePathCost(pathCostMethod: string){

        const pathcost = this.page.locator('[class="col-md-12 no-padder radio"]')
        await pathcost.locator(`[translate="switchGroup.labels.${pathCostMethod}"]`).click({timeout:3000})
        console.log(`The pathcost has been choosen to be: ${pathCostMethod}`)
    }

    async configureStpPriorityRSTP(priority: string){

        await this.rstpPriorityMenu.click({timeout:3000})
        await this.rstpPriorityDropDown.locator(`[title="${priority}"]`).last().click({timeout:3000})
        console.log(`The STP priority has been configured to : ${priority}`);
        
    }
}