import { jobMessages, mocks, messageSoftUpdate, resultSoftUpdate, syncStatusMessages, onboardStatusMessages } from "../interfaces/mocksInterface";

const resultMessagesList = ["Initiated", "Completed", "Skipped"]
const messagesUpdateList = ["Initiated software update operation", "Successfully updated the device version to ", "Device is already running same version!"]
const jobMessagess = ["Job started successfully"]
const syncStatusMessagess = ["N/A","In Sync", "Not In Sync"]

const mock1: mocks[] = [

    { 
        switchGroupName : "test1234", 
        adminPassword : "Admin124!", 
        guestPassword : "Guest124!",
        checkMessage : "Switch Group is created successfully.",
    
    }
]

const mock2: mocks[] = [

    { 
        switchGroupName : "test1234", 
        adminPassword : "Admin124!", 
        guestPassword : "Guest124!",
        checkMessage : "The specified profile name already exists."
    }
]

const mock3: mocks[] = [

    { 
        switchGroupName : "test12345", 
        adminPassword : "Admin124!", 
        guestPassword : "Guest124!",
        checkMessage : "Delete Successful"
    }
]
const resultUpdate : resultSoftUpdate[] = [

    {
        Initiated : "Initiated",
        Completed : "Completed",
        Skipped : "Skipped"
    }
]

const messageUpdate : messageSoftUpdate[] = [

    {
        Initiated : "Initiated software update operation",
        Successfully : "Successfully updated the device version to ",
        RunningSameVersion : "Device is already running same version!"
    }

]

const jobMessage : jobMessages[] = [

    {
        JobStartedSuccessfully: "Job started successfully",
        DeviceDetailsAreSavedSuccessfully: "Device details are saved successfully.",
    }
]

const syncStatusDevice : syncStatusMessages[] = [

    {
        NA : "N/A",
        InSync : "In Sync",
        NotInSync : "Not In Sync"
    }
]

const onboardStatusDevice : onboardStatusMessages[] = [

    {
        Onboarded : "Onboarded",
        WaitingForDevice : "Waitting for Device",
        WaitingForApproval : "Waitting for Approval"
    }
]

export {mock1, mock2, mock3, resultUpdate, messageUpdate, jobMessage, syncStatusDevice, onboardStatusDevice}