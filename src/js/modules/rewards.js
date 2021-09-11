import {isset} from "../helpers/utils";

export const processRewards = (i, node, data) => {
    if (!data) return
    if (isset(data.error, false)) return;
    if (!isset(data.data.blocks, false)) return;

    if (daemons[i]["state"] === "SYNCED") {
        state.rewards = data.data.blocks
        console.log(state.rewards)
    }
}

export const updateRewards = () => {
    if (!state.rewards) return

    const coinbaseRegular = config.coinbase.regular
    const coinbaseSupercharge = config.coinbase.supercharge
    let blocks = state.rewards
    let rewards = blocks.reduce((acc, val)=>acc + parseInt(val.transactions.coinbase), 0)
    let supercharge = 0
    let superchargeMina = 0

    for(let b of blocks) {
        const coinbase = +b.transactions.coinbase / 10**9
        if (coinbase === coinbaseSupercharge) {
            supercharge++
            superchargeMina += coinbase - coinbaseRegular
        }
    }

    $("#blocks-in-epoch").html(blocks.length)
    $("#rewards-in-epoch").html(rewards / 10**9)
    $("#supercharge-count").html(supercharge)
    $("#supercharge-mina").html(superchargeMina)
}