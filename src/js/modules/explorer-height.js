export const processExplorerHeight = (i, node, data) => {
    state.explorerHeight = data
}

export const updateExplorerHeight = () => {
    if (!state.explorerHeight) return

    let blockchainLength = +(state.explorerHeight)

    let {blockDiff = 3} = config

    $.each(daemons, (i, daemon) => {
        const nodeId = `#node-${i+1}`
        const elExplorerHeight = $(`${nodeId} .explorer-block-height`)
        const elExplorerHeightParent = elExplorerHeight.parent()
        let heightDiff = Math.abs(+blockchainLength - daemon.height)

        elExplorerHeight.html((+blockchainLength).format(0, null, " ", "."))

        elExplorerHeightParent.removeClass("exp-alert")
        if (heightDiff >= blockDiff) {
            elExplorerHeightParent.addClass("exp-alert")
        }
    })
}