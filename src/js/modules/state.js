import {SYNC_STATE_SYNCED, SYNC_STATE_UNKNOWN} from "../helpers/consts";

export const processState = (i, node, data) => {
    if (!data) return

    const id = `#node-${i+1}`
    const elStateFrame = $(`${id} .node-info-general`)
    const elSyncStatus = $(`${id} .node-sync-status`)
    const elPanel = $(`${id} > .panel`)
    const elNodeHealthParent = $(`${id} .node-sync-status-container`)

    elStateFrame.removeClass('BOOTSTRAP CATCHUP OFFLINE CONNECTING')
    elPanel.removeClass('disabled')
    elNodeHealthParent.removeClass("alert")

    elSyncStatus.html(data)

    daemons[i]["state"] = data

    if (data === SYNC_STATE_UNKNOWN) {
        elPanel.addClass("disabled")
    } else {
        if (data !== SYNC_STATE_SYNCED) {
            elStateFrame.addClass(data)
        }
    }
}