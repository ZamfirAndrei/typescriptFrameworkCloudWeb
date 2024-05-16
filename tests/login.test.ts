import { test, expect} from "@playwright/test";
import loginPage from "../pages/loginPage";
import homePage from "../pages/homePage";
import devicePage from "../pages/devicesPage";
import toolbarPage from "../pages/toolbarPage";
import switchgroupPage from "../pages/SwitchGroupPage";
// import addswitchgroupPage from "../pages/addswitchgroupPage";
import {  addswitchgroupPage, BasicPage, ManagementPage, NetworkPage } from "../pages/addswitchgroupPage";
import { ParticularDevicePage, ConfigurationPage, SoftwareUpdatePage,ToolsPage } from "../pages/particularDevicePage";
import { ParticularSwitchGroupPage, SwitchPortsPage, PortPage, PhysicalPortPage, NetworkPortPage, StatisticsPage} from "../pages/particularSwitchGroupPage";

import * as data from "../constants/constants.json"
import { url } from "inspector";
import { CloudObjects } from "../management/cloudObjects";
import { LoginFlow } from "../flows/loginFlow";


test.describe("Login ->", async() => {

    test.beforeEach(async ({page, baseURL}) => {

        const cloud = new CloudObjects(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.login_obj.clickSignIn()
        // await cloud.page.waitForTimeout(2000)
        await cloud.page.waitForLoadState()
    })

    test ("1.Verify that you can not login without a password", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const loginFlow = new LoginFlow(page)
    
        await loginFlow.introduceUser(data.user)
        await loginFlow.confirmLoginWithoutPassword()
    
    })
    
    test ("2.Verify that you can not login with un-registered email", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const loginFlow = new LoginFlow(page)

        await loginFlow.introduceUserAndPassword(data.wrong_user, data.password)
        await loginFlow.confirmLoginWithWrongCredentials()
    
    })
    
    test ("3.Verify that you can not login with a registered email and a wrong password", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const loginFlow = new LoginFlow(page)
    
        await loginFlow.introduceUserAndPassword(data.user, data.wrong_password)
        await loginFlow.confirmLoginWithWrongCredentials()
        
    })
    
    test ("4.Verify that you can login with registered email and password", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const loginFlow = new LoginFlow(page)
    
        await loginFlow.introduceUserAndPassword(data.user, data.password)
        await loginFlow.confirmLoginWithProperCredentials()
    })
})