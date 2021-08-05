import {getInfo} from "./helpers/get-info"
import {imgStop, imgOk} from "./helpers/consts"
import {shortAddress} from "./helpers/utils";
import {parseTime} from "./helpers/parse-time";

export const getUptime = async () => {
    const {config, currentNode} = globalThis.Monitor
    const node = config.nodes[currentNode]
    const elLog = $("#query-uptime")
    let interval

    elLog.html(imgStop)

    const uptime = await getInfo(node, "uptime")

    if (uptime && Array.isArray(uptime) && uptime.length) {
        let [position, publicKey, score, rate] = uptime
        let color = "neutral", icon = "infinite"

        if (Metro.utils.between(position, 0, 80, true)) {
            color = 'success'
            icon = 'checkmark'
        } else if (Metro.utils.between(position, 81, 100, true)) {
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
        $("#uptime-key").html( shortAddress(publicKey.trim()) )

        elLog.html(imgOk)
    } else {
        $("#uptime-position").html("<span class='mif-infinite'>").removeClassBy("label-").addClass(`label-normal`)
        $("#position-icon").removeClassBy("label-").removeClassBy("mif-").addClass(`label-normal`).addClass(`mif-infinite`)
        $("#uptime-rate").text("NONE")
        $("#uptime-score").text("NONE")
        $("#uptime-key").html("NONE")
    }

    setTimeout(getUptime, parseTime(globalThis.Monitor.config.intervals.daemon))
}