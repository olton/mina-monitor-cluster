import {isset} from "../helpers/utils";

export const processRewards = (i, node, data) => {
    if (!data) return
    if (!isset(data.data.blocks)) return;

    state.rewards = data.data.blocks
}