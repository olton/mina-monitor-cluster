import {getInfo} from "./helpers/get-info"
import {countRequest, switchNode} from "./switch-node"
import {imgStop, imgOk} from "./helpers/consts"
import {parseTime} from "./helpers/parse-time";
import {isset} from "./helpers/utils";

export const getBalance = async () => {
    const {config, currentNode} = globalThis.Monitor
    const node = config.nodes[currentNode]
    const defaultReload = parseTime(config.intervals.daemon)
    const elLog = $("#query-balance")
    let reload

    elLog.html(imgStop)

    let status = await getInfo(node, 'balance')

    if (isset(status.data.account.balance)) {
        globalThis.state.balance = status.data.account.balance
        elLog.html(imgOk)
        reload = defaultReload
        countRequest()
    } else {
        reload = 0
        switchNode()
    }

    setTimeout(getBalance, reload)
}