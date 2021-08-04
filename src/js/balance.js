import {getInfo} from "./helpers/get-info"
import {countRequest, switchNode} from "./switch-node"
import {imgStop, imgOk} from "./helpers/consts"
import {parseTime} from "./helpers/parse-time";

export const getBalance = async () => {
    const {config, currentNode} = globalThis.Monitor
    const node = config.nodes[currentNode]
    const defaultReload = parseTime(config.intervals.daemon)
    const elLog = $("#query-balance")
    let reload

    elLog.html(imgStop)

    let status = await getInfo(node, 'balance')

    if (status && status.data && status.data.account && status.data.account.balance) {
        const {total, liquid} = status.data.account.balance

        globalThis.Monitor.balance = +total / 10**9

        const b = (total/10**9).format(4, null, " ", ".").split(".")
        const l = (liquid/10**9).format(4, null, " ", ".").split(".")
        const u = (globalThis.Monitor.balance * globalThis.Monitor.price).format(2, null, " ", ".").split(".")

        $("#balance-total").html(`${b[0]}.<span class="reduce-4" style="line-height: 2">${b[1]}</span>`)
        $("#balance-liquid").html(`${l[0]}.<span class="reduce-3" style="line-height: 2">${l[1]}</span>`)
        $("#balance-usd").html(`${u[0]}.<span style="line-height: 2">${u[1]}</span> ${globalThis.Monitor.price_currency.toUpperCase()}`)

        elLog.html(imgOk)
        reload = defaultReload
        countRequest()
    } else {
        reload = 0
        switchNode()
    }

    setTimeout(getBalance, reload)
}