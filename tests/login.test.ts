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
        const loginFlow = new LoginFlow(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.login_obj.clickSignIn()
        await cloud.page.waitForTimeout(2000)
    })
})

test ("1.Verify you can introduce a user in the user's blank", async({page, baseURL}) =>{


    const message1 : string | null = await page.locator('[class="alert cs-instructions"]').textContent()
    // console.log(await message1.trim())
    await cloud.login_obj.introduceUser("gigi@yahoo.com")

    expect(message1).toContain("Please enter your email address")
    await cloud.login_obj.clickSubmit()
    
    const message2 : string | null = await page.locator('[class="alert cs-instructions"]').textContent()
    // console.log(await message2.trim())

    expect(message2).toContain("Please enter your password")

    const page_title = await page.title()
    console.log(page_title)

    expect(page_title).toBe("Log In / Cambium Networks Support")

    await page.waitForTimeout(2000)
    
})

test ("2.Verify that you can not login without a password", async({page,baseURL}) => {
    
    const login_obj = new loginPage(page)
    await page.goto(`${baseURL}`)
    await login_obj.clickSignIn()

    await page.waitForTimeout(2000)

    const message1 : string | null = await page.locator('[class="alert cs-instructions"]').textContent()
    // console.log(await message1.trim())
    await login_obj.introduceUser("gigi@yahoo.com")
    await login_obj.clickSubmit()

    expect(message1).toContain("Please enter your email address")

    await login_obj.clickSubmit()

    const alert : string  | null = await page.locator('[class="text-danger"]').textContent()
    console.log(alert?.trim())

    expect(alert).toBe("Required")

    const message2 : string | null = await page.locator('[class="alert cs-instructions"]').textContent()
    console.log(message2.trim())

    expect(message2).toContain("Please enter your password.")

    const page_title = await page.title()
    console.log(page_title)

    expect(page_title).toBe("Log In / Cambium Networks Support")

    await page.waitForTimeout(2000)
})

test ("3.Verify that you can not login with un-registered email", async({page,baseURL}) => {

    const login_obj = new loginPage(page)
    await page.goto(`${baseURL}`)
    await login_obj.clickSignIn()

    await page.waitForTimeout(2000)

    const message1 : string | null = await page.locator('[class="alert cs-instructions"]').textContent()
    // console.log(await message1.trim())
    await login_obj.introduceUser("gigi@yahoo.com")

    expect(message1).toContain("Please enter your email address")
    await login_obj.clickSubmit()
    
    await login_obj.introducePassword("Andrei1998")
    await login_obj.clickSubmit()


    const message2 : string | null = await page.locator('[class="alert alert-danger"]').textContent()
    console.log(await message2.trim())

    expect(message2).toContain("Invalid email address or password")

    const page_title = await page.title()
    console.log(page_title)

    expect(page_title).toBe("Log In / Cambium Networks Support")

    await page.waitForTimeout(2000)
})

test ("4.Verify that you can not login with a registered email and a wrong password", async({page,baseURL}) => {

    const login_obj = new loginPage(page)
    await page.goto(`${baseURL}`)
    await login_obj.clickSignIn()

    await page.waitForTimeout(2000)

    const message1 : string | null = await page.locator('[class="alert cs-instructions"]').textContent()
    // console.log(await message1.trim())
    await login_obj.introduceUser("andreigabriel.zamfir@dxc.com")

    expect(message1).toContain("Please enter your email address")
    await login_obj.clickSubmit()
    
    await login_obj.introducePassword("Andrei1998")
    await login_obj.clickSubmit()


    const message2 : string | null = await page.locator('[class="alert alert-danger"]').textContent()
    console.log(await message2.trim())

    expect(message2).toContain("Invalid email address or password")

    const page_title = await page.title()
    console.log(page_title)

    expect(page_title).toBe("Log In / Cambium Networks Support")

    await page.waitForTimeout(2000)
})

test ("5.Verify that you can login with registered email and password", async({page,baseURL}) => {

    const login_obj = new loginPage(page)
    await page.goto(`${baseURL}`)
    await login_obj.clickSignIn()

    await page.waitForTimeout(2000)

    const message1 : string | null = await page.locator('[class="alert cs-instructions"]').textContent()
    // console.log(await message1.trim())

    await login_obj.introduceUser("andreigabriel.zamfir@dxc.com")

    expect(message1).toContain("Please enter your email address")
    await login_obj.clickSubmit()
    
    await login_obj.introducePassword("Solotov1998.")
    await login_obj.clickSubmit()

    expect(await page.locator('[class="alert alert-danger"]')).not.toBeVisible()

    const page_title = await page.title()
    console.log(page_title)

    expect(page_title).toBe("cnMaestro™")

    await page.waitForTimeout(2000)
})

test.only ("6.Verify that you can check 'Remember Me' box", async({page,baseURL}) => {

    const login_obj = new loginPage(page)
    await page.goto(`${baseURL}`)
    await login_obj.clickSignIn()

    await page.waitForTimeout(2000)

    const message1 : string | null = await page.locator('[class="alert cs-instructions"]').textContent()
    // console.log(await message1.trim())

    await login_obj.introduceUser("andreigabriel.zamfir@dxc.com")

    expect(message1).toContain("Please enter your email address")
    await login_obj.clickSubmit()
    
    await login_obj.introducePassword("Solotov1998.")

    const checkbox_before : string | null = await page.locator('[type="checkbox"]').isChecked()
    console.log(checkbox_before)

    expect(checkbox_before).not.toBe(true)

    await login_obj.checkRememberMe()
    await page.waitForTimeout(1000)

    const checkbox_after : string | null = await page.locator('[type="checkbox"]').isChecked()
    console.log(checkbox_after)

    expect(checkbox_after).toBe(true)
    await login_obj.clickSubmit()

    expect(await page.locator('[class="alert alert-danger"]')).not.toBeVisible()

    const page_title = await page.title()
    console.log(page_title)

    expect(page_title).toBe("cnMaestro™")

    await page.waitForTimeout(2000)
})