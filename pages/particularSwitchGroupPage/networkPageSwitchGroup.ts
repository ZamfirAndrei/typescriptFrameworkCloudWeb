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

    private getRowContentBridgePriority = (vlanId: string) => {return this.brgPriorityTable.locator("[role='row']", {hasText: `${vlanId}`}).first()
        // return this.brgPriorityTable.getByRole('row').getByText(`${vlanId}`, {exact: true})
    }
    private getInstancePVRSTLocator = (vlanID: string) => {return this.getRowContentBridgePriority(vlanID).locator('[type="checkbox"]')}

    constructor(public page:Page){

        super(page)
    }

    async selectInstancePVRST(vlanId: string): Promise<void> {

        await this.getInstancePVRSTLocator(vlanId).click({timeout: 2000})

    }

    async clickBulkEdit(): Promise<void> {

        await this.bulkEditButton.click()
    }

    async selectPriorityPVRST(priority: string): Promise<void> {

        await this.priorityInstanceMenu.click()
        await this.page.locator(`[title="${priority}"]`).click()
    }

    async clickUpdate(): Promise<void> {

        await this.updateButton.click()
    }


}