import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"

import { switchGroupFlow } from "../flows/switchgroupFlow";
import { CloudObjects } from "../management/cloudObjects";
import { DUTs, DUT1, DUT2, DUT3, DUT4 } from "../constants/duts";
import {mock1, mock2, mock3} from "../constants/mocks"



test.describe("SwitchGroup ->", async() => {

    test.beforeEach(async ({page, baseURL}) => {

        const cloud = new CloudObjects(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.login_obj.login(data.user, data.password)
        await cloud.login_obj.selectAccount(data.account2)
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


})