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
        await cloud.page.waitForTimeout(2000)
    })

    test ("1.Verify that you can not login without a password", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const loginFlow = new LoginFlow(page)
    
        await cloud.login_obj.introduceUser("gigi@gmail.com")
        await cloud.login_obj.clickSubmit()
        await cloud.login_obj.clickSubmit()

        await loginFlow.confirmLoginWithoutPassword()
    
        await cloud.page.waitForTimeout(2000)
    })
    
    test ("2.Verify that you can not login with un-registered email", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const loginFlow = new LoginFlow(page)
    
        await cloud.login_obj.introduceUser("gigi@gmail.com")
        await cloud.login_obj.clickSubmit()
        await cloud.login_obj.introducePassword("Solotov1998.")
        await cloud.login_obj.clickSubmit()

        await loginFlow.confirmLoginWithWrongCredentials()
    
        await cloud.page.waitForTimeout(2000)
    })
    
    test ("3.Verify that you can not login with a registered email and a wrong password", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const loginFlow = new LoginFlow(page)
    
        await cloud.login_obj.introduceUser("andreigabriel.zamfir@dxc.com")
        await cloud.login_obj.clickSubmit()
        await cloud.login_obj.introducePassword("Gigi")
        await cloud.login_obj.clickSubmit()

        await loginFlow.confirmLoginWithWrongCredentials()
    
        await cloud.page.waitForTimeout(2000)
        
    })
    
    test ("4.Verify that you can login with registered email and password", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const loginFlow = new LoginFlow(page)
    
        await cloud.login_obj.introduceUser("andreigabriel.zamfir@dxc.com")
        await cloud.login_obj.clickSubmit()
        await cloud.login_obj.introducePassword("Solotov1998.")
        await cloud.login_obj.clickSubmit()

        await loginFlow.confirmLoginWithProperCredentials()
    
        await cloud.page.waitForTimeout(2000)
    })
    
    test.only ("5.Verify that you can check 'Remember Me' box", async({page,baseURL}) => {
    
        const cloud = new CloudObjects(page)
        const loginFlow = new LoginFlow(page)
    
        await cloud.login_obj.introduceUser("andreigabriel.zamfir@dxc.com")
        await cloud.login_obj.clickSubmit()
        await cloud.login_obj.introducePassword("Solotov1998.")

        await loginFlow.confirmCheckBox()
        await loginFlow.expectPageTitle("Log In / Cambium Networks Support")

        await cloud.login_obj.clickSubmit()
        await loginFlow.expectPageTitle("cnMaestro™")
    
        await cloud.page.waitForTimeout(2000)
    })
})