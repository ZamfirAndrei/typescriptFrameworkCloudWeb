import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"
import { url } from "inspector";
import { CloudObjects } from "../management/cloudObjects";
import { LoginFlow } from "../flows/loginFlow";
import { OnBoardFlow } from "../flows/onboardFlow";
import { DUTs, DUT1, DUT2, DUT3, DUT4, DUT5 } from "../constants/duts";
import { onboard_status_device } from "../constants/mocks";



test.describe("OnBoard ->", async() => {

    test.beforeEach(async ({page, baseURL}) => {

        const cloud = new CloudObjects(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.login_obj.login(data.user, data.password)
        // await cloud.login_obj.selectAccount(data.account2)
        await cloud.login_obj.selectAccount(data.account1)
        // await cloud.page.waitForTimeout(2000)
        await cloud.page.waitForLoadState()
    })

    test ("1.Test to verify the onboarding of a DUT", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const onboardFlow = new OnBoardFlow(page)

        await onboardFlow.onboardDevice(DUT3[0].serial_number)
        await onboardFlow.confirmDeviceOnboarded(DUT3[0].serial_number, onboard_status_device[0].Onboarded)
        await onboardFlow.confirmDeviceisAvailableInTheCloud(DUT3[0].name)

    })

    test.only ("2.Test to verify if a DUT is already onboarded", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const onboardFlow = new OnBoardFlow(page)

        await onboardFlow.onboardDevice(DUT3[0].serial_number)
        await onboardFlow.confirmDeviceIsOnboarded(DUT3[0].serial_number)
        await onboardFlow.confirmDeviceisAvailableInTheCloud(DUT3[0].name)

    })

    test ("3.Test to verify if a DUT can be deleted from cloud", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const onboardFlow = new OnBoardFlow(page)

        await onboardFlow.goToSwitchesList()
        await onboardFlow.confirmDeleteDeviceFromCloud(DUT3[0].name)
    
    })
})