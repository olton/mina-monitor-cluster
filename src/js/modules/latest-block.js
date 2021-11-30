import {shortAddress} from "../helpers/utils";
import {MINA_EXPLORER, STAKETAB_EXPLORER} from "../helpers/consts";

export const processLatestBlocks = (i, node, data) => {
    if (!data || !Array.isArray(data) || !data.length) return

    state.latestBlocks = data[0]
}

export const updateLatestBlocks = () => {
    if (!state.latestBlocks) return

    const {
        blockHeight = 0,
        creator = "",
        dateTime
    } = state.latestBlocks

    const elLatestBlockHeight = $("#latest-block-height")
    const elCreatorBlockMedal = $("#creator-block-medal")
    const elLatestBlockCreator = $("#latest-block-creator")
    const elLatestBlockTime = $("#latest-block-datetime")
    const blockDate = datetime(dateTime)
    const {explorer = "staketab"} = config

    elLatestBlockHeight.html((+blockHeight).format(0, null, " ", "."))
    elLatestBlockCreator.html(
        $("<a>")
            .addClass("no-decor fg-accent")
            .attr("href", (explorer.toLowerCase() === "mina" ? MINA_EXPLORER : STAKETAB_EXPLORER) + creator )
            .html(shortAddress(creator))
    )
    elLatestBlockTime.html(blockDate.format("HH:mm"))

    const {address = ""} = state.uptime

    elCreatorBlockMedal.hide()
    if (creator === address) {
        elCreatorBlockMedal.show()
    }
}