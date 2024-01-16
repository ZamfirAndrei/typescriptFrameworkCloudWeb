import { test, expect, Page} from "@playwright/test";
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

export class CloudObjects {

    // Declaring the objects

    public readonly toolbar_obj : toolbarPage
    public readonly login_obj : loginPage
    public readonly home_obj : homePage
    public readonly switchgroup_obj : switchgroupPage
    public readonly addswitchgroup_obj : addswitchgroupPage
    public readonly basic_obj : BasicPage
    public readonly mngm_obj : ManagementPage
    public readonly network_obj : NetworkPage
    public readonly part_device : ParticularDevicePage
    public readonly device_obj : devicePage
    public readonly conf_obj : ConfigurationPage
    public readonly soft_update : SoftwareUpdatePage
    public readonly tools_obj : ToolsPage
    public readonly part_switchgroup_obj : ParticularSwitchGroupPage
    public readonly switchports_obj : SwitchPortsPage
    public readonly port_obj : PortPage
    public readonly basic_port_obj : PhysicalPortPage
    public readonly network_port_obj : NetworkPortPage
    public readonly statistics_obj : StatisticsPage
    public readonly jobs_obj : JobsPage
    public readonly config_obj : ConfigurationUpdatePage
    public readonly jobs_softupdate_obj : JobsSoftwareUpdatePage
    public readonly onboard_obj : OnBoardPage
    public readonly switch_group_softupdate : SoftwareUpgrade

    constructor(public page:Page) {

        // Instantiating objects
        
        this.toolbar_obj = new toolbarPage(this.page)
        this.login_obj = new loginPage(this.page)
        this.home_obj = new homePage(this.page)
        this.switchgroup_obj = new switchgroupPage(this.page)
        this.addswitchgroup_obj = new addswitchgroupPage(this.page)
        this.basic_obj = new BasicPage(this.page)
        this.mngm_obj = new ManagementPage(this.page)
        this.network_obj = new NetworkPage(this.page)
        this.part_device = new ParticularDevicePage(this.page)
        this.device_obj = new devicePage(this.page)
        this.conf_obj = new ConfigurationPage(this.page)
        this.soft_update = new SoftwareUpdatePage(this.page)
        this.tools_obj = new ToolsPage(this.page)
        this.part_switchgroup_obj = new ParticularSwitchGroupPage(this.page)
        this.switchports_obj = new SwitchPortsPage(this.page) 
        this.port_obj = new PortPage(this.page)
        this.basic_port_obj = new PhysicalPortPage(this.page)
        this.network_port_obj = new NetworkPortPage(this.page)
        this.statistics_obj = new StatisticsPage(this.page)
        this.jobs_obj = new JobsPage(this.page)
        this.config_obj = new ConfigurationUpdatePage(this.page)
        this.jobs_softupdate_obj = new JobsSoftwareUpdatePage(this.page)
        this.onboard_obj = new OnBoardPage(this.page)
        this.switch_group_softupdate = new SoftwareUpgrade(this.page)

    }
}