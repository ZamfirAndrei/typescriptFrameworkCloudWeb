import { mocks } from "./mocks-interface";

const mock1: mocks[] = [

    { 
    switch_group_name : "test1234", 
    admin_password : "Admin124!", 
    guest_password : "Guest124!",
    check_message : "Switch Group is created successfully."
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
    switch_group_name : "test1234", 
    admin_password : "Admin124!", 
    guest_password : "Guest124!",
    check_message : "Delete Successful"
    }
]

export {mock1,mock2,mock3}