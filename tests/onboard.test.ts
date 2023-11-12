import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"
import { url } from "inspector";
import { CloudObjects } from "../management/cloudObjects";
import { LoginFlow } from "../flows/loginFlow";
import { OnBoardFlow } from "../flows/onboardFlow";



test.describe("OnBoard ->", async() => {

    test.beforeEach(async ({page, baseURL}) => {

        const cloud = new CloudObjects(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.login_obj.login(data.user, data.password)
        await cloud.login_obj.selectAccount(data.account2)
        await cloud.page.waitForTimeout(2000)
    })

    test.only ("1.Test to verify the onboarding of a DUT", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const onboardFlow = new OnBoardFlow(page)

        await onboardFlow.onboardDevice("XLZB046BTR3B")
        await onboardFlow.confirmDeviceOnboarded(1)
        await onboardFlow.confirmDUTisAvailableInTheCloud("Andrei-3052", 1)
    
        await cloud.page.waitForTimeout(2000)
    })

    test ("2.Test to verify if a DUT is already onboarded", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const onboardFlow = new OnBoardFlow(page)

        await onboardFlow.onboardDevice("XLZB046BTR3B")
        await onboardFlow.confirmDeviceAlreadyOnboarded(1)
        await onboardFlow.confirmDUTisAvailableInTheCloud("Andrei-3052", 1)
    
        await cloud.page.waitForTimeout(2000)
    })
})