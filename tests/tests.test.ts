import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"

import { SoftwareUpdateFlow } from "../flows/softwareUpdateFlow";
import { CloudObjects } from "../management/cloudObjects";
import { DUTs, DUT1, DUT2, DUT3, DUT4 } from "../constants/duts";


test.describe("SoftwareUpdate ->", async() => {

    test.beforeEach(async ({page, baseURL}) => {

        const cloud = new CloudObjects(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.loginObj.login(data.user, data.password)
        await cloud.loginObj.selectAccount(data.account2)
        await cloud.page.waitForTimeout(2000)
    })

    test ("1.Test to verify if you can upgrade to a new software - Particular Switch - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new SoftwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectDUT(DUT4[0].name)
        await softUpdateFlow.updateDUT(data.image_to_upgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_upgrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT4[0].name, data.image_to_upgrade, 1, 210000)

    })

    test ("2.Test to verify if you can downgrade to an older software - Particular Switch - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new SoftwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectDUT(DUT4[0].name)
        await softUpdateFlow.updateDUT(data.image_to_downgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_downgrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT4[0].name, data.image_to_downgrade, 1, 210000)


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
        const softUpdateFlow = new SoftwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectDUT(DUT4[0].name)
        await softUpdateFlow.updateDUT(data.image_to_downgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_downgrade)
        await softUpdateFlow.confirmDetails(DUT4[0].name, "Skipped", "Device is already running same version!", 1)

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

    test ("4.Test to verify if you can upgrade to a new software - Switch Group - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new SoftwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchgroup)
        await softUpdateFlow.updateDUTSwitchGroup(DUT4[0].name, data.image_to_upgrade, 1)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_upgrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT4[0].name, data.image_to_upgrade, 1, 210000)

        // // Selecting the Switch Group which you want to upgrade

        // await cloud.toolbar_obj.clickSwitchGroupsPage()

        // await page.waitForTimeout(2000)
        // await cloud.switchgroup_obj.clickSwitchGroup(data.switchgroup)
        // await page.waitForTimeout(2000)
        // await cloud.part_switchgroup_obj.clickSwitches()

        // // Choose the Switch which you want to update

        // await page.waitForTimeout(2000)
        // await cloud.switch_group_softupdate.clickCheckSwitch(DUT4[0].name)
        // await cloud.switch_group_softupdate.getSoftwareVersion()

        // // Update the Switch selected

        // await cloud.switch_group_softupdate.clickActions()
        // await cloud.switch_group_softupdate.clickSoftUpdate()
        // await page.waitForTimeout(2000)
        // await cloud.switch_group_softupdate.chooseSoftwareImageForUpdate(data.image_to_upgrade)
        // await cloud.switch_group_softupdate.clickAddSoftwareUpdate()
        
        // await page.waitForTimeout(2000)

        // // Going to the software jobs

        // await cloud.toolbar_obj.clickJobsPage()
        // await cloud.jobs_obj.clickSoftwareUpdate()

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

        // console.log(device)
        // console.log(result)
        // console.log(update_message)
        // console.log(original_version)

        // // Fetching and asserting the Results

        // expect(target).toBe(data.image_to_upgrade)
        // expect(device).toBe(DUT4[0].name)
        // expect(result).toBe("Initiated")
        // expect(update_message).toBe("Initiated software update operation")
        // expect(original_version).toBe(data.image_to_upgrade)
        
        // // Waiting 3.35 min for the Software Update to be complete

        // await page.waitForTimeout(210000)

        // console.log("######## Getting the information after the update is completed ########")

        // const device1 = await cloud.jobs_softupdate_obj.getDevice()
        // const result1 = await cloud.jobs_softupdate_obj.getResult()
        // const update_message1 = await cloud.jobs_softupdate_obj.getMessageUpdate()
        // // await cloud.jobs_softupdate_obj.getLastUpdate()
        // const original_version1 = await cloud.jobs_softupdate_obj.getOriginalVersion()

        // console.log(device1)
        // console.log(result1)
        // console.log(update_message1)
        // // console.log(original_version1)
        
        // // Fetching and asserting the Results

        // expect(device1).toBe(DUT4[0].name)
        // expect(result1).toBe("Completed")
        // expect(update_message1).toBe(`Successfully updated the device version to ${data.image_to_upgrade}`)
        // // expect(original_version1).toBe(data.image_to_upgrade)

        // await page.waitForTimeout(2000)

    })

    test ("5.Test to verify if you can downgrade to an older software - Switch Group - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new SoftwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchgroup)
        await softUpdateFlow.updateDUTSwitchGroup(DUT4[0].name, data.image_to_downgrade, 1)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_downgrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT4[0].name, data.image_to_downgrade, 1, 210000)

        // // Selecting the Switch Group which you want to upgrade

        // await cloud.toolbar_obj.clickSwitchGroupsPage()

        // await page.waitForTimeout(2000)
        // await cloud.switchgroup_obj.clickSwitchGroup(data.switchgroup)
        // await page.waitForTimeout(2000)
        // await cloud.part_switchgroup_obj.clickSwitches()

        // // Choose the Switch which you want to update

        // await page.waitForTimeout(2000)
        // await cloud.switch_group_softupdate.clickCheckSwitch(DUT4[0].name)
        // await cloud.switch_group_softupdate.getSoftwareVersion()

        // // Update the Switch selected

        // await cloud.switch_group_softupdate.clickActions()
        // await cloud.switch_group_softupdate.clickSoftUpdate()
        // await page.waitForTimeout(2000)
        // await cloud.switch_group_softupdate.chooseSoftwareImageForUpdate(data.image_to_downgrade)
        // await cloud.switch_group_softupdate.clickAddSoftwareUpdate()
        
        // await page.waitForTimeout(2000)

        // // Going to the software jobs

        // await cloud.toolbar_obj.clickJobsPage()
        // await cloud.jobs_obj.clickSoftwareUpdate()

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

        // console.log(device)
        // console.log(result)
        // console.log(update_message)
        // // console.log(original_version)

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

        // console.log(device1)
        // console.log(result1)
        // console.log(update_message1)
        // // console.log(original_version1)
        
        // // Fetching and asserting the Results

        // expect(device1).toBe(DUT4[0].name)
        // expect(result1).toBe("Completed")
        // expect(update_message1).toBe(`Successfully updated the device version to ${data.image_to_downgrade}`)
        // // expect(original_version1).toBe(data.image_to_upgrade)

        // await page.waitForTimeout(2000)

    })

    test.only ("6.Test to verify if you can not upgrade/downgrade to the same software - Switch Group - EX3028R-P", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new SoftwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchgroup)
        await softUpdateFlow.updateDUTSwitchGroup(DUT4[0].name, data.image_to_downgrade, 1)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_downgrade)
        await softUpdateFlow.confirmDetails(DUT4[0].name, "Skipped", "Device is already running same version!", 1)

        // // Selecting the Switch Group which you want to upgrade

        // await cloud.toolbar_obj.clickSwitchGroupsPage()

        // await page.waitForTimeout(2000)
        // await cloud.switchgroup_obj.clickSwitchGroup(data.switchgroup)
        // await page.waitForTimeout(2000)
        // await cloud.part_switchgroup_obj.clickSwitches()

        // // Choose the Switch which you want to update

        // await page.waitForTimeout(2000)
        // await cloud.switch_group_softupdate.clickCheckSwitch(DUT4[0].name)
        // await cloud.switch_group_softupdate.getSoftwareVersion()

        // // Update the Switch selected

        // await cloud.switch_group_softupdate.clickActions()
        // await cloud.switch_group_softupdate.clickSoftUpdate()
        // await page.waitForTimeout(2000)
        // await cloud.switch_group_softupdate.chooseSoftwareImageForUpdate(data.image_to_downgrade)
        // await cloud.switch_group_softupdate.clickAddSoftwareUpdate()
        
        // await page.waitForTimeout(2000)

        // // Going to the software jobs

        // await cloud.toolbar_obj.clickJobsPage()
        // await cloud.jobs_obj.clickSoftwareUpdate()

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

        // console.log(device)
        // console.log(result)
        // console.log(update_message)
        // // console.log(original_version)

        // // Fetching and asserting the Results

        // expect(target).toBe(data.image_to_downgrade)
        // expect(device).toBe(DUT4[0].name)
        // expect(result).toBe("Skipped")
        // expect(update_message).toBe("Device is already running same version!")
        // // expect(original_version).toBe(data.image_to_upgrade)

        // await page.waitForTimeout(2000)

    })

    test ("7.Test to verify if you can upgrade muliple switches to a new software - Switch Group", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new SoftwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchgroup)
        await softUpdateFlow.updateAllDUTsSwitchGroup(data.switchgroup, data.image_to_upgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_upgrade)
        await softUpdateFlow.confirmAllUpgradeDowngrade(DUT3[0].name, DUT4[0].name, data.image_to_upgrade, 1, 2, 270000)

        // await cloud.switch_group_softupdate.clickCheckAll()

        // // Update the Switches selected

        // await cloud.switch_group_softupdate.clickActions()
        // await cloud.switch_group_softupdate.clickSoftUpdate()
        // await page.waitForTimeout(2000)
        // await cloud.switch_group_softupdate.chooseSoftwareImageForUpdate(data.image_to_upgrade)
        // await cloud.switch_group_softupdate.clickAddSoftwareUpdate()

        // await page.waitForTimeout(2000)

        // // Going to the software jobs

        // await cloud.toolbar_obj.clickJobsPage()
        // await cloud.jobs_obj.clickSoftwareUpdate()

        // // Waiting for the Job Update

        // await page.waitForTimeout(14000)

        // console.log("######## Getting the information before the update is completed ########")

        // const target = await cloud.jobs_softupdate_obj.getTarget(1)
        // await cloud.jobs_softupdate_obj.clickShowMore(1)

        // console.log(target)

        // const device1 = await cloud.jobs_softupdate_obj.getDevice(1)
        // const result1 = await cloud.jobs_softupdate_obj.getResult(1)
        // const update_message1 = await cloud.jobs_softupdate_obj.getMessageUpdate(1)
        // // await cloud.jobs_softupdate_obj.getLastUpdate(1)
        // const original_version1 = await cloud.jobs_softupdate_obj.getOriginalVersion(1)

        // console.log(device1)
        // console.log(result1)
        // console.log(update_message1)
        // // console.log(original_version1)

        // const device2 = await cloud.jobs_softupdate_obj.getDevice(2)
        // const result2 = await cloud.jobs_softupdate_obj.getResult(2)
        // const update_message2 = await cloud.jobs_softupdate_obj.getMessageUpdate(2)
        // // await cloud.jobs_softupdate_obj.getLastUpdate(1)
        // const original_version2 = await cloud.jobs_softupdate_obj.getOriginalVersion(2)

        // console.log(device2)
        // console.log(result2)
        // console.log(update_message2)
        // // console.log(original_version2)

        // // Fetching and asserting the Results for all DUTs

        // expect(target).toBe(data.image_to_upgrade)

        // expect(device1).toBe(DUT3[0].name)
        // expect(result1).toBe("Initiated")
        // expect(update_message1).toBe("Initiated software update operation")
        // // expect(original_version1).toBe(data.image_to_upgrade)

        // expect(device2).toBe(DUT4[0].name)
        // expect(result2).toBe("Initiated")
        // expect(update_message2).toBe("Initiated software update operation")
        // // expect(original_version2).toBe(data.image_to_upgrade)

        // // Waiting 4 min for the Software Update to be complete

        // await page.waitForTimeout(270000)

        // console.log("######## Getting the information after the update is completed ########")

        // const device3 = await cloud.jobs_softupdate_obj.getDevice(1)
        // const result3 = await cloud.jobs_softupdate_obj.getResult(1)
        // const update_message3 = await cloud.jobs_softupdate_obj.getMessageUpdate(1)
        // // await cloud.jobs_softupdate_obj.getLastUpdate(1)
        // const original_version3 = await cloud.jobs_softupdate_obj.getOriginalVersion(1)

        // console.log(device3)
        // console.log(result3)
        // console.log(update_message3)
        // // console.log(original_version3)

        // const device4 = await cloud.jobs_softupdate_obj.getDevice(2)
        // const result4 = await cloud.jobs_softupdate_obj.getResult(2)
        // const update_message4 = await cloud.jobs_softupdate_obj.getMessageUpdate(2)
        // // await cloud.jobs_softupdate_obj.getLastUpdate(1)
        // const original_version4 = await cloud.jobs_softupdate_obj.getOriginalVersion(2)

        // console.log(device4)
        // console.log(result4)
        // console.log(update_message4)
        // // console.log(original_version4)

        // // Fetching and asserting the Results for all DUTs

        // expect(device3).toBe(DUT3[0].name)
        // expect(result3).toBe("Completed")
        // expect(update_message3).toBe(`Successfully updated the device version to ${data.image_to_upgrade}`)
        // // expect(original_version3).toBe(data.image_to_upgrade)

        // expect(device4).toBe(DUT4[0].name)
        // expect(result4).toBe("Completed")
        // expect(update_message4).toBe(`Successfully updated the device version to ${data.image_to_upgrade}`)
        // // expect(original_version4).toBe(data.image_to_upgrade)

        // await page.waitForTimeout(2000)
    })

    test ("8.Test to verify if you can upgrade muliple switches to an older software - Switch Group", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new SoftwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchgroup)
        await softUpdateFlow.updateAllDUTsSwitchGroup(data.switchgroup, data.image_to_downgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_downgrade)
        await softUpdateFlow.confirmAllUpgradeDowngrade(DUT3[0].name, DUT4[0].name, data.image_to_downgrade, 1, 2, 270000)

        // await cloud.switch_group_softupdate.clickCheckAll()

        // // Update the Switches selected

        // await cloud.switch_group_softupdate.clickActions()
        // await cloud.switch_group_softupdate.clickSoftUpdate()
        // await page.waitForTimeout(2000)
        // await cloud.switch_group_softupdate.chooseSoftwareImageForUpdate(data.image_to_downgrade)
        // await cloud.switch_group_softupdate.clickAddSoftwareUpdate()

        // await page.waitForTimeout(2000)

        // // Going to the software jobs

        // await cloud.toolbar_obj.clickJobsPage()
        // await cloud.jobs_obj.clickSoftwareUpdate()

        // // Waiting for the Job Update

        // await page.waitForTimeout(14000)

        // console.log("######## Getting the information before the update is completed ########")

        // const target = await cloud.jobs_softupdate_obj.getTarget(1)
        // await cloud.jobs_softupdate_obj.clickShowMore(1)

        // console.log(target)

        // const device1 = await cloud.jobs_softupdate_obj.getDevice(1)
        // const result1 = await cloud.jobs_softupdate_obj.getResult(1)
        // const update_message1 = await cloud.jobs_softupdate_obj.getMessageUpdate(1)
        // // await cloud.jobs_softupdate_obj.getLastUpdate(1)
        // const original_version1 = await cloud.jobs_softupdate_obj.getOriginalVersion(1)

        // console.log(device1)
        // console.log(result1)
        // console.log(update_message1)
        // // console.log(original_version1)

        // const device2 = await cloud.jobs_softupdate_obj.getDevice(2)
        // const result2 = await cloud.jobs_softupdate_obj.getResult(2)
        // const update_message2 = await cloud.jobs_softupdate_obj.getMessageUpdate(2)
        // // await cloud.jobs_softupdate_obj.getLastUpdate(1)
        // const original_version2 = await cloud.jobs_softupdate_obj.getOriginalVersion(2)

        // console.log(device2)
        // console.log(result2)
        // console.log(update_message2)
        // // console.log(original_version2)

        // // Fetching and asserting the Results for all DUTs

        // expect(target).toBe(data.image_to_downgrade)

        // expect(device1).toBe(DUT3[0].name)
        // expect(result1).toBe("Initiated")
        // expect(update_message1).toBe("Initiated software update operation")
        // // expect(original_version1).toBe(data.image_to_upgrade)

        // expect(device2).toBe(DUT4[0].name)
        // expect(result2).toBe("Initiated")
        // expect(update_message2).toBe("Initiated software update operation")
        // // expect(original_version2).toBe(data.image_to_upgrade)

        // // Waiting 4 min for the Software Update to be complete

        // await page.waitForTimeout(270000)

        // console.log("######## Getting the information after the update is completed ########")

        // const device3 = await cloud.jobs_softupdate_obj.getDevice(1)
        // const result3 = await cloud.jobs_softupdate_obj.getResult(1)
        // const update_message3 = await cloud.jobs_softupdate_obj.getMessageUpdate(1)
        // // await cloud.jobs_softupdate_obj.getLastUpdate(1)
        // const original_version3 = await cloud.jobs_softupdate_obj.getOriginalVersion(1)

        // console.log(device3)
        // console.log(result3)
        // console.log(update_message3)
        // // console.log(original_version3)

        // const device4 = await cloud.jobs_softupdate_obj.getDevice(2)
        // const result4 = await cloud.jobs_softupdate_obj.getResult(2)
        // const update_message4 = await cloud.jobs_softupdate_obj.getMessageUpdate(2)
        // // await cloud.jobs_softupdate_obj.getLastUpdate(1)
        // const original_version4 = await cloud.jobs_softupdate_obj.getOriginalVersion(2)

        // console.log(device4)
        // console.log(result4)
        // console.log(update_message4)
        // // console.log(original_version4)

        // // Fetching and asserting the Results for all DUTs

        // expect(device3).toBe(DUT3[0].name)
        // expect(result3).toBe("Completed")
        // expect(update_message3).toBe(`Successfully updated the device version to ${data.image_to_downgrade}`)
        // // expect(original_version3).toBe(data.image_to_upgrade)

        // expect(device4).toBe(DUT4[0].name)
        // expect(result4).toBe("Completed")
        // expect(update_message4).toBe(`Successfully updated the device version to ${data.image_to_downgrade}`)
        // // expect(original_version4).toBe(data.image_to_upgrade)

        // await page.waitForTimeout(2000)
    })

    test.only ("9.Test to verify if you can can not upgrade/downgrade to the same software if all DUTs have the same software - Switch Group", async({page,baseURL}) => {

        const cloud = new CloudObjects(page)
        const softUpdateFlow = new SoftwareUpdateFlow(page)

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchgroup)
        await softUpdateFlow.updateAllDUTsSwitchGroup(data.switchgroup, data.image_to_upgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.image_to_upgrade)
        await softUpdateFlow.confirmDetails(DUT3[0].name, "Skipped", "Device is already running same version!", 1)
        await softUpdateFlow.confirmDetails(DUT4[0].name, "Skipped", "Device is already running same version!", 2)

        // await cloud.switch_group_softupdate.clickCheckAll()

        // // Update the Switches selected

        // await cloud.switch_group_softupdate.clickActions()
        // await cloud.switch_group_softupdate.clickSoftUpdate()
        // await page.waitForTimeout(2000)
        // await cloud.switch_group_softupdate.chooseSoftwareImageForUpdate(data.image_to_downgrade)
        // await cloud.switch_group_softupdate.clickAddSoftwareUpdate()

        // await page.waitForTimeout(2000)

        // // Going to the software jobs

        // await cloud.toolbar_obj.clickJobsPage()
        // await cloud.jobs_obj.clickSoftwareUpdate()

        // // Waiting for the Job Update

        // await page.waitForTimeout(15000)

        // console.log("######## Getting the information before the update is completed ########")

        // const target = await cloud.jobs_softupdate_obj.getTarget(1)
        // await cloud.jobs_softupdate_obj.clickShowMore(1)

        // console.log(target)

        // const device1 = await cloud.jobs_softupdate_obj.getDevice(1)
        // const result1 = await cloud.jobs_softupdate_obj.getResult(1)
        // const update_message1 = await cloud.jobs_softupdate_obj.getMessageUpdate(1)
        // // await cloud.jobs_softupdate_obj.getLastUpdate(1)
        // const original_version1 = await cloud.jobs_softupdate_obj.getOriginalVersion(1)

        // console.log(device1)
        // console.log(result1)
        // console.log(update_message1)
        // // console.log(original_version1)

        // const device2 = await cloud.jobs_softupdate_obj.getDevice(2)
        // const result2 = await cloud.jobs_softupdate_obj.getResult(2)
        // const update_message2 = await cloud.jobs_softupdate_obj.getMessageUpdate(2)
        // // await cloud.jobs_softupdate_obj.getLastUpdate(1)
        // const original_version2 = await cloud.jobs_softupdate_obj.getOriginalVersion(2)

        // console.log(device2)
        // console.log(result2)
        // console.log(update_message2)
        // // console.log(original_version2)

        // // Fetching and asserting the Results for all DUTs

        // expect(target).toBe(data.image_to_downgrade)

        // expect(device1).toBe(DUT3[0].name)
        // expect(result1).toBe("Skipped")
        // expect(update_message1).toBe("Device is already running same version!")
        // // expect(original_version1).toBe(data.image_to_upgrade)

        // expect(device2).toBe(DUT4[0].name)
        // expect(result2).toBe("Skipped")
        // expect(update_message2).toBe("Device is already running same version!")
        // // expect(original_version2).toBe(data.image_to_upgrade)

        // await page.waitForTimeout(2000)
    })

})

