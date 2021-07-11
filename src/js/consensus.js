import {getInfo} from "./helpers/get-info"
import {countRequest, switchNode} from "./switch-node"
import {imgOk, imgStop} from "./helpers/consts"

export const getConsensus = async () => {
    const node = globalThis.Monitor.config.nodes[globalThis.Monitor.currentNode]
    const elLog = $("#query-consensus")

    elLog.html(imgStop)

    const consensus = await getInfo(node, 'consensus')
    let reload

    if (consensus) {
        const {consensusConfiguration, consensusTimeNow, consensusTimeBestTip} = consensus.data.daemonStatus
        const {
            acceptableNetworkDelay,
            delta,
            epochDuration,
            genesisStateTimestamp,
            k,
            slotDuration,
            slotsPerEpoch
        } = consensusConfiguration

        const duration = Metro.utils.secondsToTime(epochDuration/1000)

        $("#consensus-genesis-start").html(datetime(genesisStateTimestamp).format("DD/MM/YYYY"))
        $("#consensus-k").html(k)
        $("#consensus-network-delay").html(acceptableNetworkDelay/60000+"m")
        $("#consensus-epoch-duration").html(`${duration.d}d ${duration.h}h  ${duration.m}m`)
        $("#consensus-slot-duration").html((slotDuration / 60000)+"m")
        $("#consensus-slots-per-epoch").html((+slotsPerEpoch).format(0, null, " ", ""))
        $("#consensus-delta").html(delta)

        globalThis.Monitor.slotDuration = +slotDuration
        globalThis.Monitor.epochDuration = +epochDuration

        elLog.html(imgOk)
        reload = globalThis.Monitor.config.intervals.daemon
        countRequest()
    } else {
        reload = 0
        switchNode()
    }

    setTimeout(getConsensus, reload)
}
