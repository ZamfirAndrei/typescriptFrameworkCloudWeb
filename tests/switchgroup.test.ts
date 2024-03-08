import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"

import { switchGroupFlow } from "../flows/switchgroupFlow";
import { CloudObjects } from "../management/cloudObjects";
import { DUTs, DUT1, DUT2, DUT3, DUT4 } from "../constants/duts";


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

        const switch_group_name = "test1234"
        const admin_password = "Admin124!"
        const guest_password = "Guest124!"
        const check_message = "Switch Group is created successfully."

        await switchgroupFlow.createSwitchGroup(switch_group_name, admin_password, guest_password)
        await switchgroupFlow.confirmSwithGroupCreation(check_message)
        await switchgroupFlow.checkTheSwitchGroupHasBeenCreated(switch_group_name)

    })

    test("2.Test to verify that you can not create a Switch Group if is already created", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const switchgroupFlow = new switchGroupFlow(page)

        const switch_group_name = "test1234"
        const admin_password = "Admin124!"
        const guest_password = "Guest124!"
        const check_message = "The specified profile name already exists."

        await switchgroupFlow.createSwitchGroup(switch_group_name, admin_password, guest_password)
        await switchgroupFlow.confirmSwithGroupCreation(check_message)
        await switchgroupFlow.checkTheSwitchGroupHasBeenCreated(switch_group_name)
    })

    test("3.Test to verify you can delete a switch group", async({page, baseURL}) => {

        const cloud = new CloudObjects(page)
        const switchgroupFlow = new switchGroupFlow(page)

        const switch_group_name = "test1234"
        const admin_password = "Admin124!"
        const guest_password = "Guest124!"
        const check_message = "Delete Successful"

        await switchgroupFlow.checkIfTheSwitchGroupExists(switch_group_name)
        await switchgroupFlow.checkDeleteSwitchGroup(switch_group_name, 1, check_message)

    })


})