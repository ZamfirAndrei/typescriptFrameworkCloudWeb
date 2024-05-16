import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"

import { switchGroupFlow } from "../flows/switchgroupFlow";
import { CloudObjects } from "../management/cloudObjects";
import { DUTs, DUT1, DUT2, DUT3, DUT4 } from "../constants/duts";
import {mock1, mock2, mock3, result_update, message_update, job_message, sync_status_device} from "../constants/mocks"



test.describe("SwitchGroup ->", async() => {

    test.beforeEach(async ({page, baseURL}) => {

        const cloud = new CloudObjects(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.login_obj.login(data.user, data.password)
        // await cloud.login_obj.selectAccount(data.account2)
        await cloud.login_obj.selectAccount(data.account1)
        await cloud.page.waitForLoadState()
    })

    test("1.Test to verify if you can create a Switch Group", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const switchgroupFlow = new switchGroupFlow(page)

        await switchgroupFlow.createSwitchGroup(mock1[0].switch_group_name, mock1[0].admin_password, mock1[0].guest_password)
        await switchgroupFlow.confirmSwithGroupCreation(mock1[0].check_message)
        await switchgroupFlow.checkTheSwitchGroupHasBeenCreated(mock1[0].switch_group_name)

    })

    test("2.Test to verify that you can not create a Switch Group if is already created", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const switchgroupFlow = new switchGroupFlow(page)

        await switchgroupFlow.createSwitchGroup(mock2[0].switch_group_name, mock2[0].admin_password, mock2[0].guest_password)
        await switchgroupFlow.confirmSwithGroupCreation(mock2[0].check_message)
        await switchgroupFlow.checkTheSwitchGroupHasBeenCreated(mock2[0].switch_group_name)
    })

    test("3.Test to verify you can delete a switch group", async({page, baseURL}) => {

        const cloud = new CloudObjects(page)
        const switchgroupFlow = new switchGroupFlow(page)

        await switchgroupFlow.checkIfTheSwitchGroupExists(mock3[0].switch_group_name)
        await switchgroupFlow.checkDeleteSwitchGroup(mock3[0].switch_group_name, mock3[0].check_message)

    })

    test("4.Test to verify you can add a DUT to a switch group", async({page, baseURL}) => {

        const cloud = new CloudObjects(page)
        const switchgroupFlow = new switchGroupFlow(page)

        await switchgroupFlow.confirmSwitchGroupSyncing(DUT3[0].name, mock1[0].switch_group_name, job_message[0].JobStartedSuccessfully, 
            sync_status_device[0].InSync)


    })

    test("5.Test to verify you can remove a DUT from a switch group", async({page, baseURL}) => {

        const cloud = new CloudObjects(page)
        const switchgroupFlow = new switchGroupFlow(page)

        await switchgroupFlow.confirmSwitchGroupSyncing(DUT3[0].name, "None ", job_message[0].DeviceDetailsAreSavedSuccessfully, 
            sync_status_device[0].NA)


    })
    // Added again the test to run test 7
    test.only("6.Test to verify you can add a DUT to a switch group", async({page, baseURL}) => {

        const cloud = new CloudObjects(page)
        const switchgroupFlow = new switchGroupFlow(page)

        await switchgroupFlow.confirmSwitchGroupSyncing(DUT3[0].name, mock1[0].switch_group_name, job_message[0].JobStartedSuccessfully, 
            sync_status_device[0].InSync)


    })

    test("7.Test to verify you can modify the STP mode of a Switch Group", async({page, baseURL}) => {

        const cloud = new CloudObjects(page)
        const switchgroupFlow = new switchGroupFlow(page)

        await switchgroupFlow.selectConfigurationPageOfTheSwitch(DUT3[0].name)
        await switchgroupFlow.goToSwitchGroupConfigurationPageOfASwitch(mock1[0].switch_group_name)
        await switchgroupFlow.changeSTPofTheSwitchGroup("RSTP")
        await switchgroupFlow.goToConfigurationPageOfASwitchFromSwitchGroup(DUT3[0].name)
        await switchgroupFlow.confirmApplyConfigurationSyncing(job_message[0].JobStartedSuccessfully, 
            sync_status_device[0].InSync)


    })


})