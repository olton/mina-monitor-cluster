export const processConsensus = (i, node, data) => {
    if (!data) return

    state.consensus = data.data.daemonStatus.consensusConfiguration
}