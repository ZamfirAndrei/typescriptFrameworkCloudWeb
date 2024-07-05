import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {

  // testDir: "./tests",
  // use : {
  //   headless: false
  // }

  // testMatch: ["tests/testing.test.ts"],
  // testMatch: ["tests/onboard.test.ts"],
  // testMatch: ["tests/login.test.ts"],
  // testMatch: ["tests/softwareupdate.test.ts"],
  // testMatch: ["tests/switchgroup.test.ts"],
  testMatch: ["tests/portConfiguration.test.ts"],
  use: {
    baseURL: "https://qa.cloud.cambiumnetworks.com/#/",
    headless : false,
    screenshot : "only-on-failure",
    video : "retain-on-failure",
    navigationTimeout: 40000,
    actionTimeout: 20000
  },

  timeout: 60 * 1000 * 10,
  // timeout: 3000,
  reporter : [["dot"],["html", {open : "never"}],["json", {open : "never"}]]
  
  
};

export default config