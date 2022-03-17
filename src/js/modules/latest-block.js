import {shortAddress} from "../helpers/utils";
import {MINA_EXPLORER, MINATAUR_EXPLORER} from "../helpers/consts";

export const processLatestBlock = (i, node, data) => {
    if (!data) return

    state.latestBlock = data
}

export const updateLatestBlock = () => {
    if (!state.latestBlock) return

    const {
        blockHeight = 0,
        creator = "",
        dateTime
    } = state.latestBlock

    const elLatestBlockHeight = $("#latest-block-height")
    const elCreatorBlockMedal = $("#creator-block-medal")
    const elLatestBlockCreator = $("#latest-block-creator")
    const elLatestBlockTime = $("#latest-block-datetime")
    const blockDate = datetime(dateTime)
    const {explorer = "minataur"} = config

    elLatestBlockHeight.html((+blockHeight).format(0, null, " ", "."))
    elLatestBlockCreator.html(
        $("<a>")
            .addClass("no-decor fg-accent")
            .attr("href", (explorer.toLowerCase() === "mina" ? MINA_EXPLORER : MINATAUR_EXPLORER) + creator )
            .html(shortAddress(creator))
    )
    elLatestBlockTime.html(blockDate.format("HH:mm"))

    const {address = ""} = state.uptime || {}

    elCreatorBlockMedal.hide()
    if (creator === address) {
        elCreatorBlockMedal.show()
    }
}