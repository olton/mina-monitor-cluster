import {getInfo} from "./helpers/get-info"
import {countRequest, switchNode} from "./switch-node"
import {imgStop, imgOk} from "./helpers/consts"
import {parseTime} from "./helpers/parse-time";

export const getRewards = async () => {
    const {config, currentNode} = globalThis.Monitor
    const node = config.nodes[currentNode]
    const elLog = $("#query-rewards")
    let reload

    elLog.html(imgStop)

    let data = await getInfo(node,'winning-blocks')

    if (data && data.data) {

        globalThis.state.rewards = data.data.blocks

        elLog.html(imgOk)
        reload = parseTime("3m")
        countRequest()
    } else {
        reload = 0
        switchNode()
    }

    setTimeout(getRewards, reload)
}