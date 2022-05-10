import {isset} from "../helpers/utils";

export const processRewards = (i, node, data) => {
    if (!data) return
    // if (isset(data.error, false)) return;
    // if (!isset(data.data.blocks, false)) return;

    state.rewards = data
}

export const updateRewards = () => {
    if (!state.rewards) return

    const {coinbaseRegular = 720, coinbaseSupercharge = 1440} = config.coinbase

    let {blocks_count = 0, total_rewards = 0, zero_blocks = 0, super_count = 0, super_rewards = 0} = state.rewards[0]

    $("#blocks-in-epoch").html(Number(blocks_count).format(0, null, " ", "."))
    $("#rewards-in-epoch").html(Number(total_rewards / 10**9).format(0, null, " ", "."))
    $("#supercharge-count").html(Number(super_count).format(0, null, " ", "."))
    $("#supercharge-mina").html(Number(super_rewards/10**9).format(0, null, " ", "."))
    $("#zero-count").html(Number(zero_blocks).format(0, null, " ", "."))
}