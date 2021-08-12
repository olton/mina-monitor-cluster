import {epochDuration, genesisStart, slotDuration} from "../helpers/consts";

export const updateBlockchain = ({resetCountdown = false}) => {

    if (!globalThis.state.blockchain) return

    const elEpochCountdown = $("#epoch-countdown")

    const {
        blockHeight,
        epoch,
        slot,
        slotSinceGenesis,
        blockSpeed
    } = globalThis.state.blockchain

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

    $("#block-speed").html(`<span>${(blockSpeed / 60000).toFixed(2)}</span>`)
}
