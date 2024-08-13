import { test, expect, Page} from "@playwright/test";
import LoginPage from "../pages/loginPage/loginPage";
import HomePage from "../pages/homePage/homePage";
import DevicePage from "../pages/devicesPage/devicesPage";
import ToolbarPage from "../pages/toolbarPage/toolbarPage";
import SwitchgroupPage from "../pages/switchGroupPage/switchGroupPage";
// import addswitchgroupPage from "../pages/addswitchgroupPage";
import {  AddSwitchgroupPage } from "../pages/addSwitchGroupPage/addswitchgroupPage";
import { NetworkPage } from "../pages/addSwitchGroupPage/networkPage" 
import { BasicPage, } from "../pages/addSwitchGroupPage/basicPage" 
import { ManagementPage } from "../pages/addSwitchGroupPage/managementPage" 
import { ParticularDevicePage } from "../pages/particularDevicePage/particularDevicePage";
import { ConfigurationPage } from "../pages/particularDevicePage/configurationPage";
import { SoftwareUpdatePage } from "../pages/particularDevicePage/softwareUpdatePage";
import { ToolsPage } from "../pages/particularDevicePage/toolsPage";
import { ParticularSwitchGroupPage} from "../pages/particularSwitchGroupPage/particularSwitchGroupPage";
import { SwitchPortsPage } from "../pages/particularSwitchGroupPage/switchPortsPage";
import { PortPage } from "../pages/particularSwitchGroupPage/portPage";
import { PhysicalPortPage } from "../pages/particularSwitchGroupPage/physicalPortPage";
import { NetworkPortPage } from "../pages/particularSwitchGroupPage/networkPortPage";
import { StatisticsPage } from "../pages/particularSwitchGroupPage/statisticsPage";
import { SoftwareUpgrade } from "../pages/particularSwitchGroupPage/softwareUpgrade";
import { SwitchesPage } from "../pages/particularSwitchGroupPage/switchesPage";
import { ConfigurationPageSwitchGroup } from "../pages/particularSwitchGroupPage/configurationPageSwitchGroup.ts";
import { NetworkPageSwitchGroup } from "../pages/particularSwitchGroupPage/networkPageSwitchGroup";

import * as data from "../constants/constants.json"
import { JobsPage} from "../pages/jobsPage/jobsPage";
import { ConfigurationUpdatePage } from "../pages/jobsPage/configurationUpdatePage";
import { JobsSoftwareUpdatePage } from "../pages/jobsPage/jobsSoftwareUpdatePage";
import { OnBoardPage } from "../pages/onboardPage/onboardPage";

export class CloudObjects {

    public readonly toolbarObj : ToolbarPage
    public readonly loginObj : LoginPage
    public readonly homeObj : HomePage
    public readonly switchgroupObj : SwitchgroupPage
    public readonly addSwitchgroupObj : AddSwitchgroupPage
    public readonly basicObj : BasicPage
    public readonly mngmObj : ManagementPage
    public readonly networkObj : NetworkPage
    public readonly partDeviceObj : ParticularDevicePage
    public readonly deviceObj : DevicePage
    public readonly confObj : ConfigurationPage
    public readonly softUpdate : SoftwareUpdatePage
    public readonly toolsObj : ToolsPage
    public readonly partSwitchgroupObj : ParticularSwitchGroupPage
    public readonly switchportsObj : SwitchPortsPage
    public readonly portObj : PortPage
    public readonly physicalPortObj : PhysicalPortPage
    public readonly networkPortObj : NetworkPortPage
    public readonly statisticsObj : StatisticsPage
    public readonly jobsObj : JobsPage
    public readonly configUpdateObj : ConfigurationUpdatePage
    public readonly jobsSoftupdateObj : JobsSoftwareUpdatePage
    public readonly onboardObj : OnBoardPage
    public readonly switchGroupSoftupdate : SoftwareUpgrade
    public readonly switchesObj : SwitchesPage
    public readonly configSwitchgroupObj : ConfigurationPageSwitchGroup
    public readonly networkSwitchgroupObj : NetworkPageSwitchGroup

    constructor(public page:Page) {

        // Instantiating objects
        
        this.toolbarObj = new ToolbarPage(this.page)
        this.loginObj = new LoginPage(this.page)
        this.homeObj = new HomePage(this.page)
        this.switchgroupObj = new SwitchgroupPage(this.page)
        this.addSwitchgroupObj = new AddSwitchgroupPage(this.page)
        this.basicObj = new BasicPage(this.page)
        this.mngmObj = new ManagementPage(this.page)
        this.networkObj = new NetworkPage(this.page)
        this.partDeviceObj = new ParticularDevicePage(this.page)
        this.deviceObj = new DevicePage(this.page)
        this.confObj = new ConfigurationPage(this.page)
        this.softUpdate = new SoftwareUpdatePage(this.page)
        this.toolsObj = new ToolsPage(this.page)
        this.partSwitchgroupObj = new ParticularSwitchGroupPage(this.page)
        this.switchportsObj = new SwitchPortsPage(this.page) 
        this.portObj = new PortPage(this.page)
        this.physicalPortObj = new PhysicalPortPage(this.page)
        this.networkPortObj = new NetworkPortPage(this.page)
        this.statisticsObj = new StatisticsPage(this.page)
        this.jobsObj = new JobsPage(this.page)
        this.configUpdateObj = new ConfigurationUpdatePage(this.page)
        this.jobsSoftupdateObj = new JobsSoftwareUpdatePage(this.page)
        this.onboardObj = new OnBoardPage(this.page)
        this.switchGroupSoftupdate = new SoftwareUpgrade(this.page)
        this.switchesObj = new SwitchesPage(this.page)
        this.configSwitchgroupObj = new ConfigurationPageSwitchGroup(this.page)
        this.networkSwitchgroupObj = new NetworkPageSwitchGroup(this.page)

    }
}