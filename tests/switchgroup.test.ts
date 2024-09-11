import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"

import { SwitchGroupFlow } from "../flows/switchgroupFlow";
import { CloudObjects } from "../management/cloudObjects";
import { DUTs, DUT1, DUT2, DUT3, DUT4 } from "../constants/duts";
import {mock1, mock2, mock3, resultUpdate, messageUpdate, jobMessage, syncStatusDevice} from "../constants/mocks"
import { NetworkPageSwitchGroup } from "../pages/particularSwitchGroupPage/networkPageSwitchGroup";
import { StpMode, Device } from "../enums/cnMaestro.enum";



test.describe("SwitchGroup ->", async() => {

    let switchgroupFlow : SwitchGroupFlow
    let cloud : CloudObjects

    test.beforeEach(async ({page, baseURL}) => {

        cloud = new CloudObjects(page)
        switchgroupFlow = new SwitchGroupFlow(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.loginObj.login(data.user, data.password)
        // await cloud.loginObj.selectAccount(data.account2)
        await cloud.loginObj.selectAccount(data.account1)
        await cloud.page.waitForLoadState()
    })

    test("1.Test to verify if you can create a Switch Group", async({page,baseURL}) => {

        await switchgroupFlow.createSwitchGroup(mock3[0].switchGroupName, mock1[0].adminPassword, mock1[0].guestPassword)
        await switchgroupFlow.confirmSwithGroupCreation(mock1[0].checkMessage)
        await switchgroupFlow.checkIfTheSwitchGroupHasBeenCreated(mock3[0].switchGroupName)

    })

    test("2.Test to verify that you can not create a Switch Group if is already created", async({page,baseURL}) => {

        await switchgroupFlow.createSwitchGroup(mock2[0].switchGroupName, mock2[0].adminPassword, mock2[0].guestPassword)
        await switchgroupFlow.confirmSwithGroupCreation(mock2[0].checkMessage)
        await switchgroupFlow.checkIfTheSwitchGroupHasBeenCreated(mock2[0].switchGroupName)
    })

    test("3.Test to verify you can delete a switch group", async({page, baseURL}) => {

        await switchgroupFlow.checkIfTheSwitchGroupExists(mock3[0].switchGroupName)
        await switchgroupFlow.checkDeleteSwitchGroup(mock3[0].switchGroupName, mock3[0].checkMessage)

    })

    test("4.Test to verify you can add a DUT to a switch group", async({page, baseURL}) => {

        await switchgroupFlow.confirmSwitchGroupSyncing(DUT3[0].name, mock1[0].switchGroupName, syncStatusDevice[0].InSync)

    })

    test("5.Test to verify you can remove a DUT from a switch group", async({page, baseURL}) => {

        await switchgroupFlow.confirmSwitchGroupSyncing(DUT3[0].name, Device.switchGroupNone, syncStatusDevice[0].NA)

    })
    // Added again the test to run test 7
    test("6.Test to verify you can add a DUT to a switch group", async({page, baseURL}) => {

        await switchgroupFlow.confirmSwitchGroupSyncing(DUT3[0].name, mock1[0].switchGroupName, syncStatusDevice[0].InSync)

    })

    test("7.Test to verify you can modify the STP mode of a Switch Group", async({page, baseURL}) => {

        await switchgroupFlow.navigateToSwitchGroupConfigurationPageOfASwitch(DUT3[0].name)
        await switchgroupFlow.changeSTPofTheSwitchGroup(StpMode.pvrst)
        await switchgroupFlow.navigateToConfigurationPageOfASwitchFromSwitchGroup(DUT3[0].name)
        await switchgroupFlow.confirmApplyConfigurationSyncing(jobMessage[0].JobStartedSuccessfully, 
            syncStatusDevice[0].InSync)

    })

    test.only("8.Test to verify you can modify the Priority in RSTP", async({page, baseURL}) => {

        await switchgroupFlow.navigateToSwitchGroupConfigurationPageOfASwitch(DUT3[0].name)
        await switchgroupFlow.changeSTPofTheSwitchGroup(StpMode.rstp)
        await switchgroupFlow.changePriorityRSTP(StpMode.rstp)
        await switchgroupFlow.navigateToConfigurationPageOfASwitchFromSwitchGroup(DUT3[0].name)
        await switchgroupFlow.confirmApplyConfigurationSyncing(jobMessage[0].JobStartedSuccessfully, 
            syncStatusDevice[0].InSync)

    })

    test("9.Test to verify you can modify the Priority of a Instance in PVRST", async({page, baseURL}) => {

        await switchgroupFlow.navigateToSwitchGroupConfigurationPageOfASwitch(DUT3[0].name)
        await switchgroupFlow.changeSTPofTheSwitchGroup(StpMode.pvrst)
        await switchgroupFlow.changeInstancePriorityPVRST(StpMode.vlan, StpMode.pvrstPriority)
        await switchgroupFlow.navigateToConfigurationPageOfASwitchFromSwitchGroup(DUT3[0].name)
        await switchgroupFlow.confirmApplyConfigurationSyncing(jobMessage[0].JobStartedSuccessfully, 
            syncStatusDevice[0].InSync)

    })

    test("10.Test to verify you can modify the Priority in MSTP", async({page, baseURL}) => {

        await switchgroupFlow.navigateToSwitchGroupConfigurationPageOfASwitch(DUT3[0].name)
        await switchgroupFlow.changeSTPofTheSwitchGroup(StpMode.mstp)
        await switchgroupFlow.changeInstancePriorityMSTP(StpMode.regionNameMstp, 1, StpMode.mstpVlans, StpMode.mstpPriority)
        await switchgroupFlow.navigateToConfigurationPageOfASwitchFromSwitchGroup(DUT3[0].name)
        await switchgroupFlow.confirmApplyConfigurationSyncing(jobMessage[0].JobStartedSuccessfully, 
            syncStatusDevice[0].InSync)
        
    })

    test("X.Testing", async({page, baseURL}) => {

        const cloud = new CloudObjects(page)
        const switchgroupFlow = new SwitchGroupFlow(page)

        // await switchgroupFlow.checkIfTheSwitchGroupHasBeenCreated(mock2[0].switchGroupName)
        // await switchgroupFlow.checkIfTheSwitchGroupExists(mock2[0].switchGroupName)
        // await cloud.toolbarObj.clickSwitchGroupsPage()
        // await page.waitForTimeout(3000)
        // // await cloud.switchgroupObj.editSwitchGroupByName(mock2[0].switchGroupName)
        // await cloud.switchgroupObj.getNrOfPoEPorts(mock2[0].switchGroupName)
        // await cloud.switchgroupObj.editSwitchGroupByName(mock2[0].switchGroupName)
        // // await cloud.switchgroupObj.edit(mock2[0].switchGroupName)
        // await page.waitForTimeout(3000)

        // await cloud.toolbarObj.clickDevicePage()
        // await cloud.deviceObj.clickSwitches()
        // await page.waitForTimeout(3000)
        // await cloud.deviceObj.getDeviceMacByName(mock2[0].switchGroupName)
        // await page.waitForTimeout(3000)

        // await switchgroupFlow.goToSwitchGroupConfigurationPageOfASwitch(DUT3[0].name)
        // await switchgroupFlow.changeSTPofTheSwitchGroup("RSTP")
        // await cloud.networkObj.choosePathCost("short")
        // await page.waitForTimeout(4000)
        // await cloud.networkObj.choosePathCost("long")
        // await switchgroupFlow.changePriorityRSTP("12288")
        // await page.waitForTimeout(4000)

        // await switchgroupFlow.selectConfigurationPageOfTheSwitch("FA2")
        // await switchgroupFlow.selectSwitchGroupToSync("None ")
        // await page.waitForTimeout(3000)
        await switchgroupFlow.confirmSwitchGroupSyncing(DUT3[0].name, mock1[0].switchGroupName, syncStatusDevice[0].NA)
    })
})