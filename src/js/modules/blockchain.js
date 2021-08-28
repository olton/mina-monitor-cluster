import {isset} from "../helpers/utils";
import {EPOCH_DURATION, GENESIS_START, SLOT_DURATION} from "../helpers/consts";

export const processBlockchain = (i, node, data) => {
    if (!data) return
    if (isset(data.data.errors, false)) return
    if (!isset(data.data.bestChain[0].protocolState.consensusState, false)) return

    const blockchain = data.data.bestChain[0].protocolState.consensusState

    if (!state.blockchain || (state.blockchain.blockHeight < blockchain.blockHeight)) {
        state.blockchain = blockchain
    }
}

export const updateBlockchain = ({resetCountdown = false}) => {

    if (!state.blockchain) return

    const elEpochCountdown = $("#epoch-countdown")

    const {
        blockHeight,
        epoch,
        slot,
        slotSinceGenesis
    } = state.blockchain

    $("#slot-number").text(Number(slot).format(0, null, " ", "."))
    $("#slot-since-genesis").text(Number(slotSinceGenesis).format(0, null, " ", "."))
    $("#block-height").text(Number(blockHeight).format(0, null, " ", "."))

    const epochDurationProgress = (+slot * SLOT_DURATION * 100) / EPOCH_DURATION
    const progress = Metro.getPlugin('#epoch-number', 'donut')

    progress.setColor({
        "stroke": darkMode ? "#1b2125" : "rgb(245, 245, 245)"
    })

    progress.val(epochDurationProgress)

    let epochEnd = datetime(GENESIS_START).addSecond(EPOCH_DURATION/1000 * (+epoch + 1))
    let countdown

    $(".end-epoch-text").html(epochEnd.format("ddd, DD MMM, HH:mm"))

    if (resetCountdown) {
        elEpochCountdown.find(".countdown").remove()
        countdown = $("<div>").attr("data-role", "countdown").attr("data-date", epochEnd.format("YYYY/MM/DD HH:mm")).attr("data-animate", "none").appendTo(elEpochCountdown)
        Metro.makePlugin(countdown, "countdown")
    }
}
