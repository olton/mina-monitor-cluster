import {shortAddress} from "../helpers/utils";

export const processLatestBlocks = (i, node, data) => {
    console.log(!data, !Array.isArray(data), !data.length)
    if (!data || !Array.isArray(data) || !data.length) return

    state.latestBlocks = data[0]
}

export const updateLatestBlocks = () => {
    if (!state.latestBlocks) return

    console.log(state.latestBlocks)

    const {
        blockHeight = 0,
        creator = "",
        dateTime
    } = state.latestBlocks

    const elLatestBlockHeight = $("#latest-block-height")
    const elLatestBlockHeightParent = elLatestBlockHeight.parent()
    const elLatestBlockCreator = $("#latest-block-creator")
    const elLatestBlockTime = $("#latest-block-datetime")
    const blockDate = datetime(dateTime)

    elLatestBlockHeight.html((+blockHeight).format(0, null, " ", "."))
    elLatestBlockCreator.html(shortAddress(creator))
    elLatestBlockTime.html(blockDate.format("HH:mm"))
}