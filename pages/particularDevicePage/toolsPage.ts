import { Page, Locator } from "@playwright/test"
import loginPage from "../loginPage/loginPage"
import { test, expect} from "@playwright/test";


export class ToolsPage {

    private readonly cliCommandBox : Locator = this.page.locator('[placeholder="Type CLI command"]')
    private readonly runButton : Locator = this.page.locator('[class="btn btn-primary w-xs ng-binding"]')
    private readonly output : Locator = this.page.locator('[id="resultContainer"]')
    private readonly status : Locator = this.page.locator('[cns-auto="Status"]')
    private readonly remoteCLI : Locator = this.page.locator('[cns-auto="Remote CLI"]')
    private readonly networkConnectivity : Locator = this.page.locator('[cns-auto="Network Connectivity"]')

    constructor(public page:Page){
       
    }

    async clickStatus(): Promise<void> {

        await this.status.click()
    }

    async clickRemoteCLI(): Promise<void> {

        await this.remoteCLI.click()
    }

    async clickNewtorkConnectivity(): Promise<void> {

        await this.networkConnectivity.click()
    }

    async typeCommandCLI(command : string): Promise<void> {

        await this.cliCommandBox.fill(command)
        await this.cliCommandBox.press("Enter")
        await this.runButton.click()
    }

    async getOutputFromCommand() {

        return await this.output.textContent()
    }


}