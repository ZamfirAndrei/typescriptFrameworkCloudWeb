import { Page, Locator } from "@playwright/test"
import { waitForDebugger } from "inspector"
import { test, expect} from "@playwright/test";

export class JobsPage {

    private readonly configurationUpdateMenu = this.page.locator('[cns-auto="Configuration Update"]')
    private readonly softwareUpdateMenu = this.page.locator('[cns-auto="Software Update"]')
    private readonly reportsMenu = this.page.locator('[cns-auto="Reports"]')
    private readonly actionsMenu = this.page.locator('[cns-auto="Actions"]')
    private readonly showMore = this.page.locator('[title="Show More"]')

    constructor(public page: Page) {

    }

    async clickConfigurationUpdate(){

        await this.configurationUpdateMenu.click()
    }

    async clickSoftwareUpdate(){

        await this.softwareUpdateMenu.click()
    }

    async clickReports(){

        await this.reportsMenu.click()
    }

    async clickActions(){

        await this.actionsMenu.click()
    }

}

export class ConfigurationUpdatePage{

    private readonly showMore = this.page.locator('[title="Show More"]')
    
    constructor(public page:Page) {

    }

    async getRowContent(index: number) : Promise <Locator> {

        const row = this.page.getByRole('row').nth(index)

        return row
    }
    
    private getRowContentBy = (index: number)  => {

        const row = this.page.locator('[role="row"]').nth(index)

        return row
    }

    private getStatusLocator = (index: number) => {

        const row = this.getRowContentBy(index)
        const statusLocator = row.locator('[class="pull-left col-xs-4 no-padder ng-binding ng-scope"]')

        return statusLocator
    }

    async getId(index: number) {

        const row = await this.getRowContent(index)
        const id = await row.locator('[data-column-id="displayId"]').textContent()

        return id?.trim()
    }

    async getTarget(index: number) {

        const row = await this.getRowContent(index)
        const target = await row.locator('[data-column-id="target"]').textContent()

        return target?.trim()
    }

    async getCreatedBy(index: number) {

        const row = await this.getRowContent(index)
        const createdBy = await row.locator('[data-column-id="Created_By"]').textContent()

        return createdBy?.trim()
    }

    async getCreatedOn(index: number) {

        const row = await this.getRowContent(index)
        const createdOn = await row.locator('[data-column-id="Created_On"]').textContent()

        return createdOn?.trim()
    }

    async getCompletedOn(index: number) {

        const row = await this.getRowContent(index)
        const completedOn = await row.locator('[data-column-id="completedOn"]').textContent()

        return completedOn?.trim()
    }

    async getStatus(index: number) {

        const row = await this.getRowContent(index)
        const stat = await row.locator('[data-column-id="state"]').textContent()
        const status = stat?.split(":")[0]

        return status?.trim()
    }

    async getDetails(index: number) {

        const row = await this.getRowContent(index)
        const details = await row.locator('[data-column-id="details"]').textContent()

        return details?.trim()
    }

    async clickShowMore(index: number) {

        const row = await this.getRowContent(index)
        await row.locator('[data-column-id="state"]').hover()
        await this.showMore.nth(index-1).click()
    }

    async getMessageUpdate(index: number) {

        const message = await this.page.locator('[data-column-id="devMsg"]').nth(index).locator('[class="ng-binding"]').textContent()

        return message?.trim()
    }

    async getDevice(index: number) {

        const device = await this.page.locator('[data-column-id="displayName"]').nth(index).textContent()

        return device?.trim()
    }

    async getResult(index: number) {

        const result = await this.page.locator('[data-column-id="devSts"]').nth(index).textContent()

        return result?.trim()
    }

    async expectJobStatusToBeCompleted (index : number) {

        await expect(this.getStatusLocator(index)).toHaveText('Completed: ', {timeout: 20000})

    }

}

// Using OOP inheritence to get the methods from ConfigurationUpdatePage Class

export class JobsSoftwareUpdatePage extends ConfigurationUpdatePage{

    constructor(public page:Page) {
        
        super(page) // Calling the constructor of the Parent Class
    }

    async getDetails(index: number) {

        const row = await this.getRowContent(index)
        const details = await row.locator('[data-column-id="eType"]').textContent()

        return details?.trim()
    }

    async getImageType(index: number) {

        const row = await this.getRowContent(index)
        const imageType = await row.locator('[data-column-id="imageType"]').textContent()
        
        return imageType?.trim()
    }
    
    async getTarget(index:number) {

        const row = await this.getRowContent(index)
        const target = await row.locator('[data-column-id="newSV"]').textContent()

        return target?.trim()
    }

    async getLastUpdate(index: number) {

        const lastUpdate = await this.page.locator('[data-column-id="initTs"]').nth(index).textContent()

        return lastUpdate?.trim() 
    }

    async getOriginalVersion(index: number) {

        const lastUpdate = await this.page.locator('[data-column-id="actSw"]').nth(index).textContent()

        return lastUpdate?.trim() 
    }

}