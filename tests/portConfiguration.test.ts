import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"

import { SwitchGroupFlow } from "../flows/switchgroupFlow";
import { PortConfigurationFlow } from "../flows/portConfigurationFlow";
import { CloudObjects } from "../management/cloudObjects";
import { DUTs, DUT1, DUT2, DUT3, DUT4 } from "../constants/duts";
import {mock1, mock2, mock3, result_update, message_update, job_message, sync_status_device} from "../constants/mocks"
import { NetworkPageSwitchGroup } from "../pages/particularSwitchGroupPage/networkPageSwitchGroup";



test.describe("Port Configuration ->", async() => {

    let switchgroupFlow : SwitchGroupFlow
    let portConfigurationFlow: PortConfigurationFlow
    let cloud : CloudObjects

    test.beforeEach(async ({page, baseURL}) => {

        cloud = new CloudObjects(page)
        switchgroupFlow = new SwitchGroupFlow(page)
        portConfigurationFlow = new PortConfigurationFlow(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.loginObj.login(data.user, data.password)
        // await cloud.login_obj.selectAccount(data.account2)
        await cloud.loginObj.selectAccount(data.account1)
        await cloud.page.waitForLoadState()
    })

    test("1.Test to verify if you can change a port type", async({page,baseURL}) => {

        await cloud.toolbarObj.clickSwitchGroupsPage()
        await page.waitForTimeout(3000)

        await cloud.switchgroupObj.clickSwitchGroup("test1234")
        await cloud.partSwitchgroupObj.clickSwitchPorts()
        // await cloud.switchportsObj.searchForPort("Gi0/3", "Andrei-2010")
        await cloud.switchportsObj.searchPort("Gi0/3")
        // console.log(await cloud.switchportsObj.getAdministrativeState("Andrei-2010"))
        // console.log(await cloud.switchportsObj.getOperationalState("Andrei-2010"))
        // console.log(await cloud.switchportsObj.getAdministrativeState("Andrei-2028"))
        // console.log(await cloud.switchportsObj.getOperationalState("Andrei-2028"))
        // await cloud.switchportsObj.clickPhysical()
        // console.log(await cloud.switchportsObj.getTypeByName("Andrei-2010"))
        // console.log(await cloud.switchportsObj.getVlansByName("Andrei-2010"))
        // console.log(await cloud.switchportsObj.getNativeVlansByName("Andrei-2010"))
        // await cloud.switchportsObj.getAdministrativeState("Gi0/3")
        // await cloud.switchportsObj.getOperationalState("Gi0/3")
        await portConfigurationFlow.searchAndClickPort("Gi0/3", "Andrei-2028")
        await cloud.portObj.clickNetwork()
        // await cloud.networkPortObj.changeTypePort("Hybrid")
        // await page.waitForTimeout(2000)
        // await portConfigurationFlow.configureVlan("100")
        // await portConfigurationFlow.configureNativeVlan("10")
        // await portConfigurationFlow.selectStatusSTP("Disable")
        // await portConfigurationFlow.selectStatusBPDUGuard("Enable")
        // await portConfigurationFlow.selectStatusPortFast("Enable")
        // await portConfigurationFlow.configureSTPPortPriority("0")
        await portConfigurationFlow.configurePVRSTPortPriority("100","32")
        // await portConfigurationFlow.configurePVRSTStatusSTPVlan("700","Disable")

        // await page.waitForTimeout(3000)

        // await portConfigurationFlow.selectStatusSTP("Enable")
        // await portConfigurationFlow.selectStatusBPDUGuard("Disable")
        // await portConfigurationFlow.selectStatusPortFast("Disable")

        await cloud.portObj.clickSaveConfig()

        await page.waitForTimeout(3000)

    })

    test.only("2.Test X", async({page,baseURL}) => {

        await cloud.toolbarObj.clickSwitchGroupsPage()
        await page.waitForTimeout(3000)

        await cloud.switchgroupObj.clickSwitchGroup("test1234")
        await cloud.partSwitchgroupObj.clickConfiguration()
        // await cloud.configSwitchgroupObj.clickManagement()
     
        // await cloud.mngmObj.unCheckHTTP()
        // await cloud.mngmObj.unCheckSSH()
        // await cloud.mngmObj.unCheckTelnet()
   
        // await page.waitForTimeout(3000)

        // await cloud.mngmObj.checkHTTP()
        // await cloud.mngmObj.checkSSH()
        // await cloud.mngmObj.checkTelnet()

        // await cloud.configSwitchgroupObj.clickNetwork()
        // await page.waitForTimeout(2000)
        // await cloud.networkObj.disableSTP()
        // await page.waitForTimeout(2000)
        // await cloud.networkObj.enableSTP()

        await cloud.configSwitchgroupObj.clickBasic()
        await cloud.basicObj.checkAutoSync()
        await page.waitForTimeout(2000)
        await cloud.basicObj.unCheckAutoSync()
        

        await page.waitForTimeout(3000)

    })
})