import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"
import { url } from "inspector";
import { CloudObjects } from "../management/cloudObjects";
import { LoginFlow } from "../flows/loginFlow";


test.describe("OnBoard ->", async() => {

    test.beforeEach(async ({page, baseURL}) => {

        const cloud = new CloudObjects(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.login_obj.login(data.user, data.password)
        await cloud.login_obj.selectAccount(data.account2)
        await cloud.page.waitForTimeout(2000)
    })

    test ("1.Test to verify the onboarding of a DUT", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const onboardFlow = new LoginFlow(page)

        // Click OnBoardPage

        await cloud.toolbar_obj.clickOnBoardPage()
        await cloud.onboard_obj.claimDevice("XLZB046BTR3B")
        await cloud.onboard_obj.closeClaimDevice()

        // Aproving the Device

        await cloud.page.reload()
        await cloud.page.waitForTimeout(2000)
        await cloud.onboard_obj.approveDevice(1)

        // Checking the Device is added in the Cloud

        await cloud.page.waitForTimeout(40000)

        await cloud.toolbar_obj.clickDevicePage()
        await cloud.device_obj.clickSwitches()
        await cloud.page.waitForTimeout(2000)
        await cloud.device_obj.searchToolbar("Andrei-3052")
    
        await cloud.page.waitForTimeout(2000)
    })
})