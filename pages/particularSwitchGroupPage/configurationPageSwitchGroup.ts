import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";
import { AddSwitchgroupPage } from "../addSwitchGroupPage/addswitchgroupPage";

export class ConfigurationPageSwitchGroup extends AddSwitchgroupPage {

    constructor(public page:Page){

        super(page)
    }
} 