import { test, expect, Page} from "@playwright/test";
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
import { JobsPage, ConfigurationUpdatePage, JobsSoftwareUpdatePage } from "../pages/jobsPage";
import { OnBoardPage } from "../pages/onboardPage";

export class CloudObjects {

    // Declaring the objects

    private readonly toolbar_obj : toolbarPage
    private readonly login_obj : loginPage
    private readonly home_obj : homePage
    private readonly switchgroup_obj : switchgroupPage
    private readonly addswitchgroup_obj : addswitchgroupPage
    private readonly basic_obj : BasicPage
    private readonly mngm_obj : ManagementPage
    private readonly network_obj : NetworkPage
    private readonly part_device : ParticularDevicePage
    private readonly device_obj : devicePage
    private readonly conf_obj : ConfigurationPage
    private readonly soft_update : SoftwareUpdatePage
    private readonly tools_obj : ToolsPage
    private readonly part_switchgroup_obj : ParticularSwitchGroupPage
    private readonly switchports_obj : SwitchPortsPage
    private readonly port_obj : PortPage
    private readonly basic_port_obj : PhysicalPortPage
    private readonly network_port_obj : NetworkPortPage
    private readonly statistics_obj : StatisticsPage
    private readonly jobs_obj : JobsPage
    private readonly config_obj : ConfigurationUpdatePage
    private readonly jobs_softupdate_obj : JobsSoftwareUpdatePage
    private readonly onboard_obj : OnBoardPage

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

    }
}