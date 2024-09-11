import { Page, Locator, expect } from "@playwright/test"


export class NetworkPage {

    private readonly addvlan : Locator = this.page.locator('[class="btn btn-plain"]').nth(1)
    private readonly stpDropdown : Locator = this.page.locator('[id="stpMode"]')
    private readonly rstpPriorityMenu : Locator = this.page.locator('[id="stpPriority"]')
    private readonly rstpPriorityDropDown : Locator = this.page.locator('[class="dropdown-menu h-down"]').nth(2)
    private readonly stpCheckBox : Locator = this.page.locator('[class="form-group checkbox m-b-none"]').locator('[class="i-checks i-checks-sm"]').locator('[translate="common.Enable"]')
    private readonly pathcost : Locator = this.page.locator('[class="col-md-12 no-padder radio"]')

    private rstpPriorityLocator = (priority: string) => {return this.rstpPriorityDropDown.locator(`[title="${priority}"]`).last()}
    private rstpPathCostLocator = (pathCostMethod: string) => {return this.pathcost.locator(`[translate="switchGroup.labels.${pathCostMethod}"]`)}

    constructor(public page:Page){

    }

    async addVlan(vlanId: string, vlanName: string|null = null): Promise <void> {

        await this.addvlan.click()
        await this.page.locator('[name="vlanId"]').fill(vlanId)

        if (vlanName != null)
            await this.page.locator('[name="vlanName"]').fill(vlanName)

        await this.page.locator('[class="btn btn-primary w-xs ng-binding"]').click()
    }

    async changeSpanningTree(mode: string): Promise <void> {

        await this.stpDropdown.nth(1).click({timeout:30000})
        await this.page.click(`[title="${mode}"]`,{timeout:30000})
    }

    async enableSTP() : Promise <void> {

        await this.stpCheckBox.check()
    }

    async disableSTP() : Promise <void> {

        await this.stpCheckBox.uncheck()
    }

    async choosePathCost(pathCostMethod: string): Promise <void> {

        await this.rstpPathCostLocator(pathCostMethod).click({timeout:3000})
    }

    async configureStpPriorityRSTP(priority: string): Promise <void> {

        await this.rstpPriorityMenu.click({timeout:3000})
        await this.rstpPriorityLocator(priority).click({timeout:3000})  
    }
}