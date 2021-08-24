export const processExplorer = (i, node, data) => {
    if (!data) return

    const {blockchainLength, circulatingSupply, lockedSupply, totalCurrency} = data
    const id = `#node-${i+1}`
    const elExplorerHeight = $(`${id} .explorer-height`)
    const elExplorerHeightBlock = elExplorerHeight.closest("td")

    const height = +blockchainLength

    elExplorerHeight.html(height.format(0, null, " ", "."))

    elExplorerHeightBlock.removeClass("info ani-flash")
    if (state.blockchain && state.blockchain.blockHeight) {
        if (height - state.blockchain.blockHeight > 2) {
            elExplorerHeightBlock.addClass("info ani-flash")
        }
    }
}