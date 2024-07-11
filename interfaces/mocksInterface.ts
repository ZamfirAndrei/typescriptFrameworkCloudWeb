

interface mocks {

    switchGroupName: string
    adminPassword: string
    guestPassword: string
    checkMessage: string

}

interface resultSoftUpdate {

    Initiated : string
    Completed : string
    Skipped : string
}

interface messageSoftUpdate {

    Initiated : string
    Successfully : string
    RunningSameVersion : string
}

interface jobMessages {

    JobStartedSuccessfully : string
    DeviceDetailsAreSavedSuccessfully: string
}
interface syncStatusMessages {

    NA : string
    InSync : string
    NotInSync : string

}

interface onboardStatusMessages {

    Onboarded : string
    WaitingForDevice : string
    WaitingForApproval : string

}

export {mocks, resultSoftUpdate, messageSoftUpdate, jobMessages, syncStatusMessages, onboardStatusMessages}