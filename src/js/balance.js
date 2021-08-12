import {getInfo} from "./helpers/get-info"
import {countRequest, switchNode} from "./switch-node"
import {imgStop, imgOk} from "./helpers/consts"
import {parseTime} from "./helpers/parse-time";
import {isset} from "./helpers/utils";

export const getBalance = async () => {
    const {config, currentNode} = globalThis.Monitor
    const node = config.nodes[currentNode]
    const elLog = $("#query-balance")

    elLog.html(imgStop)

    let status = await getInfo(node, 'balance')

    if (isset(status.data.account.balance)) {
        globalThis.state.balance = status.data.account.balance
        elLog.html(imgOk)
        countRequest()
    } else {
        switchNode()
    }

    setTimeout(getBalance, parseTime(config.intervals.daemon))
}
