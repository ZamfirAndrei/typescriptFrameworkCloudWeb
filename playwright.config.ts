import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {

  // testDir: "./tests",
  // use : {
  //   headless: false
  // }

  // testMatch: ["tests/testing.test.ts"],
  testMatch: ["tests/onboard.test.ts"],
  // testMatch: ["tests/login.test.ts"],
  use: {
    baseURL: "https://qa.cloud.cambiumnetworks.com/#/",
    headless : false,
    screenshot : "only-on-failure",
    video : "retain-on-failure"
  },

  timeout: 60 * 1000 * 10,
  reporter : [["dot"],["html", {open : "never"}],["json", {open : "never"}]]
  
  
};

export default config