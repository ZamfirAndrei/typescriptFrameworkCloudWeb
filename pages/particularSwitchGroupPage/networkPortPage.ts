import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";

export class NetworkPortPage {

    private readonly portTypeMenu : Locator = this.page.locator('[id="accessMode"]')
    private readonly stpStatus : Locator = this.page.locator('[id="stpStatus"]')
    private readonly bpduGuardStatus : Locator = this.page.locator('[id="bpduGuard"]')
    private readonly portfast_status : Locator = this.page.locator('[id="portFast"]')
    private readonly vlanId : Locator = this.page.locator('[name="vlanId"]')
    private readonly availableVlans : Locator = this.page.locator('[class="inline m-t-xs m-l-xs"]')
    private readonly nativeVlan : Locator = this.page.locator('[name="nativeVlan"]')
    private readonly taggedCheck : Locator = this.page.locator('[class="i-checks i-checks-sm"]')
    private readonly vlanPriorityMenu : Locator = this.page.locator('[class="table b m-b-none table-striped"]')
    private readonly vlanStpPriorityMenu: Locator = this.page.locator('[id="stpPriority"]')

    public checkVlanIdButton = () => {return this.vlanId.isVisible()}
    public checkNativeVlanButton = () => {return this.nativeVlan.isDisabled()}
    private getPVRSTVlanRowContent = (vlanId: string) => this.page.locator('[class="table b m-b-none table-striped"]').locator('[class="ng-scope"]', {hasText: `${vlanId}`}).first()
    

        
    constructor(public page:Page) {

    }

    async changeTypePort(type: string) : Promise<void> {

        await this.portTypeMenu.click()
        await this.page.locator(`[title="${type}"]`).last().click()
    }

    async checkAvailableVlans() {

        const availableVlansText = await this.availableVlans.textContent()
        const vlanList = availableVlansText?.split(" - ")[1].trim()

        return vlanList?.split(",")
    }

    async insertVlan(vlan: string) : Promise<void> {

        await this.vlanId.fill(vlan)
    }

    async insertNativeVlan(vlanNative: string) : Promise<void> {

        await this.nativeVlan.fill(vlanNative)
    }

    async checkTagged(): Promise<void> {

        await this.taggedCheck.check()
    }

    async selectStatusSTP(status: string) : Promise<void> {

        await this.stpStatus.first().click({timeout: 2000})
        await this.stpStatus.nth(0).locator(`[title="${status}"]`).click()
    }

    async selectStatusBPDUGuard(status: string) : Promise<void> {

        await this.bpduGuardStatus.click({timeout: 2000})
        await this.bpduGuardStatus.locator('[role="menu"]').locator(`[title="${status}"]`).click()
    }

    async selectStatusPortFast(status: string) : Promise<void> {
        
        await this.portfast_status.click({timeout: 2000})
        await this.portfast_status.locator('[role="menu"]').locator(`[title="${status}"]`).click()   
    }

    async configureSTPPortPriority(priority: string) : Promise<void>  {

        await this.vlanStpPriorityMenu.first().click()
        await this.vlanStpPriorityMenu.last().locator('[role="menu"]').locator(`[title="${priority}"]`).click()
    }

    async configurePVRSTPortPriority(vlanId: string, priority: string) : Promise<void> {


        await this.getPVRSTVlanRowContent(vlanId).locator(`[id="stpPriority"]`).click()
        await this.getPVRSTVlanRowContent(vlanId).locator(`[id="stpPriority"]`).locator(`[title="${priority}"]`).click()
    }

    async configurePVRSTStatusSTPVlan(vlanId: string, status: string) : Promise<void> {

        await this.getPVRSTVlanRowContent(vlanId).locator(`[id="stpStatus"]`).click()
        await this.getPVRSTVlanRowContent(vlanId).locator(`[id="stpStatus"]`).locator(`[title="${status}"]`).click()  
    }
}