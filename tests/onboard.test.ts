import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"
import { url } from "inspector";
import { CloudObjects } from "../management/cloudObjects";
import { LoginFlow } from "../flows/loginFlow";
import { OnBoardFlow } from "../flows/onboardFlow";
import { DUTs, DUT1, DUT2, DUT3, DUT4, DUT5 } from "../constants/duts";
import { onboardStatusDevice } from "../constants/mocks";



test.describe("OnBoard ->", async() => {

    let onboardFlow : OnBoardFlow
    let cloud : CloudObjects

    test.beforeEach(async ({page, baseURL}) => {

        cloud = new CloudObjects(page)
        onboardFlow = new OnBoardFlow(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.loginObj.login(data.user, data.password)
        // await cloud.loginObj.selectAccount(data.account2)
        await cloud.loginObj.selectAccount(data.account1)
        // await cloud.page.waitForTimeout(5000)
        await cloud.page.waitForLoadState()
    })

    test.only ("1.Test to verify the onboarding of a DUT", async({page,baseURL}) => {
    
        await onboardFlow.onboardDevice(DUT3[0].serialNumber)
        await onboardFlow.confirmDeviceOnboarded(DUT3[0].serialNumber, onboardStatusDevice[0].Onboarded)
        await onboardFlow.confirmDeviceisAvailableInTheCloud(DUT3[0].name)

    })

    test ("2.Test to verify if a DUT is already onboarded", async({page,baseURL}) => {
    
        await onboardFlow.onboardDevice(DUT3[0].serialNumber)
        await onboardFlow.confirmDeviceIsOnboarded(DUT3[0].serialNumber)
        await onboardFlow.confirmDeviceisAvailableInTheCloud(DUT3[0].name)

    })

    test ("3.Test to verify if a DUT can be deleted from cloud", async({page,baseURL}) => {
    
        await onboardFlow.goToSwitchesList()
        await onboardFlow.confirmDeviceDeletedFromCloud(DUT3[0].name)
    
    })
})