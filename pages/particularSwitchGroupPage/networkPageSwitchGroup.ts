import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";
import { NetworkPage } from "../addSwitchGroupPage/networkPage";

export class NetworkPageSwitchGroup extends NetworkPage {

    private readonly brgPriorityTable : Locator = this.page.locator('[class="dataTables_wrapper form-inline no-footer"]').last()
    private readonly vlanName : Locator = this.page.locator('[data-column-id="vlanName"]')
    private readonly vlanId : Locator = this.page.locator('[data-column-id="vlanId"]')
    private readonly bulkEditButton : Locator = this.page.locator('[class="btn btn-plain m-r-xs"]', {hasText: "Bulk Edit"})
    private readonly priorityInstanceMenu : Locator = this.page.locator('[id="priority"]')
    private readonly updateButton : Locator = this.page.locator('[class="btn btn-primary w-xs ng-binding"]', {hasText: "Update"})
    private readonly instanceBrigdePriorityTable : Locator = this.page.locator('[class="col-md-6 no-padder"]').locator('[class="ng-scope"]').last()
    private readonly instanceMSTPPriorityDropDown : Locator = this.page.locator('[id="priority"]')
    private readonly vlanInstanceMstp : Locator = this.page.locator('[name="vlanId"]')
    private readonly regionNameMstp : Locator = this.page.locator('[name="regionName"]')

    private getRowContentBridgePriority = (vlanId: string) => {return this.brgPriorityTable.locator("[role='row']", {hasText: `${vlanId}`}).first()
        // return this.brgPriorityTable.getByRole('row').getByText(`${vlanId}`, {exact: true})
    }
    private getInstancePVRSTCheckBoxLocator = (vlanID: string) => {return this.getRowContentBridgePriority(vlanID).locator('[type="checkbox"]')}
    private priorityPVRSTLocator = (priority: string) => {return this.page.locator(`[title="${priority}"]`).last()}

    private getRowContentInstanceMSTPBridgePriority = (instanceID: number) => {return this.instanceBrigdePriorityTable.getByRole('row').nth(instanceID)}
    private getEditButtonMSTPinstanceLocator = (instanceID: number) => {return this.getRowContentInstanceMSTPBridgePriority(instanceID).locator('[title="Edit"]')}
    private priorityMSTPLocator = (priority: string) => {return this.page.locator(`[title="${priority}"]`).last()}

    constructor(public page:Page){

        super(page)
    }

    async selectInstancePVRST(vlanId: string): Promise<void> {

        await this.getInstancePVRSTCheckBoxLocator(vlanId).last().click({timeout: 2000})

    }

    async clickBulkEdit(): Promise<void> {

        await this.bulkEditButton.click()
    }

    async selectPriorityPVRST(priority: string): Promise<void> {

        await this.priorityInstanceMenu.click({timeout: 2000})
        await this.priorityPVRSTLocator(priority).click({timeout: 2000})
    }

    async clickUpdate(): Promise<void> {

        await this.updateButton.click({timeout: 2000})
    }

    async clickEditMSTPInstance(instanceID: number): Promise<void> {

        await this.getEditButtonMSTPinstanceLocator(instanceID).click({timeout: 2000})
    }

    async selectPriorityMSTP(priority: string): Promise<void> {

        await this.instanceMSTPPriorityDropDown.click({timeout: 2000})
        await this.priorityMSTPLocator(priority).click({timeout: 2000})
    }

    async selectVlansForInstanceMSTP(vlans: string): Promise<void> {

        await this.vlanInstanceMstp.fill(vlans)        
    }

    async configureMSTPRegion(regionName: string): Promise<void> {

        await this.regionNameMstp.fill(regionName)
    }

}