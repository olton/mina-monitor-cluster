export const processState = (i, node, data) => {
    if (!data) return

    const id = `#node-${i+1}`
    const elStateFrame = $(`${id} .node-info-general`)
    const elSyncStatus = $(`${id} .node-sync-status`)
    const elPanel = $(`${id} > .panel`)

    elStateFrame.removeClass('BOOTSTRAP CATCHUP OFFLINE CONNECTING')
    elPanel.removeClass('disabled')

    elSyncStatus.html(data)

    if (data === 'UNKNOWN') {
        elPanel.addClass("disabled")
    } else if (data !== 'SYNCED' && data !== 'UNKNOWN') {
        elStateFrame.addClass(data)
    }
}