import { job_messages, mocks, message_soft_update, result_soft_update, sync_status_messages, onboard_status_messages } from "./mocks-interface";

const result_messages_list = ["Initiated", "Completed", "Skipped"]
const messages_update_list = ["Initiated software update operation", "Successfully updated the device version to ", "Device is already running same version!"]
const job_messagess = ["Job started successfully"]
const sync_status_messagess = ["N/A","In Sync", "Not In Sync"]

const mock1: mocks[] = [

    { 
        switch_group_name : "test1234", 
        admin_password : "Admin124!", 
        guest_password : "Guest124!",
        check_message : "Switch Group is created successfully.",
    
    }
]

const mock2: mocks[] = [

    { 
        switch_group_name : "test1234", 
        admin_password : "Admin124!", 
        guest_password : "Guest124!",
        check_message : "The specified profile name already exists."
    }
]

const mock3: mocks[] = [

    { 
        switch_group_name : "test12345", 
        admin_password : "Admin124!", 
        guest_password : "Guest124!",
        check_message : "Delete Successful"
    }
]
const result_update : result_soft_update[] = [

    {
        Initiated : "Initiated",
        Completed : "Completed",
        Skipped : "Skipped"
    }
]

const message_update : message_soft_update[] = [

    {
        Initiated : "Initiated software update operation",
        Successfully : "Successfully updated the device version to ",
        RunningSameVersion : "Device is already running same version!"
    }

]

const job_message : job_messages[] = [

    {
        JobStartedSuccessfully: "Job started successfully",
        DeviceDetailsAreSavedSuccessfully: "Device details are saved successfully.",
    }
]

const sync_status_device : sync_status_messages[] = [

    {
        NA : "N/A",
        InSync : "In Sync",
        NotInSync : "Not In Sync"
    }
]

const onboard_status_device : onboard_status_messages[] = [

    {
        Onboarded : "Onboarded",
        Waiting_for_Device : "Waitting for Device",
        Waiting_for_Approval : "Waitting for Approval"
    }
]

export {mock1, mock2, mock3, result_update, message_update, job_message, sync_status_device, onboard_status_device}