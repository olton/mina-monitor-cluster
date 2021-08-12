export const updateConsensus = () => {
    if (!globalThis.state.consensus) return

    const {
        acceptableNetworkDelay,
        delta,
        epochDuration,
        genesisStateTimestamp,
        k,
        slotDuration,
        slotsPerEpoch
    } = globalThis.state.consensus

    const duration = Metro.utils.secondsToTime(epochDuration/1000)

    $("#consensus-genesis-start").html(datetime(genesisStateTimestamp).format("DD/MM/YYYY"))
    $("#consensus-k").html(k)
    $("#consensus-network-delay").html(acceptableNetworkDelay/60000+"m")
    $("#consensus-epoch-duration").html(`${duration.d}d ${duration.h}h  ${duration.m}m`)
    $("#consensus-slot-duration").html((slotDuration / 60000)+"m")
    $("#consensus-slots-per-epoch").html((+slotsPerEpoch).format(0, null, " ", ""))
    $("#consensus-delta").html(delta)
}