import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"
import { url } from "inspector";
import { CloudObjects } from "../management/cloudObjects";
import { LoginFlow } from "../flows/loginFlow";


test.describe("Login ->", async() => {

    let loginFlow : LoginFlow
    let cloud : CloudObjects

    test.beforeEach(async ({page, baseURL}) => {

        cloud = new CloudObjects(page)
        loginFlow = new LoginFlow(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.loginObj.clickSignIn()
        // await cloud.page.waitForTimeout(2000)
        await cloud.page.waitForLoadState()
    })

    test ("1.Verify that you can not login without a password", async({page,baseURL}) => {
    
        await loginFlow.introduceUser(data.user)
        await loginFlow.confirmLoginWithoutPassword()
    
    })
    
    test ("2.Verify that you can not login with un-registered email", async({page,baseURL}) => {
    
        await loginFlow.introduceUserAndPassword(data.wrong_user, data.password)
        await loginFlow.confirmLoginWithWrongCredentials()
    
    })
    
    test ("3.Verify that you can not login with a registered email and a wrong password", async({page,baseURL}) => {
    
        await loginFlow.introduceUserAndPassword(data.user, data.wrong_password)
        await loginFlow.confirmLoginWithWrongCredentials()
        
    })
    
    test ("4.Verify that you can login with registered email and password", async({page,baseURL}) => {
    
        await loginFlow.introduceUserAndPassword(data.user, data.password)
        await loginFlow.confirmLoginWithProperCredentials()
    })
})