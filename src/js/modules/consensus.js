import {isset} from "../helpers/utils";

export const processConsensus = (i, node, data) => {
    if (!data) return
    if (!isset(data.data.daemonStatus.consensusConfiguration)) return

    state.consensus = data.data.daemonStatus.consensusConfiguration
}