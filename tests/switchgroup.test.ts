import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"

import { SwitchGroupFlow } from "../flows/switchgroupFlow";
import { CloudObjects } from "../management/cloudObjects";
import { DUTs, DUT1, DUT2, DUT3, DUT4 } from "../constants/duts";
import {mock1, mock2, mock3, result_update, message_update, job_message, sync_status_device} from "../constants/mocks"
import { NetworkPageSwitchGroup } from "../pages/particularSwitchGroupPage/networkPageSwitchGroup";



test.describe("SwitchGroup ->", async() => {

    let switchgroupFlow : SwitchGroupFlow
    let cloud : CloudObjects

    test.beforeEach(async ({page, baseURL}) => {

        cloud = new CloudObjects(page)
        switchgroupFlow = new SwitchGroupFlow(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.loginObj.login(data.user, data.password)
        // await cloud.login_obj.selectAccount(data.account2)
        await cloud.loginObj.selectAccount(data.account1)
        await cloud.page.waitForLoadState()
    })

    test("1.Test to verify if you can create a Switch Group", async({page,baseURL}) => {

        await switchgroupFlow.createSwitchGroup(mock3[0].switch_group_name, mock1[0].admin_password, mock1[0].guest_password)
        await switchgroupFlow.confirmSwithGroupCreation(mock1[0].check_message)
        await switchgroupFlow.checkIfTheSwitchGroupHasBeenCreated(mock3[0].switch_group_name)

    })

    test("2.Test to verify that you can not create a Switch Group if is already created", async({page,baseURL}) => {

        await switchgroupFlow.createSwitchGroup(mock2[0].switch_group_name, mock2[0].admin_password, mock2[0].guest_password)
        await switchgroupFlow.confirmSwithGroupCreation(mock2[0].check_message)
        await switchgroupFlow.checkIfTheSwitchGroupHasBeenCreated(mock2[0].switch_group_name)
    })

    test("3.Test to verify you can delete a switch group", async({page, baseURL}) => {

        await switchgroupFlow.checkIfTheSwitchGroupExists(mock3[0].switch_group_name)
        await switchgroupFlow.checkDeleteSwitchGroup(mock3[0].switch_group_name, mock3[0].check_message)

    })

    test("4.Test to verify you can add a DUT to a switch group", async({page, baseURL}) => {

        await switchgroupFlow.confirmSwitchGroupSyncing(DUT3[0].name, mock1[0].switch_group_name, sync_status_device[0].InSync)

    })

    test("5.Test to verify you can remove a DUT from a switch group", async({page, baseURL}) => {

        await switchgroupFlow.confirmSwitchGroupSyncing(DUT3[0].name, "None ", sync_status_device[0].NA)

    })
    // Added again the test to run test 7
    test("6.Test to verify you can add a DUT to a switch group", async({page, baseURL}) => {

        await switchgroupFlow.confirmSwitchGroupSyncing(DUT3[0].name, mock1[0].switch_group_name, sync_status_device[0].InSync)

    })

    test("7.Test to verify you can modify the STP mode of a Switch Group", async({page, baseURL}) => {

        await switchgroupFlow.goToSwitchGroupConfigurationPageOfASwitch(DUT3[0].name)
        await switchgroupFlow.changeSTPofTheSwitchGroup("PVRST")
        await switchgroupFlow.goToConfigurationPageOfASwitchFromSwitchGroup(DUT3[0].name)
        await switchgroupFlow.confirmApplyConfigurationSyncing(job_message[0].JobStartedSuccessfully, 
            sync_status_device[0].InSync)

    })

    test("8.Test to verify you can modify the Priority in RSTP", async({page, baseURL}) => {

        await switchgroupFlow.goToSwitchGroupConfigurationPageOfASwitch(DUT3[0].name)
        await switchgroupFlow.changeSTPofTheSwitchGroup("RSTP")
        await switchgroupFlow.changePriorityRSTP("0")
        await switchgroupFlow.goToConfigurationPageOfASwitchFromSwitchGroup(DUT3[0].name)
        await switchgroupFlow.confirmApplyConfigurationSyncing(job_message[0].JobStartedSuccessfully, 
            sync_status_device[0].InSync)

    })

    test("9.Test to verify you can modify the Priority of a Instance in PVRST", async({page, baseURL}) => {

        await switchgroupFlow.goToSwitchGroupConfigurationPageOfASwitch(DUT3[0].name)
        await switchgroupFlow.changeSTPofTheSwitchGroup("PVRST")
        await switchgroupFlow.changeInstancePriorityPVRST("10", "8192")
        await switchgroupFlow.goToConfigurationPageOfASwitchFromSwitchGroup(DUT3[0].name)
        await switchgroupFlow.confirmApplyConfigurationSyncing(job_message[0].JobStartedSuccessfully, 
            sync_status_device[0].InSync)

    })

    test.only("10.Test to verify you can modify the Priority in MSTP", async({page, baseURL}) => {

        await switchgroupFlow.goToSwitchGroupConfigurationPageOfASwitch(DUT3[0].name)
        await switchgroupFlow.changeSTPofTheSwitchGroup("MSTP")
        await switchgroupFlow.changeInstancePriorityMSTP("Reg1", 1, "100", "4096")
        await switchgroupFlow.goToConfigurationPageOfASwitchFromSwitchGroup(DUT3[0].name)
        await switchgroupFlow.confirmApplyConfigurationSyncing(job_message[0].JobStartedSuccessfully, 
            sync_status_device[0].InSync)
        
    })

    test("X.Testing", async({page, baseURL}) => {

        const cloud = new CloudObjects(page)
        const switchgroupFlow = new SwitchGroupFlow(page)

        // await switchgroupFlow.checkIfTheSwitchGroupHasBeenCreated(mock2[0].switch_group_name)
        // await switchgroupFlow.checkIfTheSwitchGroupExists(mock2[0].switch_group_name)
        // await cloud.toolbarObj.clickSwitchGroupsPage()
        // await page.waitForTimeout(3000)
        // // await cloud.switchgroupObj.editSwitchGroupByName(mock2[0].switch_group_name)
        // await cloud.switchgroupObj.getNrOfPoEPorts(mock2[0].switch_group_name)
        // await cloud.switchgroupObj.editSwitchGroupByName(mock2[0].switch_group_name)
        // // await cloud.switchgroupObj.edit(mock2[0].switch_group_name)
        // await page.waitForTimeout(3000)

        // await cloud.toolbarObj.clickDevicePage()
        // await cloud.deviceObj.clickSwitches()
        // await page.waitForTimeout(3000)
        // await cloud.deviceObj.getDeviceMacByName(mock2[0].switch_group_name)
        // await page.waitForTimeout(3000)

        // await switchgroupFlow.goToSwitchGroupConfigurationPageOfASwitch(DUT3[0].name)
        // await switchgroupFlow.changeSTPofTheSwitchGroup("RSTP")
        // await cloud.networkObj.choosePathCost("short")
        // await page.waitForTimeout(4000)
        // await cloud.networkObj.choosePathCost("long")
        // await switchgroupFlow.changePriorityRSTP("12288")
        // await page.waitForTimeout(4000)

    })
})