import { Page, Locator } from "@playwright/test"
import { waitForDebugger } from "inspector"

export class JobsPage {

    private readonly configuration_update_menu = this.page.locator('[cns-auto="Configuration Update"]')
    private readonly software_update_menu = this.page.locator('[cns-auto="Software Update"]')
    private readonly reports_menu = this.page.locator('[cns-auto="Reports"]')
    private readonly actions_menu = this.page.locator('[cns-auto="Actions"]')
    private readonly show_more = this.page.locator('[title="Show More"]')

    constructor(public page: Page) {

    }

    async clickConfigurationUpdate(){

        await this.configuration_update_menu.click()
    }

    async clickSoftwareUpdate(){

        await this.software_update_menu.click()
    }

    async clickReports(){

        await this.reports_menu.click()
    }

    async clickActions(){

        await this.actions_menu.click()
    }

}

export class ConfigurationUpdatePage{

    private readonly show_more = this.page.locator('[title="Show More"]')

    constructor(public page:Page) {

    }

    async getRowContent(index:number) {

        const row = await this.page.getByRole('row').nth(index)

        return row
    }

    async getId(index:number) {

        const row = await this.getRowContent(index)
        const id = await row.locator('[data-column-id="displayId"]').textContent()
        console.log(id?.trim())

        return id?.trim()
    }

    async getTarget(index:number) {

        const row = await this.getRowContent(index)
        const target = await row.locator('[data-column-id="target"]').textContent()
        console.log(target?.trim())

        return target?.trim()
    }

    async getCreatedBy(index:number) {

        const row = await this.getRowContent(index)
        const created_by = await row.locator('[data-column-id="Created_By"]').textContent()
        console.log(created_by?.trim())

        return created_by?.trim()
    }

    async getCreatedOn(index:number) {

        const row = await this.getRowContent(index)
        const created_on = await row.locator('[data-column-id="Created_On"]').textContent()
        console.log(created_on?.trim())

        return created_on?.trim()
    }

    async getCompletedOn(index:number) {

        const row = await this.getRowContent(index)
        const completed_on = await row.locator('[data-column-id="completedOn"]').textContent()
        console.log(completed_on?.trim())

        return completed_on?.trim()
    }

    async getStatus(index:number) {

        const row = await this.getRowContent(index)
        const id = await row.locator('[data-column-id="state"]').textContent()
        console.log(id?.trim())

        return id?.trim()
    }

    async getDetails(index:number) {

        const row = await this.getRowContent(index)
        const details = await row.locator('[data-column-id="details"]').textContent()
        console.log(details?.trim())

        return details?.trim()
    }

    async clickShowMore(index:number) {

        const row = await this.getRowContent(index)
        await row.locator('[data-column-id="state"]').hover()
        await this.show_more.nth(index-1).click()
    }

    async getMessageUpdate() {

        const message = await this.page.locator('[data-column-id="devMsg"]').locator('[class="ng-binding"]').textContent()
        console.log(message?.trim())

        return message?.trim()
    }

    async getDevice() {

        const device = await this.page.locator('[data-column-id="displayName"]').nth(1).textContent()
        console.log(device?.trim())

        return device?.trim()
    }
}

// Using OOP inheritence to get the methods from ConfigurationUpdatePage Class

export class JobsSoftwareUpdatePage extends ConfigurationUpdatePage{

    constructor(public page:Page) {
        
        super(page) // Calling the constructor of the Parent Class
    }

    async getDetails(index:number) {

        const row = await this.getRowContent(index)
        const details = await row.locator('[data-column-id="eType"]').textContent()
        console.log(details?.trim())

        return details?.trim()
    }

    async getImageType(index:number) {

        const row = await this.getRowContent(index)
        const imageType = await row.locator('[data-column-id="imageType"]').textContent()
        console.log(imageType?.trim())

        return imageType?.trim()
    }
    
    async getTarget(index:number) {

        const row = await this.getRowContent(index)
        const target = await row.locator('[data-column-id="newSV"]').textContent()
        console.log(target?.trim())

        return target?.trim()
    }

    async getLastUpdate() {

        const last_update = await this.page.locator('[data-column-id="initTs"]').nth(1).textContent()
        console.log(last_update?.trim())

        return last_update?.trim() 
    }

    async getOriginalVersion() {

        const last_update = await this.page.locator('[data-column-id="actSw"]').nth(1).textContent()
        console.log(last_update?.trim())

        return last_update?.trim() 
    }

}