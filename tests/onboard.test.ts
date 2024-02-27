import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"
import { url } from "inspector";
import { CloudObjects } from "../management/cloudObjects";
import { LoginFlow } from "../flows/loginFlow";
import { OnBoardFlow } from "../flows/onboardFlow";
import { DUTs, DUT1, DUT2, DUT3, DUT4 } from "../constants/duts";



test.describe("OnBoard ->", async() => {

    test.beforeEach(async ({page, baseURL}) => {

        const cloud = new CloudObjects(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.login_obj.login(data.user, data.password)
        await cloud.login_obj.selectAccount(data.account2)
        // await cloud.page.waitForTimeout(2000)
        await cloud.page.waitForLoadState()
    })

    test ("1.Test to verify the onboarding of a DUT", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const onboardFlow = new OnBoardFlow(page)

        await onboardFlow.onboardDevice(DUT1[0].serial_number)
        await onboardFlow.confirmDeviceOnboarded(1)
        await onboardFlow.confirmDUTisAvailableInTheCloud(DUT1[0].name, 1)

    })

    test.only ("2.Test to verify if a DUT is already onboarded", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const onboardFlow = new OnBoardFlow(page)

        await onboardFlow.onboardDevice(DUT1[0].serial_number)
        await onboardFlow.confirmDeviceAlreadyOnboarded(1)
        await onboardFlow.confirmDUTisAvailableInTheCloud(DUT1[0].name, 1)

    })

    test ("3.Test to verify if a DUT can be deleted from cloud", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const onboardFlow = new OnBoardFlow(page)

        await onboardFlow.goToSwitchesList()
        await onboardFlow.confirmDeleteDUTfromCloud(DUT3[0].name)
    
    })
})