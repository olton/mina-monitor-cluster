import {shortAddress} from "../helpers/utils";
import {MINA_EXPLORER, STAKETAB_EXPLORER} from "../helpers/consts";

export const processUptime = (i, node, data) => {
    if (!data) return

    state.uptime = data
}

export const updateUptime = () => {
    if (!state.uptime) return

    let {position, address, score, rate, group, positions} = state.uptime
    let {explorer = ""} = config

    const elUptimePosition = $("#uptime-position")
    const elUptimePositionIcon = $("#position-icon")
    const elUptimeRate = $("#uptime-rate")
    const elUptimeScore = $("#uptime-score")
    const elUptimeAddress = $("#uptime-key")
    const elUptimeRange = $("#uptime-position-range")

    if (address) {
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

        if (positions.length === 0) {
            positions = [0,0]
        }

        address = address.trim()

        elUptimePosition.text(position).removeClassBy("label-").addClass(`label-${color}`)
        elUptimePositionIcon.removeClassBy("label-").removeClassBy("mif-").addClass(`label-${color}`).addClass(`mif-${icon}`)
        elUptimeRate.text((parseFloat(rate)) + "%")
        elUptimeScore.text(Number(score).format(0, null, " ", "."))
        elUptimeAddress.html(
            $("<a>")
                .addClass("big-value no-decor")
                .attr("href", (explorer.toLowerCase() === "mina" ? MINA_EXPLORER : STAKETAB_EXPLORER) + address)
                .html(`<span class='reduce-1'>${shortAddress(address)}</span>`)
        )
        elUptimeRange.html(`${positions[0]} .. ${positions[positions.length - 1]}`)
    } else {
        elUptimePosition.html("<span class='mif-infinite'>").removeClassBy("label-").addClass(`label-normal`)
        elUptimePositionIcon.removeClassBy("label-").removeClassBy("mif-").addClass(`label-normal`).addClass(`mif-infinite`)
        elUptimeRate.text("NONE")
        elUptimeScore.text("NONE")
        elUptimeAddress.html("NONE")
        elUptimeRange.html(`0 .. 0`)
    }
}