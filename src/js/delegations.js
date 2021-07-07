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
        const {current, next} = data

        const s1 = (current.stake).format(4, null, " ", ".").split(".")
        const s2 = (next.stake).format(4, null, " ", ".").split(".")

        $("#delegators-total").text(current.count)
        $("#delegators-stack").html(`${s1[0]}.<span class="reduce-4" style="line-height: 2">${s1[1]}</span>`)

        $("#delegators-total-next").text(next.count)
        $("#delegators-stack-next").html(`${s2[0]}.<span class="reduce-4" style="line-height: 2">${s2[1]}</span>`)

        elLog.html(imgOk)
        reload = 180000
        countRequest()
    } else {
        reload = 0
        switchNode()
    }

    setTimeout(() => getDelegations(), reload)
}