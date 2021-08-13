import {getInfo} from "./helpers/get-info"
import {countRequest, switchNode} from "./switch-node"
import {imgStop, imgOk} from "./helpers/consts"
import {parseTime} from "./helpers/parse-time";
import {isset} from "./helpers/utils";

export const getBlockchain = async () => {
    const node = globalThis.Monitor.config.nodes[globalThis.Monitor.currentNode]
    const elLog = $("#query-blockchain")

    elLog.html(imgStop)

    const blockchain = await getInfo(node, 'blockchain')
    const speed = await getInfo(node, 'block-speed')

    if (isset(blockchain.data.bestChain) && blockchain.data.bestChain.length) {

        globalThis.state.blockchain = {
            ...blockchain.data.bestChain[0].protocolState.consensusState,
            blockSpeed: speed
        }

        elLog.html(imgOk)
        countRequest()
    } else {
        switchNode()
    }

    setTimeout(getBlockchain, parseTime(globalThis.Monitor.config.intervals.daemon))
}
