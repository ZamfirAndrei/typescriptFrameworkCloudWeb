import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"

import { softwareUpdateFlow } from "../flows/softwareUpdateFlow";
import { CloudObjects } from "../management/cloudObjects";
import { DUTs, DUT1, DUT2, DUT3, DUT4 } from "../constants/duts";


test.describe("SoftwareUpdate ->", async() => {

    test.beforeEach(async ({page, baseURL}) => {

        const cloud = new CloudObjects(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.login_obj.login(data.user, data.password)
        await cloud.login_obj.selectAccount(data.account2)
        await cloud.page.waitForTimeout(2000)
    })

    test ("1.Test to verify if you can upgrade to a new software - Particular Switch - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new softwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectDUT(DUT4[0].name)
        await softUpdateFlow.updateDUT(data.image_to_upgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_upgrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT4[0].name, data.image_to_upgrade)

    })

    test ("2.Test to verify if you can downgrade to an older software - Particular Switch - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new softwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectDUT(DUT4[0].name)
        await softUpdateFlow.updateDUT(data.image_to_downgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_downgrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT4[0].name, data.image_to_downgrade)


        // // Searching and selecting the device which you want to upgrade

        // await cloud.toolbar_obj.clickDevicePage()
        // await cloud.device_obj.clickSwitches()

        // await page.waitForTimeout(2000)
        // await cloud.device_obj.clickDevice(DUT4[0].name)
        // await page.waitForTimeout(2000)

        // // Updating the Switch 

        // await cloud.part_device.clickSoftwareUpgrade()
        // await cloud.soft_update.selectImgForUpdate(data.image_to_downgrade)
        // await cloud.soft_update.addSoftwareJob()
        
        // // Waiting for the Job Update

        // await page.waitForTimeout(15000)

        // console.log("######## Getting the information before the update is completed ########")

        // const target = await cloud.jobs_softupdate_obj.getTarget(1)
        // await cloud.jobs_softupdate_obj.clickShowMore(1)

        // const device = await cloud.jobs_softupdate_obj.getDevice()
        // const result = await cloud.jobs_softupdate_obj.getResult()
        // const update_message = await cloud.jobs_softupdate_obj.getMessageUpdate()
        // // await cloud.jobs_softupdate_obj.getLastUpdate()
        // const original_version = await cloud.jobs_softupdate_obj.getOriginalVersion()

        // // Fetching and asserting the Results

        // expect(target).toBe(data.image_to_downgrade)
        // expect(device).toBe(DUT4[0].name)
        // expect(result).toBe("Initiated")
        // expect(update_message).toBe("Initiated software update operation")
        // // expect(original_version).toBe(data.image_to_upgrade)
        
        // // Waiting 3.35 min for the Software Update to be complete

        // await page.waitForTimeout(210000)

        // console.log("######## Getting the information after the update is completed ########")

        // const device1 = await cloud.jobs_softupdate_obj.getDevice()
        // const result1 = await cloud.jobs_softupdate_obj.getResult()
        // const update_message1 = await cloud.jobs_softupdate_obj.getMessageUpdate()
        // // await cloud.jobs_softupdate_obj.getLastUpdate()
        // const original_version1 = await cloud.jobs_softupdate_obj.getOriginalVersion()
        
        // // Fetching and asserting the Results

        // expect(device1).toBe(DUT4[0].name)
        // expect(result1).toBe("Completed")
        // expect(update_message1).toBe(`Successfully updated the device version to ${data.image_to_downgrade}`)
        // // expect(original_version1).toBe(data.image_to_upgrade)
        
        // await page.waitForTimeout(2000)

    })

    test ("3.Test to verify if you can not upgrade/downgrade to the same software - Particular Switch - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new softwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectDUT(DUT4[0].name)
        await softUpdateFlow.updateDUT(data.image_to_downgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_downgrade)
        await softUpdateFlow.confirmDetails(DUT4[0].name, "Skipped", "Device is already running same version!")

        // // Selecting the device which you want to upgrade

        // await cloud.toolbar_obj.clickDevicePage()
        // await cloud.device_obj.clickSwitches()

        // await page.waitForTimeout(2000)
        // await cloud.device_obj.clickDevice(DUT4[0].name)
        // await page.waitForTimeout(2000)

        // // Updating the Switch 

        // await cloud.part_device.clickSoftwareUpgrade()
        // await cloud.soft_update.selectImgForUpdate(data.image_to_downgrade)
        // await cloud.soft_update.addSoftwareJob()
        
        // // Waiting for the Job Update

        // await page.waitForTimeout(15000)

        // console.log("######## Getting the information before the update is completed ########")

        // const target = await cloud.jobs_softupdate_obj.getTarget(1)
        // await cloud.jobs_softupdate_obj.clickShowMore(1)

        // const device = await cloud.jobs_softupdate_obj.getDevice()
        // const result = await cloud.jobs_softupdate_obj.getResult()
        // const update_message = await cloud.jobs_softupdate_obj.getMessageUpdate()
        // // await cloud.jobs_softupdate_obj.getLastUpdate()
        // const original_version = await cloud.jobs_softupdate_obj.getOriginalVersion()

        // // Fetching and asserting the Results

        // expect(target).toBe(data.image_to_downgrade)
        // expect(device).toBe(DUT4[0].name)
        // expect(result).toBe("Skipped")
        // expect(update_message).toBe("Device is already running same version!")
        // // expect(original_version).toBe(data.image_to_upgrade)
        
        // await page.waitForTimeout(2000)

    })

})

