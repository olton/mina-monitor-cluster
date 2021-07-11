import {getInfo} from "./helpers/get-info"
import {imgStop, imgOk} from "./helpers/consts"
import {shortAddress} from "./helpers/utils";

export const getUptime = async () => {
    const {config, currentNode} = globalThis.Monitor
    const node = config.nodes[currentNode]
    const elLog = $("#query-uptime")
    let interval

    elLog.html(imgStop)

    const uptime = await getInfo(node, "uptime")

    if (uptime) {
        let [position, publicKey, score, rate] = uptime
        let color = "neutral", icon = "infinite"

        if (Metro.utils.between(position, 0, 75)) {
            color = 'success'
            icon = 'checkmark'
        } else if (Metro.utils.between(position, 75, 100, true)) {
            color = 'warning'
            icon = 'warning'
        } else if (Metro.utils.between(position, 101, 120, true)) {
            color = 'alert'
            icon = 'bin'
        }

        $("#uptime-position").text(position).removeClassBy("label-").addClass(`label-${color}`)
        $("#position-icon").removeClassBy("label-").removeClassBy("mif-").addClass(`label-${color}`).addClass(`mif-${icon}`)
        $("#uptime-rate").text((parseFloat(rate)) + "%")
        $("#uptime-score").text(score)
        $("#uptime-key").html( shortAddress(publicKey) )

        elLog.html(imgOk)
        interval = globalThis.Monitor.config.intervals.daemon
    } else {
        interval = 0
    }

    setTimeout( getUptime, interval)
}