import { Page, Locator } from "@playwright/test"
import { test, expect} from "@playwright/test";

export class StatisticsPage {

    constructor(public page: Page) {

    }

    async getRow(index: number) {

        const row = this.page.getByRole('row').nth(index)

        return row
    }

    async getPortId(index: number) {

        const row = await this.getRow(index)
        const portId = await row.locator('[data-column-id="port"]').textContent()
 
        return portId
    }

    async getPortDescription(index: number) {

        const row = await this.getRow(index)
        const description = await row.locator('[data-column-id="description"]').textContent()
        
        return description
    }

    async getTotalRxPackets(index: number) {

        const row = await this.getRow(index)
        const totalRxPackets = await row.locator('[data-column-id="RxTotalPkts"]').textContent()

        return totalRxPackets
    }

    async getTotalTxPackets(index: number) {

        const row = await this.getRow(index)
        const totalTxPackets = await row.locator('[data-column-id="TxTotalPkts"]').textContent()

        return totalTxPackets
    }

    async getPortLinkTransitions(index: number) {

        const row = await this.getRow(index)
        const nrOfLinkTransitions = await row.locator('[data-column-id="ifCnPortLinkTransitions"]').textContent()
        
        return nrOfLinkTransitions
    }
    
    async getSwitchNameOfPort(index: number) {

        const row = await this.getRow(index)
        const switchNameOfPort = await row.locator('[data-column-id="switch"]').textContent()
        
        return switchNameOfPort
    }
    
}