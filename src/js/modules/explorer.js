export const processExplorer = (i, node, data) => {
    if (!data) return

    const {blockchainLength, circulatingSupply, lockedSupply, totalCurrency} = data
    const id = `#node-${i+1}`
    const elExplorerHeight = $(`${id} .explorer-height`)

    const height = +blockchainLength

    elExplorerHeight.html(height.format(0, null, " ", "."))
}