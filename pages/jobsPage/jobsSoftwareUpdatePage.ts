import { Page, Locator } from "@playwright/test"
import { waitForDebugger } from "inspector"
import { test, expect} from "@playwright/test";
import { JobsPage } from "./jobsPage";
import { ConfigurationUpdatePage } from "./configurationUpdatePage";

export class JobsSoftwareUpdatePage extends ConfigurationUpdatePage{

    constructor(public page:Page) {
        
        super(page)
        
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