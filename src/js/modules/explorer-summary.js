import {isset} from "../helpers/utils";

export const processExplorerSummary = (i, node, data) => {
    if (!data) return

    state.explorerSummary = data
}

export const updateExplorerSummary = () => {
    if (!state.explorerSummary) return

    let {
        blockchainLength = 0,
        epoch: explorerEpoch = 0,
        slot: explorerSlot,
        globalSlot = 0,
        dateTime,
        chainId,
        circulatingSupply,
        lockedSupply,
        totalCurrency
    } = state.explorerSummary

    const elExplorerHeight = $("#explorer-block-height")
    const elExplorerHeightParent = elExplorerHeight.parent()

    elExplorerHeight.html((+blockchainLength).format(0, null, " ", "."))

    if (!state.blockchain) return

    let {
        blockHeight = 0,
        epoch = 0,
        slot = 0,
        slotSinceGenesis
    } = state.blockchain

    let heightDiff = +blockchainLength - +blockHeight
    let {blockDiff = 3} = config

    elExplorerHeightParent.removeClass("alert")
    if (heightDiff !== 0 && Math.abs(heightDiff) >= blockDiff) {
        elExplorerHeightParent.addClass("alert")
    }
}