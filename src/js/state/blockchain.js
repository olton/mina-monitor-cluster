import {epochDuration, genesisStart, slotDuration} from "../helpers/consts";

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

    const epochDurationProgress = (+slot * slotDuration * 100) / epochDuration
    const progress = Metro.getPlugin('#epoch-number', 'donut')

    progress.val(epochDurationProgress)

    let epochEnd = datetime(genesisStart).addSecond(epochDuration/1000 * (+epoch + 1))
    let countdown

    $(".end-epoch-text").html(epochEnd.format("ddd, DD MMM, HH:mm"))

    if (resetCountdown) {
        elEpochCountdown.find(".countdown").remove()
        countdown = $("<div>").attr("data-role", "countdown").attr("data-date", epochEnd.format("YYYY/MM/DD HH:mm")).attr("data-animate", "none").appendTo(elEpochCountdown)
        Metro.makePlugin(countdown, "countdown")
    }
}
