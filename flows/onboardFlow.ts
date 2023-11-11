import { CloudObjects } from "../management/cloudObjects";
import { Page } from "@playwright/test";
import { test, expect} from "@playwright/test";

export class LoginFlow {

    private readonly cloud : CloudObjects

    constructor(public page:Page) {

        this.cloud = new CloudObjects(this.page)
    }

    async expectPageTitle(expected_page_title : string) {

        const page_title = await this.cloud.page.title()
        console.log(page_title)

        expect(page_title).toBe(expected_page_title)
    }
}