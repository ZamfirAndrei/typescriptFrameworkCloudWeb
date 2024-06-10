import { Page, Locator } from "@playwright/test"
import { waitForDebugger } from "inspector"
import { test, expect} from "@playwright/test";

export class JobsPage {

    private readonly configurationUpdateMenu = this.page.locator('[cns-auto="Configuration Update"]')
    private readonly softwareUpdateMenu = this.page.locator('[cns-auto="Software Update"]')
    private readonly reportsMenu = this.page.locator('[cns-auto="Reports"]')
    private readonly actionsMenu = this.page.locator('[cns-auto="Actions"]')

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

export class ConfigurationUpdatePage extends JobsPage{

    private readonly showMore = this.page.locator('[title="Show More"]')

    public getRowContentLocator = (index: number) => this.page.getByRole('row').nth(index)
    public getStatuSLocator = (index: number) => this.getRowContentLocator(index).locator('[class="pull-left col-xs-4 no-padder ng-binding ng-scope"]')
    public getIdLocator = (index: number) => this.getRowContentLocator(index).locator('[data-column-id="displayId"]')
    public getTargetConfUpdateLocator = (index: number) => this.getRowContentLocator(index).locator('[data-column-id="target"]')
    public getCreatedByLocator = (index: number) => this.getRowContentLocator(index).locator('[data-column-id="Created_By"]')
    public getCreatedOnLocator = (index: number) => this.getRowContentLocator(index).locator('[data-column-id="Created_On"]')
    public getCompletedOnLocator = (index: number) => this.getRowContentLocator(index).locator('[data-column-id="completedOn"]')
    public getDetailsConfUpdateLocator = (index: number) => this.getRowContentLocator(index).locator('[data-column-id="details"]')
    public getDetailsSoftUpdateLocator = (index: number) => this.getRowContentLocator(index).locator('[data-column-id="eType"]')
    public getShowMoreLocator = (index: number) => this.getRowContentLocator(index).locator('[class=" dt-actions"]').locator('[title="Show More"]')
    public getStateLocator = (index: number) => this.getRowContentLocator(index).locator('[data-column-id="state"]')
    public getTargetSoftUpdateLocator = (index: number) => this.getRowContentLocator(index).locator('[data-column-id="newSV"]')
    public getImageTypeLocator = (index: number) => this.getRowContentLocator(index).locator('[data-column-id="imageType"]')


    public getRowJobsDetailsLocator = (switchName: string) => this.page.getByRole('row', {name: `${switchName}`})
    public getMessageUpdateLocator = (switchName: string) => this.getRowJobsDetailsLocator(switchName).locator('[data-column-id="devMsg"]')
    public getStatusJobDetailsLocator = (switchName: string) => this.getRowJobsDetailsLocator(switchName).locator('[data-column-id="devSts"]')
    public getDeviceNameJobDetailsLocator = (switchName: string) => this.getRowJobsDetailsLocator(switchName).locator('[data-column-id="displayName"]')
    public getResultLocator = (switchName: string) => this.getRowJobsDetailsLocator(switchName).locator('[data-column-id="devSts"]')
    public getOriginalVersionLocator = (switchName: string) => this.getRowJobsDetailsLocator(switchName).locator('[data-column-id="actSw"]')
    public getLastUpdatedLocator = (switchName: string) => this.getRowJobsDetailsLocator(switchName).locator('[data-column-id="initTs"]')
    
    constructor(public page:Page) {

        super(page)
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

        return await this.getTargetConfUpdateLocator(index).textContent()
    }

    async getCreatedBy(index: number) {

        return await this.getCreatedByLocator(index).textContent()
    }

    async getCreatedOn(index: number) {

        return await this.getCreatedOnLocator(index).textContent()
    }

    async getCompletedOn(index: number) {

        return await this.getCompletedOnLocator(index).textContent()
    }

    async getStatus(index: number) {

        return await this.getStatuSLocator(index).textContent()

    }

    async getDetails(index: number) {

        return await this.getDetailsConfUpdateLocator(index).textContent()
    }

    async clickShowMore(index: number) : Promise <void>{

        const row = await this.getRowContent(index)
        await row.locator('[data-column-id="state"]').hover()
        await this.showMore.nth(index-1).click()
    }

    async getMessageUpdate(switchName: string) {

        return await this.getMessageUpdateLocator(switchName).textContent()
    }

    async getDevice(index: number) {

        const device = await this.page.locator('[data-column-id="displayName"]').nth(index).textContent()

        return device?.trim()
    }

    async getResult(switchName: string) {

        return await this.getResultLocator(switchName).textContent()
    }

    async clickShowMoree(index: number) : Promise <void>{

        await this.getStateLocator(index).hover()
        await this.getShowMoreLocator(index).click()
    }

    async getDeviceName(switchName: string) {

        return this.getDeviceNameJobDetailsLocator(switchName).textContent()
        
    }

    async expectJobStatusToBeCompleted (index : number) : Promise <void> {

        await expect(this.getStatusLocator(index)).toHaveText('Completed: ', {timeout: 300000})
    }

    async expectTargetToBe(index: number, target: string) : Promise <void> {

        await expect(this.getTargetConfUpdateLocator(index)).toHaveText(`${target}`, {timeout: 20000})
    }

}

// Using OOP inheritence to get the methods from ConfigurationUpdatePage Class

export class JobsSoftwareUpdatePage extends ConfigurationUpdatePage{

    constructor(public page:Page) {
        
        super(page) // Calling the constructor of the Parent Class
        
    }

    override async getDetails(index: number) {

        return await this.getDetailsSoftUpdateLocator(index).textContent()
    }

    async getImageType(index: number) {

        return await this.getImageTypeLocator(index).textContent()
    }
    
    override async getTarget(index: number) {

        return await this.getTargetSoftUpdateLocator(index).textContent()
    }
    

    async getLastUpdate(switchName: string) {

        return await this.getLastUpdatedLocator(switchName).textContent()
    }

    async getOriginalVersion(switchName: string) {

        return await this.getOriginalVersionLocator(switchName).textContent()
    }

    override async expectTargetToBe(index: number, targetExpected: string) : Promise <void> {

        await expect(this.getTargetSoftUpdateLocator(index)).toHaveText(`${targetExpected}`, {timeout: 20000})
    }

    async expectDeviceToBe(switchName: string, switchNameExpected: string) : Promise <void> {

        await expect(this.getDeviceNameJobDetailsLocator(switchName)).toHaveText(`${switchNameExpected}`, {timeout: 20000})
    }

    async expectMessageUpdateToBe(switchName: string, updateMessageExpected: string) : Promise <void> {

        await expect(this.getMessageUpdateLocator(switchName)).toHaveText(`${updateMessageExpected}`, {timeout: 20000})
    }

    async expectResultToBe(switchName: string, resultExpected: string) : Promise <void> {

        await expect(this.getResultLocator(switchName)).toHaveText(`${resultExpected}`, {timeout: 20000})
    }

}