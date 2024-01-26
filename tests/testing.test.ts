import { test, expect} from "@playwright/test";
import loginPage from "../pages/loginPage";
import homePage from "../pages/homePage";
import devicePage from "../pages/devicesPage";
import toolbarPage from "../pages/toolbarPage";
import switchgroupPage from "../pages/SwitchGroupPage";
// import addswitchgroupPage from "../pages/addswitchgroupPage";
import {  addswitchgroupPage, BasicPage, ManagementPage, NetworkPage } from "../pages/addswitchgroupPage";
import { ParticularDevicePage, ConfigurationPage, SoftwareUpdatePage,ToolsPage } from "../pages/particularDevicePage";
import { ParticularSwitchGroupPage, SwitchPortsPage, PortPage, PhysicalPortPage, NetworkPortPage, StatisticsPage, SoftwareUpgrade} from "../pages/particularSwitchGroupPage";

import * as data from "../constants/constants.json"
import { JobsPage, ConfigurationUpdatePage, JobsSoftwareUpdatePage } from "../pages/jobsPage";
import { OnBoardPage } from "../pages/onboardPage";
import { CloudObjects } from "../management/cloudObjects";

// const user = "andreigabriel.zamfir@dxc.com"
// const password = "Solotov1998."
// const account1 = "LUXOFT301SRV4"
// const account2 = "QA_USSRV3_LUXOFT"

test("Testing logging", async({page,baseURL})=>{

    const login_obj = new loginPage(page)
    const home_obj = new homePage(page)
    const device_obj = new devicePage(page)
    const toolbar_obj = new toolbarPage(page)

    await page.goto(`${baseURL}`)
    await login_obj.login(data.user, data.password)
    await login_obj.selectAccount(data.account2)

    await home_obj.getNumberOfDevices()
    await home_obj.getNumberOfDevicesOffline()
    await home_obj.getNumberOfDevicesOnboarding()
    
    console.log("#############################")
    await home_obj.getMajorAlarms()
    await home_obj.getMinorAlarms()
    await home_obj.getCriticalAlarms()
    await home_obj.getSwitchGroupsNumber()
    console.log("#############################")

    // await page.locator('[title="Devices"]').click()
    await toolbar_obj.clickDevicePage()
    await toolbar_obj.clickHomePage()
    await toolbar_obj.clickSwitchGroupsPage()
    await toolbar_obj.clickDevicePage()
   
    await device_obj.clickSwitches()
    await device_obj.searchToolbar("Andrei")
    await device_obj.numberOfDevicesFound()
    await device_obj.getDeviceName(1)
    await device_obj.getDeviceMac(1)
    

    await page.waitForTimeout(3000)

   
})


test ("Searching for a switch group", async({page,baseURL})=>{

    const login_obj = new loginPage(page)
    const home_obj = new homePage(page)
    const device_obj = new devicePage(page)
    const toolbar_obj = new toolbarPage(page)
    const switchgroup_obj = new switchgroupPage(page)

    await page.goto(`${baseURL}`)
    await login_obj.login(data.user, data.password)
    await login_obj.selectAccount(data.account2)

    await toolbar_obj.clickSwitchGroupsPage()
    // await switchgroup_obj.searchSwitchGroup("5.1")
    await switchgroup_obj.getNrOfSwitchGroups()

    await switchgroup_obj.getSwitchGroupName(1)
    
    console.log("#############################");

    // await switchgroup_obj.getSwitchGroupNrOfflineSwitches(1)
    await switchgroup_obj.getSwitchGroupNrOfSwitches(2)
    await switchgroup_obj.getSwitchGroupNrOfflineSwitches(2)
    await switchgroup_obj.getNrOfPorts(1)
    await switchgroup_obj.getNrOfVLANs(1)
    await switchgroup_obj.getNrOfVLANs(3)
    await switchgroup_obj.getAutoSync(1)
    await switchgroup_obj.getAutoSync(2)

    await switchgroup_obj.deleteSwitchGroup(1, "Yes")
    

    await page.waitForTimeout(3000)

})

test ("Creating a switch group", async({page,baseURL})=>{

    const login_obj = new loginPage(page)
    const toolbar_obj = new toolbarPage(page)
    const switchgroup_obj = new switchgroupPage(page)
    const addswitchgroup_obj = new addswitchgroupPage(page)
    const basic_obj = new BasicPage(page)
    const mngm_obj = new ManagementPage(page)
    const network_obj = new NetworkPage(page)

    await page.goto(`${baseURL}`)
    await login_obj.login(data.user, data.password)
    await login_obj.selectAccount(data.account2)

    await toolbar_obj.clickSwitchGroupsPage()
    await switchgroup_obj.clickAddSwitchGroup()
    
    await basic_obj.addNameSwitchGroup("TypeScript1234")
    await basic_obj.checkAutoSync("No")
    await basic_obj.addDescription("TEST")

    await addswitchgroup_obj.clickManagement()
    await mngm_obj.checkTelnet("Yes")
    await mngm_obj.checkHTTP("No")
    await mngm_obj.checkSSH("Yes")
    await mngm_obj.clickAdminEdit()
    await mngm_obj.addPasswordAdmin("Admin1234!")
    await mngm_obj.confirmPasswordAdmin("Admin1234!")
    await mngm_obj.clickUpdatePassword()

    await mngm_obj.clickGuestEdit()
    await mngm_obj.addPasswordGuest("Guest1234!")
    await mngm_obj.confirmPasswordGuest("Guest1234!")
    await mngm_obj.clickUpdatePassword()

    await addswitchgroup_obj.clickSave()
    const message = await page.locator('[id="cns-toaster-msg"]').textContent()
    console.log(message)
    expect(message).toContain("Switch Group is created successfully")
    // expect(message).toContain("The specified profile name already exists")
    await addswitchgroup_obj.clickNetwork()
    await addswitchgroup_obj.ShowAdvancedButton("Yes") // Nu reusesc cu butonul asta!
   
    await network_obj.addVlan("10","zece")
    // await addswitchgroup_obj.ShowAdvancedButton("No")
    await network_obj.addSpanningTree("MSTP")
    await network_obj.enableSTP("Yes")
    await network_obj.choosePathCost("short")
    await network_obj.addSpanningTree("RSTP")
    await network_obj.choosePathCost("long")
    await network_obj.configureStpPriority("16384")

    await addswitchgroup_obj.clickSave()
    const message_save = await page.locator('[id="cns-toaster-msg"]').textContent()
    console.log(message_save)
    expect(message_save).toContain("Switch Group is saved successfully")

    await page.waitForTimeout(5000)

})

test ("Checking the configuration for a Device", async({page,baseURL})=>{

    const login_obj = new loginPage(page)
    const toolbar_obj = new toolbarPage(page)
    const switchgroup_obj = new switchgroupPage(page)
    const addswitchgroup_obj = new addswitchgroupPage(page)
    const basic_obj = new BasicPage(page)
    const mngm_obj = new ManagementPage(page)
    const network_obj = new NetworkPage(page)
    const part_device = new ParticularDevicePage(page)
    const device_obj = new devicePage(page)
    const conf_obj = new ConfigurationPage(page)
    

    await page.goto(`${baseURL}`)
    await login_obj.login(data.user, data.password)
    await login_obj.selectAccount(data.account2)

    // Going to Switches Devices

    await toolbar_obj.clickDevicePage()
    await device_obj.clickSwitches()
    await page.waitForTimeout(3000)
    await device_obj.clickDevice("Andrei-2028")

    // Playing around with the methods of particularDevicePage

    // await part_device.clickNotification()
    // await page.waitForTimeout(1500)
    await part_device.clickConfiguration()
    // await page.waitForTimeout(1500)
    // await part_device.clickDetails()
    // await page.waitForTimeout(1500)
    // await part_device.clickPerformance()
    // await page.waitForTimeout(1500)
    // await part_device.clickSoftwareUpgrade()
    // await page.waitForTimeout(1500)
    // await part_device.clickTools()
    // await page.waitForTimeout(1500)
    // await part_device.clickDashboard()
    // await page.waitForTimeout(2000)
    // await conf_obj.selectSwitchGroup("5.1")
    // await page.waitForTimeout(1000)
    // await conf_obj.clickApplyConfiguration()

    await page.waitForTimeout(10000)
    await conf_obj.getSyncStatusDevice()
    await conf_obj.getIpAddressDevice()
    await conf_obj.getMacAddressDevice()
    await conf_obj.getSerialNumberDevice()

})

test ("Software Update", async({page,baseURL})=>{

    const login_obj = new loginPage(page)
    const toolbar_obj = new toolbarPage(page)
    const switchgroup_obj = new switchgroupPage(page)
    const addswitchgroup_obj = new addswitchgroupPage(page)
    const basic_obj = new BasicPage(page)
    const mngm_obj = new ManagementPage(page)
    const network_obj = new NetworkPage(page)
    const part_device = new ParticularDevicePage(page)
    const device_obj = new devicePage(page)
    const conf_obj = new ConfigurationPage(page)
    const soft_update = new SoftwareUpdatePage(page)

    await page.goto(`${baseURL}`)
    await login_obj.login(data.user, data.password)
    await login_obj.selectAccount(data.account2)

    // Going to Switches Devices

    await toolbar_obj.clickDevicePage()
    await device_obj.clickSwitches()
    await page.waitForTimeout(3000)
    await device_obj.clickDevice("Andrei-2028")

    // Playing around with the methods of particularDevicePage

    // await part_device.clickNotification()
    // await page.waitForTimeout(1500)
    // await part_device.clickConfiguration()
    // await page.waitForTimeout(1500)
    // await part_device.clickDetails()
    // await page.waitForTimeout(1500)
    // await part_device.clickPerformance()
    await page.waitForTimeout(1500)
    await part_device.clickSoftwareUpgrade()
    // await page.waitForTimeout(1500)
    // await part_device.clickTools()
    // await page.waitForTimeout(1500)
    // await part_device.clickDashboard()
    // await page.waitForTimeout(2000)
    // await conf_obj.selectSwitchGroup("5.1")
    // await page.waitForTimeout(1000)
    // await conf_obj.clickApplyConfiguration()

    // await page.waitForTimeout(10000)
    await soft_update.selectImgForUpdate("5.0.1-r3")
    await soft_update.expandJobOptions()
    await soft_update.checkDisableAutoReboot("No")
    // await soft_update.addSoftwareJob()
    await soft_update.clickViewUpdateJobs()

    await page.waitForTimeout(5000)
})

test("Tools CLI", async({page,baseURL})=>{

    const login_obj = new loginPage(page)
    const toolbar_obj = new toolbarPage(page)
    const switchgroup_obj = new switchgroupPage(page)
    const addswitchgroup_obj = new addswitchgroupPage(page)
    const basic_obj = new BasicPage(page)
    const mngm_obj = new ManagementPage(page)
    const network_obj = new NetworkPage(page)
    const part_device = new ParticularDevicePage(page)
    const device_obj = new devicePage(page)
    const conf_obj = new ConfigurationPage(page)
    const soft_update = new SoftwareUpdatePage(page)
    const tools_obj = new ToolsPage(page)

    await page.goto(`${baseURL}`)
    await login_obj.login(data.user, data.password)
    await login_obj.selectAccount(data.account2)

    // Going to Switches Devices

    await toolbar_obj.clickDevicePage()
    await device_obj.clickSwitches()
    await page.waitForTimeout(3000)
    await device_obj.clickDevice("Andrei-2028")

    // Playing around with the methods of particularDevicePage

    // await part_device.clickNotification()
    // await page.waitForTimeout(1500)
    // await part_device.clickConfiguration()
    // await page.waitForTimeout(1500)
    // await part_device.clickDetails()
    // await page.waitForTimeout(1500)
    // await part_device.clickPerformance()
    // await page.waitForTimeout(1500)
    // await part_device.clickSoftwareUpgrade()
    await page.waitForTimeout(1500)
    await part_device.clickTools()
    // await page.waitForTimeout(1500)
    // await part_device.clickDashboard()
    // await page.waitForTimeout(2000)
    // await conf_obj.selectSwitchGroup("5.1")
    // await page.waitForTimeout(1000)
    // await conf_obj.clickApplyConfiguration()

    await tools_obj.clickRemoteCLI()
    // await page.waitForTimeout(1000)
    // await tools_obj.clickNewtorkConnectivity()
    // await page.waitForTimeout(1000)
    // await tools_obj.clickStatus()
    // await page.waitForTimeout(1000)
    // await tools_obj.clickRemoteCLI()
    await page.waitForTimeout(1000)
    await tools_obj.typeCommandCLI("show vlan ascending")
    await page.waitForTimeout(5000)
    await tools_obj.getOutputFromCommand()

    await page.waitForTimeout(5000)
})

test ("Particular Switch Group and Switch Port", async({page,baseURL})=>{

    const login_obj = new loginPage(page)
    const toolbar_obj = new toolbarPage(page)
    const switchgroup_obj = new switchgroupPage(page)
    const addswitchgroup_obj = new addswitchgroupPage(page)
    const basic_obj = new BasicPage(page)
    const mngm_obj = new ManagementPage(page)
    const network_obj = new NetworkPage(page)
    const part_device = new ParticularDevicePage(page)
    const device_obj = new devicePage(page)
    const conf_obj = new ConfigurationPage(page)
    const soft_update = new SoftwareUpdatePage(page)
    const tools_obj = new ToolsPage(page)
    const part_switchgroup_obj = new ParticularSwitchGroupPage(page)
    const switchports_obj = new SwitchPortsPage(page) 
    const port_obj = new PortPage(page)
    const basic_port_obj = new PhysicalPortPage(page)
    const network_port_obj = new NetworkPortPage(page)

    await page.goto(`${baseURL}`)
    await login_obj.login(data.user, data.password)
    await login_obj.selectAccount(data.account2)

    // Going to Switch Groups

    await toolbar_obj.clickSwitchGroupsPage()
    await page.waitForTimeout(2000)
    await switchgroup_obj.clickSwitchGroup("5.1")

    await page.waitForTimeout(1000)
    
    // await part_switchgroup_obj.clickDashboard()
    // await page.waitForTimeout(1000)
    // await part_switchgroup_obj.clickNotification()
    // await page.waitForTimeout(1000)

    // Going to Switch Ports Menu

    await part_switchgroup_obj.clickSwitchPorts()
    await page.waitForTimeout(1000)
    // await part_switchgroup_obj.clickStatistics()
    // await page.waitForTimeout(1000)
    // await part_switchgroup_obj.clickSwitches()
    // await page.waitForTimeout(1000)
    // await part_switchgroup_obj.clickConfiguration()
    // await toolbar_obj.clickSwitchGroupsPage()
    // await switchgroup_obj.clickAddSwitchGroup()
    // await addswitchgroup_obj.clickManagement()
    // await page.waitForTimeout(1000)
    // await switchports_obj.clickStatistics()
    // await page.waitForTimeout(1000)
    // await switchports_obj.clickConfiguration()
    // await page.waitForTimeout(1000)
    // await switchports_obj.clickNetwork()
    // await page.waitForTimeout(1000)
    // await switchports_obj.clickPhysical()
    // await page.waitForTimeout(1000)
    // await switchports_obj.clickSecurity()
    // await page.waitForTimeout(1000)
    // await switchports_obj.clickGeneral()
    
    // await switchports_obj.getAdministrativeState("Gi0/4","Andrei-2028")
    // await switchports_obj.getOperationalState("Gi0/4","Andrei-2028")
    // await page.waitForTimeout(1000)
    // await switchports_obj.getType("Gi0/4","Andrei-2028")
    // await switchports_obj.getVLANs("Gi0/4","Andrei-2028")
    // await switchports_obj.getVLANs("Gi0/4","Andrei-2010")
    // await switchports_obj.getNativeVlan("Gi0/4","Andrei-2028")
    // await switchports_obj.getNativeVlan("Gi0/4","Andrei-2010")
    await switchports_obj.searchForPort("Gi0/5","Andrei-2028")
    // await port_obj.clickPhysical()
    // await basic_port_obj.changeAdministrativeStatePort("Disable")
    // await basic_port_obj.changeSpeedPort("10Mbps")
    // await port_obj.saveConfig()
    
    // const message = page.locator('[id="cns-toaster-msg"]').textContent()
    // console.log(await message)
    // expect(await message).toContain('Port Configuration updated successfully')
    // await port_obj.clickNetwork()
    // await page.waitForTimeout(1000)
    // await port_obj.clickPhysical()
    // await page.waitForTimeout(1000)
    // await port_obj.clickSecurity()
    // await page.waitForTimeout(1000)
    await port_obj.clickNetwork()
    // await network_port_obj.changeTypePort("Access")
    await page.waitForTimeout(1000)
    // await network_port_obj.checkAvailableVlans()
    // await network_port_obj.selectStatusSTP("Disable")
    // await page.waitForTimeout(1000)
    // await network_port_obj.selectStatusSTP("Enable")
    // await page.waitForTimeout(1000)
    // await network_port_obj.selectStatusBPDUGuard("Enable")
    // await page.waitForTimeout(1000)
    // await network_port_obj.selectStatusBPDUGuard("Disable")
    // await page.waitForTimeout(1000)
    // await network_port_obj.selectStatusPortFast("Enable")
    // await page.waitForTimeout(1000)
    // await network_port_obj.selectStatusPortFast("Disable")
    // await network_port_obj.selectStatusSTP("Gigi")
    // await network_port_obj.selectStatusBPDUGuard("Gigi")
    // await network_port_obj.selectStatusPortFast("Gigi")
    await network_port_obj.insertVlan("1,15,20")
    await port_obj.saveConfig()
    // await network_port_obj.insertNativeVlans("10")
    // await network_port_obj.checkTagged("Yes")
    await page.waitForTimeout(2000)
    await network_port_obj.configurePriorityVLAN("15", "32")
    await network_port_obj.configureStatusSTPVLAN("15", "Disable")
    
    await page.waitForTimeout(5000)
})

test ("Particular Switch Group and Statistics", async({page,baseURL})=>{

    const login_obj = new loginPage(page)
    const toolbar_obj = new toolbarPage(page)
    const switchgroup_obj = new switchgroupPage(page)
    const addswitchgroup_obj = new addswitchgroupPage(page)
    const basic_obj = new BasicPage(page)
    const mngm_obj = new ManagementPage(page)
    const network_obj = new NetworkPage(page)
    const part_device = new ParticularDevicePage(page)
    const device_obj = new devicePage(page)
    const conf_obj = new ConfigurationPage(page)
    const soft_update = new SoftwareUpdatePage(page)
    const tools_obj = new ToolsPage(page)
    const part_switchgroup_obj = new ParticularSwitchGroupPage(page)
    const switchports_obj = new SwitchPortsPage(page) 
    const port_obj = new PortPage(page)
    const basic_port_obj = new PhysicalPortPage(page)
    const network_port_obj = new NetworkPortPage(page)
    const statistics_obj = new StatisticsPage(page)

    await page.goto(`${baseURL}`)
    await login_obj.login(data.user, data.password)
    await login_obj.selectAccount(data.account2)

    // Going to Switch Groups

    await toolbar_obj.clickSwitchGroupsPage()
    await page.waitForTimeout(2000)
    await switchgroup_obj.clickSwitchGroup("5.1")

    // Going to Switch Ports Menu

    await page.waitForTimeout(1000)

    await part_switchgroup_obj.clickSwitchPorts()
    await page.waitForTimeout(1000)

    await switchports_obj.clickStatistics()
    await page.waitForTimeout(1000)

    await statistics_obj.getRow(1)
    await statistics_obj.getPortId(1)
    await statistics_obj.getTotalRxPackets(1)
    await statistics_obj.getPortDescription(1)
    await statistics_obj.getPortLinkTransitions(1)
    await statistics_obj.getSwitchNameOfPort(1)
    await statistics_obj.getTotalTxPackets(1)

})

test ("Edit Switch Group", async({page,baseURL})=>{

    const login_obj = new loginPage(page)
    const toolbar_obj = new toolbarPage(page)
    const switchgroup_obj = new switchgroupPage(page)
    const addswitchgroup_obj = new addswitchgroupPage(page)
    const basic_obj = new BasicPage(page)
    const mngm_obj = new ManagementPage(page)
    const network_obj = new NetworkPage(page)
    const part_device = new ParticularDevicePage(page)
    const device_obj = new devicePage(page)
    const conf_obj = new ConfigurationPage(page)
    const soft_update = new SoftwareUpdatePage(page)
    const tools_obj = new ToolsPage(page)
    const part_switchgroup_obj = new ParticularSwitchGroupPage(page)
    const switchports_obj = new SwitchPortsPage(page) 
    const port_obj = new PortPage(page)
    const basic_port_obj = new PhysicalPortPage(page)
    const network_port_obj = new NetworkPortPage(page)
    const statistics_obj = new StatisticsPage(page)

    await page.goto(`${baseURL}`)
    await login_obj.login(data.user, data.password)
    await login_obj.selectAccount(data.account2)

    // Going to Switch Groups

    await toolbar_obj.clickSwitchGroupsPage()
    await page.waitForTimeout(2000)
    await switchgroup_obj.editSwitchGroup("5.1")
    await page.waitForTimeout(2000)
})

test ("Clicking Jobs Page", async({page,baseURL})=>{

    const login_obj = new loginPage(page)
    const toolbar_obj = new toolbarPage(page)
    const switchgroup_obj = new switchgroupPage(page)
    const addswitchgroup_obj = new addswitchgroupPage(page)
    const basic_obj = new BasicPage(page)
    const mngm_obj = new ManagementPage(page)
    const network_obj = new NetworkPage(page)
    const part_device = new ParticularDevicePage(page)
    const device_obj = new devicePage(page)
    const conf_obj = new ConfigurationPage(page)
    const soft_update = new SoftwareUpdatePage(page)
    const tools_obj = new ToolsPage(page)
    const part_switchgroup_obj = new ParticularSwitchGroupPage(page)
    const switchports_obj = new SwitchPortsPage(page) 
    const port_obj = new PortPage(page)
    const basic_port_obj = new PhysicalPortPage(page)
    const network_port_obj = new NetworkPortPage(page)
    const statistics_obj = new StatisticsPage(page)
    const jobs_obj = new JobsPage(page)
    const config_obj = new ConfigurationUpdatePage(page)
    const jobs_softupdate_obj = new JobsSoftwareUpdatePage(page)

    await page.goto(`${baseURL}`)
    await login_obj.login(data.user, data.password)
    await login_obj.selectAccount(data.account2)

    // Hover Administration and clicking Jobs

    await page.waitForTimeout(4000)
    await page.locator('[title="Administration"]').hover()
    await page.locator('[cns-auto="Nav-Jobs"]').click()

    await page.waitForTimeout(2000)
    await jobs_obj.clickSoftwareUpdate()
    // await page.waitForTimeout(1000)
    // await jobs_obj.clickReports()
    // await page.waitForTimeout(1000)
    // await jobs_obj.clickActions()
    // await page.waitForTimeout(1000)
    // await jobs_obj.clickConfigurationUpdate()

    // Configuration Update Page of Jobs Page

    // await config_obj.getId(5)
    // await config_obj.getDetails(5)
    // await config_obj.getTarget(5)
    // await config_obj.getCreatedBy(5)
    // await config_obj.getCreatedOn(5)
    // await config_obj.getCompletedOn(5)
    // await config_obj.getStatus(5)
    // await config_obj.clickShowMore(5)
    // await page.waitForTimeout(2000)
    // await config_obj.getMessageUpdate()
    // await config_obj.getDevice()

    // Software Update Page of Jobs Page

    await jobs_softupdate_obj.getId(1)
    await jobs_softupdate_obj.getDetails(1)
    await jobs_softupdate_obj.getTarget(1)
    await jobs_softupdate_obj.getCreatedBy(1)
    await jobs_softupdate_obj.getCreatedOn(1)
    await jobs_softupdate_obj.getCompletedOn(1)
    await jobs_softupdate_obj.getStatus(1)
    await jobs_softupdate_obj.clickShowMore(1)
    await jobs_softupdate_obj.getMessageUpdate(1)
    await jobs_softupdate_obj.getLastUpdate(1)
    await jobs_softupdate_obj.getOriginalVersion(1)

    
    await page.waitForTimeout(2000)
})

test ("Onboarding a Device", async({page,baseURL})=>{

    const login_obj = new loginPage(page)
    const toolbar_obj = new toolbarPage(page)
    const switchgroup_obj = new switchgroupPage(page)
    const addswitchgroup_obj = new addswitchgroupPage(page)
    const basic_obj = new BasicPage(page)
    const mngm_obj = new ManagementPage(page)
    const network_obj = new NetworkPage(page)
    const part_device = new ParticularDevicePage(page)
    const device_obj = new devicePage(page)
    const conf_obj = new ConfigurationPage(page)
    const soft_update = new SoftwareUpdatePage(page)
    const tools_obj = new ToolsPage(page)
    const part_switchgroup_obj = new ParticularSwitchGroupPage(page)
    const switchports_obj = new SwitchPortsPage(page) 
    const port_obj = new PortPage(page)
    const basic_port_obj = new PhysicalPortPage(page)
    const network_port_obj = new NetworkPortPage(page)
    const statistics_obj = new StatisticsPage(page)
    const jobs_obj = new JobsPage(page)
    const config_obj = new ConfigurationUpdatePage(page)
    const jobs_softupdate_obj = new JobsSoftwareUpdatePage(page)
    const onboard_obj = new OnBoardPage(page)

    await page.goto(`${baseURL}`)
    await login_obj.login(data.user, data.password)
    await login_obj.selectAccount(data.account2)

    // Click OnBoardPage

    await toolbar_obj.clickOnBoardPage()
    await page.waitForTimeout(1500)
    // await onboard_obj.claimDevice("XLZB046BTR3B")
    // await onboard_obj.closeClaimDevice()
    // await onboard_obj.backClaimDevice()
    // await onboard_obj.editDevice(1)
    // await onboard_obj.deleteDevice(1,"Yes")
    await onboard_obj.approveDevice(1)
    
    await page.waitForTimeout(2000)
})

test ("Deleting device from Cloud", async({page,baseURL})=>{

    // const login_obj = new loginPage(page)
    // const toolbar_obj = new toolbarPage(page)
    // const switchgroup_obj = new switchgroupPage(page)
    // const addswitchgroup_obj = new addswitchgroupPage(page)
    // const basic_obj = new BasicPage(page)
    // const mngm_obj = new ManagementPage(page)
    // const network_obj = new NetworkPage(page)
    // const part_device = new ParticularDevicePage(page)
    // const device_obj = new devicePage(page)
    // const conf_obj = new ConfigurationPage(page)
    // const soft_update = new SoftwareUpdatePage(page)
    // const tools_obj = new ToolsPage(page)
    // const part_switchgroup_obj = new ParticularSwitchGroupPage(page)
    // const switchports_obj = new SwitchPortsPage(page) 
    // const port_obj = new PortPage(page)
    // const basic_port_obj = new PhysicalPortPage(page)
    // const network_port_obj = new NetworkPortPage(page)
    // const statistics_obj = new StatisticsPage(page)
    // const jobs_obj = new JobsPage(page)
    // const config_obj = new ConfigurationUpdatePage(page)
    // const jobs_softupdate_obj = new JobsSoftwareUpdatePage(page)
    // const onboard_obj = new OnBoardPage(page)
    const cloud = new CloudObjects(page)

    await cloud.page.goto(`${baseURL}`)
    await cloud.login_obj.login(data.user, data.password)
    await cloud.login_obj.selectAccount(data.account2)

    // Click Devices Page

    await cloud.toolbar_obj.clickDevicePage()
    await cloud.device_obj.clickSwitches()
    await cloud.page.waitForTimeout(2000)

    // Searching and deleting

    await cloud.device_obj.deleteDevice("Andrei-3052")

    await cloud.page.waitForTimeout(2000)
})

test ("Onboarding a Device with CloudObjects", async({page,baseURL})=>{

    const cloud = new CloudObjects(page)

    await cloud.page.goto(`${baseURL}`)
    await cloud.login_obj.login(data.user, data.password)
    await cloud.login_obj.selectAccount(data.account2)

    // Click OnBoardPage

    await cloud.toolbar_obj.clickOnBoardPage()
    await cloud.page.waitForTimeout(1500)
    await cloud.onboard_obj.claimDevice("XLZB046BTR3B")
    await cloud.onboard_obj.closeClaimDevice()

    // Aproving the Device

    await cloud.page.reload()
    await page.waitForTimeout(2000)
    await cloud.onboard_obj.approveDevice(1)
    
    await page.waitForTimeout(2000)
})

test.only ("Particular Switch Group Configuration/Update", async({page,baseURL})=>{

    const login_obj = new loginPage(page)
    const toolbar_obj = new toolbarPage(page)
    const switchgroup_obj = new switchgroupPage(page)
    const addswitchgroup_obj = new addswitchgroupPage(page)
    const basic_obj = new BasicPage(page)
    const mngm_obj = new ManagementPage(page)
    const network_obj = new NetworkPage(page)
    const part_device = new ParticularDevicePage(page)
    const device_obj = new devicePage(page)
    const conf_obj = new ConfigurationPage(page)
    const soft_update = new SoftwareUpdatePage(page)
    const tools_obj = new ToolsPage(page)
    const part_switchgroup_obj = new ParticularSwitchGroupPage(page)
    const switchports_obj = new SwitchPortsPage(page) 
    const port_obj = new PortPage(page)
    const basic_port_obj = new PhysicalPortPage(page)
    const network_port_obj = new NetworkPortPage(page)
    const statistics_obj = new StatisticsPage(page)
    const switch_group_softupdate = new SoftwareUpgrade(page)

    await page.goto(`${baseURL}`)
    await login_obj.login(data.user, data.password)
    await login_obj.selectAccount(data.account2)

    // Going to Switch Groups

    await toolbar_obj.clickSwitchGroupsPage()
    await page.waitForTimeout(2000)
    await switchgroup_obj.clickSwitchGroup("5.1")

    // Going to Switches Menu

    await page.waitForTimeout(2000)
    await part_switchgroup_obj.clickSwitches()

    await page.waitForTimeout(2000)
    
    await switch_group_softupdate.clickCheckSwitch("Andrei-2028", 1)
    await switch_group_softupdate.clickActions()

    await page.waitForTimeout(2000)
    await switch_group_softupdate.clickSoftUpdate()
    await page.waitForTimeout(2000)
    await switch_group_softupdate.chooseSoftwareImageForUpdate('5.0-r4')
    await page.waitForTimeout(2000)
    // await switch_group_softupdate.clickAddSoftwareUpdate()
    // await switch_group_softupdate.clickViewJobs()
    await switch_group_softupdate.checkDisableAutoReboot()
    await page.waitForTimeout(5000)
   
})

