import {getInfo} from "./helpers/get-info"
import {imgStop, imgOk} from "./helpers/consts"
import {shortAddress} from "./helpers/utils";
import {parseTime} from "./helpers/parse-time";

export const getUptime = async () => {
    const {config, currentNode} = globalThis.Monitor
    const node = config.nodes[currentNode]
    const elLog = $("#query-uptime")
    let interval

    const elUptimePosition = $("#uptime-position")
    const elUptimePositionIcon = $("#position-icon")
    const elUptimeRate = $("#uptime-rate")
    const elUptimeScore = $("#uptime-score")
    const elUptimeAddress = $("#uptime-key")
    const elUptimeRange = $("#uptime-position-range")

    elLog.html(imgStop)

    const uptime = await getInfo(node, "uptime2")

    if (uptime && uptime.address) {
        let {position, address, score, rate, group, positions} = uptime
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

        elUptimePosition.text(position).removeClassBy("label-").addClass(`label-${color}`)
        elUptimePositionIcon.removeClassBy("label-").removeClassBy("mif-").addClass(`label-${color}`).addClass(`mif-${icon}`)
        elUptimeRate.text((parseFloat(rate)) + "%")
        elUptimeScore.text(score)
        elUptimeAddress.html( shortAddress(address.trim()) )
        elUptimeRange.html(`${positions[0]} .. ${positions[positions.length-1]}`)

        elLog.html(imgOk)
    } else {
        elUptimePosition.html("<span class='mif-infinite'>").removeClassBy("label-").addClass(`label-normal`)
        elUptimePositionIcon.removeClassBy("label-").removeClassBy("mif-").addClass(`label-normal`).addClass(`mif-infinite`)
        elUptimeRate.text("NONE")
        elUptimeScore.text("NONE")
        elUptimeAddress.html("NONE")
        elUptimeRange.html(`0 .. 0`)
    }

    setTimeout(getUptime, parseTime(globalThis.Monitor.config.intervals.daemon))
}