import {isset} from "../helpers/utils";

export const processRewards = (i, node, data) => {
    if (!data) return
    if (!isset(data.data.blocks, false)) return;

    state.rewards = data.data.blocks
}

export const updateRewards = () => {
    if (!state.rewards) return

    let blocks = state.rewards
    let rewards = blocks.reduce((acc, val)=>acc + parseInt(val.transactions.coinbase), 0)

    $("#blocks-in-epoch").text(blocks.length)
    $("#rewards-in-epoch").text(rewards / 10**9)
}