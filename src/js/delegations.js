import {getInfo} from "./helpers/get-info"
import {countRequest, switchNode} from "./switch-node"
import {imgOk, imgStop} from "./helpers/consts"

export const getDelegations = async () => {
    let reload
    const node = globalThis.Monitor.config.nodes[globalThis.Monitor.currentNode]
    const elLog = $("#query-delegations")

    elLog.html(imgStop)

    const data = await getInfo(node, 'delegations')

    if (data) {

        globalThis.state.delegations = data

        elLog.html(imgOk)
        reload = 180000
        countRequest()
    } else {
        reload = 0
        switchNode()
    }

    setTimeout(getDelegations, reload)
}
