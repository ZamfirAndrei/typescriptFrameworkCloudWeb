import { Page, Locator } from "@playwright/test"
import loginPage from "../loginPage/loginPage"
import { test, expect} from "@playwright/test";

export class SoftwareUpdatePage {

    private readonly imgDropbox : Locator = this.page.locator('[class="col-md-7 no-padder ng-isolate-scope"]')
    private readonly addSoftwarejob : Locator = this.page.locator('[class="ng-binding ng-scope"]', {hasText : "Add Software Job"})
    private readonly viewJobs : Locator = this.page.locator('[class="cn-link"]', {hasText: "View Update Jobs"})
    private readonly jobOption : Locator = this.page.locator('[class="cnico cnico-action-add-remove-rect-outline"]')
    private readonly disableAutoReboot : Locator = this.page.locator('[translate="software.labels.DisableAutoReboot"]')

    constructor(public page:Page){

    }

    async selectImgForUpdate(imgVersion : string): Promise<void> {

        await this.imgDropbox.click()
        await this.page.locator(`[title="${imgVersion}"]`).nth(1).click({timeout: 3000})
        
    }

    async expandJobOptions(): Promise<void> {

        // console.log(await this.jobOption.isDisabled());
        
        if (await this.jobOption.isDisabled() == true){

            await this.jobOption.click()
        }

        else {

            console.log("The job option is expanded already")
        }
    }

    async checkDisableAutoReboot(): Promise<void> {

        // console.log(await this.disableAutoReboot.isChecked())
        await this.disableAutoReboot.check()
    }

    async addSoftwareJob(): Promise<void> {

        this.addSoftwarejob.click()
    }

    async clickViewUpdateJobs(): Promise<void> {

        await this.viewJobs.click()
    }

}
