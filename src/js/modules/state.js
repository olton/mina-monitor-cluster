export const processState = (i, node, data) => {
    if (!data) return

    const id = `#node-${i+1}`
    const elStateFrame = $(`${id} .node-info-general`)
    const elPanel = $(`${id} > .panel`)

    elStateFrame.removeClass('BOOTSTRAP CATCHUP OFFLINE CONNECTING')
    elPanel.removeClass('disabled')

    if (data === 'UNKNOWN') {
        elPanel.addClass("disabled")
    } else if (data !== 'SYNCED' && data !== 'UNKNOWN') {
        elStateFrame.addClass(data)
    }
}