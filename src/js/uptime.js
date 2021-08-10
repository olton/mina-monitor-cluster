import {getInfo} from "./helpers/get-info"
import {imgStop, imgOk} from "./helpers/consts"
import {parseTime} from "./helpers/parse-time";

export const getUptime = async () => {
    const {config, currentNode} = globalThis.Monitor
    const node = config.nodes[currentNode]
    const elLog = $("#query-uptime")

    elLog.html(imgStop)

    try {
        globalThis.state.uptime = await getInfo(node, "uptime2")
        elLog.html(imgOk)
    } catch (e) {
        console.error(e.message)
    }

    setTimeout(getUptime, parseTime(globalThis.Monitor.config.intervals.daemon))
}