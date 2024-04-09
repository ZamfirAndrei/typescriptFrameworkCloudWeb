

interface mocks {

    switch_group_name: string
    admin_password: string
    guest_password: string
    check_message: string

}

interface result_soft_update {

    Initiated : string
    Completed : string
    Skipped : string
}

interface message_soft_update {

    Initiated : string
    Successfully : string
    RunningSameVersion : string
}

interface job_messages {

    JobStartedSuccessfully : string
}
interface sync_status_messages {

    NA : string
    InSync : string
    NotInSync : string

}

export {mocks, result_soft_update, message_soft_update, job_messages, sync_status_messages}