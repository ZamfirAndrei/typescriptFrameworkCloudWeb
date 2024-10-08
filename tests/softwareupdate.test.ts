import { test, expect} from "@playwright/test";
import * as data from "../constants/constants.json"

import { SoftwareUpdateFlow } from "../flows/softwareUpdateFlow";
import { CloudObjects } from "../management/cloudObjects";
import { DUTs, DUT1, DUT2, DUT3, DUT4, DUT5 } from "../constants/duts";
import { messageUpdate, resultUpdate } from "../constants/mocks";


test.describe("SoftwareUpdate ->", async() => {

    let cloud : CloudObjects
    let softUpdateFlow : SoftwareUpdateFlow

    test.beforeEach(async ({page, baseURL}) => {

        cloud = new CloudObjects(page)
        softUpdateFlow = new SoftwareUpdateFlow(page)

        await cloud.page.goto(`${baseURL}`)
        await cloud.loginObj.login(data.user, data.password)
        // await cloud.loginObj.selectAccount(data.account2)
        await cloud.loginObj.selectAccount(data.account1)
        await cloud.page.waitForLoadState()
        await cloud.page.waitForTimeout(2000)
    })

    test ("1.Test to verify if you can upgrade to a new software - Particular Switch", async({page,baseURL}) => {

        await softUpdateFlow.searchAndSelectDUT(DUT3[0].name)
        await softUpdateFlow.updateDUT(data.imageToUpgrade, 1)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.imageToUpgrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT3[0].name, data.imageToUpgrade)

    })

    test ("2.Test to verify if you can downgrade to an older software - Particular Switch", async({page,baseURL}) => {

        await softUpdateFlow.searchAndSelectDUT(DUT3[0].name)
        await softUpdateFlow.updateDUT(data.imageToDowngrade, 1)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.imageToDowngrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT3[0].name, data.imageToDowngrade)

    })

    test ("3.Test to verify if you can not upgrade/downgrade to the same software - Particular Switch", async({page,baseURL}) => {

        await softUpdateFlow.searchAndSelectDUT(DUT3[0].name)
        await softUpdateFlow.updateDUT(data.imageToDowngrade, 1)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.imageToDowngrade)
        await softUpdateFlow.confirmDetails(DUT3[0].name, DUT3[0].name, resultUpdate[0].Skipped, messageUpdate[0].RunningSameVersion)

    })

    test ("4.Test to verify if you can upgrade to a new software - Switch Group", async({page,baseURL}) => {

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchGroup)
        await softUpdateFlow.updateDUTSwitchGroup(DUT3[0].name, data.imageToUpgrade, 1)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.imageToUpgrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT3[0].name, data.imageToUpgrade)

    })

    test ("5.Test to verify if you can downgrade to an older software - Switch Group", async({page,baseURL}) => {

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchGroup)
        await softUpdateFlow.updateDUTSwitchGroup(DUT3[0].name, data.imageToDowngrade, 1)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.imageToDowngrade)
        await softUpdateFlow.confirmUpgradeDowngrade(DUT3[0].name, data.imageToDowngrade)

    })

    test ("6.Test to verify if you can not upgrade/downgrade to the same software - Switch Group", async({page,baseURL}) => {

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchGroup)
        await softUpdateFlow.updateDUTSwitchGroup(DUT3[0].name, data.imageToDowngrade, 1)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.imageToDowngrade)
        await softUpdateFlow.confirmDetails(DUT3[0].name, DUT1[0].name, resultUpdate[0].Skipped, messageUpdate[0].RunningSameVersion)

    })

    test ("7.Test to verify if you can upgrade multiple switches to a new software - Switch Group - 2 DUTs", async({page,baseURL}) => {

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchGroup)
        await softUpdateFlow.updateAllDUTsSwitchGroup(1, data.imageToUpgrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.imageToUpgrade)
        await softUpdateFlow.confirmAllUpgradeDowngrade(DUT1[0].name, DUT2[0].name, data.imageToUpgrade)

    })

    test.only ("8.Test to verify if you can upgrade multiple switches to an older software - Switch Group - 2 DUTs", async({page,baseURL}) => {

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchGroup)
        await softUpdateFlow.updateAllDUTsSwitchGroup(1, data.imageToDowngrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.imageToDowngrade)
        await softUpdateFlow.confirmAllUpgradeDowngrade(DUT1[0].name, DUT2[0].name, data.imageToDowngrade)

    })

    test ("9.Test to verify if you can can not upgrade/downgrade to the same software if all DUTs have the same software - Switch Group - 2 DUTs", async({page,baseURL}) => {

        await softUpdateFlow.searchAndSelectSwitchGroup(data.switchGroup)
        await softUpdateFlow.updateAllDUTsSwitchGroup(1, data.imageToDowngrade)
        await softUpdateFlow.confirmTargetAndClickShowMore(1, data.imageToDowngrade)
        await softUpdateFlow.confirmDetailsForMoreSwitches([DUT1[0].name, DUT3[0].name], [DUT1[0].name, DUT3[0].name],
            [resultUpdate[0].Skipped,  
             resultUpdate[0].Skipped],
            [messageUpdate[0].RunningSameVersion,
             messageUpdate[0].RunningSameVersion])

    })

    test ("x.Test to verify if you can not upgrade/downgrade to the same software - Particular Switch - EX3028R-P", async({page,baseURL}) => {

        // const cloud = new CloudObjects(page)
        // const softUpdateFlow = new SoftwareUpdateFlow(page)

        // await softUpdateFlow.searchAndSelectDUT(DUT3[0].name)
        // await softUpdateFlow.updateDUT(data.imageToUpgrade, 1)
        // console.log("##############################")
        // const target = await cloud.jobsSoftupdateObj.getTarget(1)
        // const status = await cloud.jobsSoftupdateObj.getStatus(1)
        // const details = await cloud.jobsSoftupdateObj.getDetails(1)
        // const createdby = await cloud.jobsSoftupdateObj.getCreatedBy(1)
        // const createdon = await cloud.jobsSoftupdateObj.getCreatedOn(1)
        // const completedon = await cloud.jobsSoftupdateObj.getCompletedOn(1)
        // const imageType = await cloud.jobsSoftupdateObj.getImageType(1)

        // console.log(details?.trim())
        // console.log(imageType?.trim())
        // console.log(createdby?.trim())
        // console.log(createdon?.trim())
        // console.log(completedon?.trim())
        // console.log(target?.trim())
        // console.log(status?.split(":")[0])

        // await cloud.jobsSoftupdateObj.clickShowMoree(1)
        // console.log("##############################")
        // const name = await cloud.jobsSoftupdateObj.getDeviceName(DUT3[0].name)
        // const result = await cloud.jobsSoftupdateObj.getResult(DUT3[0].name)
        // const message = await cloud.jobsSoftupdateObj.getMessageUpdate(DUT3[0].name)
        // const lastUpdated = await cloud.jobsSoftupdateObj.getLastUpdate(DUT3[0].name)
        // const originalVersion = await cloud.jobsSoftupdateObj.getOriginalVersion(DUT3[0].name)

        // console.log(name?.trim())
        // console.log(result?.trim())
        // console.log(message?.trim())
        // console.log(lastUpdated?.trim())
        // console.log(originalVersion?.trim())

        // await page.waitForTimeout(2000)
        // await softUpdateFlow.confirmTargetAndClickShowMore(1, data.imageToUpgrade)
        // await softUpdateFlow.confirmDetails(DUT3[0].name, "Skipped", "Device is already running same version!", 1)

    })

})

