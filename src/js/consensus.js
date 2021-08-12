import {getInfo} from "./helpers/get-info"
import {countRequest, switchNode} from "./switch-node"
import {imgOk, imgStop} from "./helpers/consts"
import {parseTime} from "./helpers/parse-time";
import {isset} from "./helpers/utils";

export const getConsensus = async () => {
    const node = globalThis.Monitor.config.nodes[globalThis.Monitor.currentNode]
    const elLog = $("#query-consensus")

    elLog.html(imgStop)

    const consensus = await getInfo(node, 'consensus')

    if (isset(consensus.data.daemonStatus.consensusConfiguration)) {
        globalThis.state.consensus = consensus.data.daemonStatus.consensusConfiguration
        elLog.html(imgOk)
        countRequest()
    } else {
        switchNode()
    }

    setTimeout(getConsensus, parseTime(globalThis.Monitor.config.intervals.daemon))
}
