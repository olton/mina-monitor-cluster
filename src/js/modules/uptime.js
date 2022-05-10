import {shortAddress} from "../helpers/utils";
import {MINA_EXPLORER, MINATAUR_EXPLORER} from "../helpers/consts";
import {areaDefaultOptions} from "../helpers/charts";

export const processUptime = (i, node, data) => {
    if (!data) return

    // if (!state.uptime || state.uptime.timestamp < data.timestamp)
        state.uptime = data
}

export const updateUptime = () => {
    if (!state.uptime) return

    console.log(state.uptime)

    let {position, public_key: address, score, rate, range} = state.uptime.uptime
    let {explorer = ""} = config

    const elUptimePosition = $("#uptime-position")
    const elUptimePositionIcon = $("#position-icon")
    const elUptimeRate = $("#uptime-rate")
    const elUptimeScore = $("#uptime-score")
    const elUptimeAddress = $("#uptime-key")
    const elUptimeRange = $("#uptime-position-range")
    const elUptimeUpdated = $("#uptime-updated")

    if (address) {
        let color = "neutral", icon = "infinite"

        if (Metro.utils.between(position, 0, 150, true)) {
            color = 'success'
            icon = 'checkmark'
        } else if (Metro.utils.between(position, 151, 200, true)) {
            color = 'warning'
            icon = 'warning'
        } else if (Metro.utils.between(position, 201, 240, true)) {
            color = 'alert'
            icon = 'bin'
        }

        address = address.trim()

        elUptimePosition.text(position).removeClassBy("label-").addClass(`label-${color}`)
        elUptimePositionIcon.removeClassBy("label-").removeClassBy("mif-").addClass(`label-${color}`).addClass(`mif-${icon}`)
        elUptimeRate.text((parseFloat(rate)) + "%")
        elUptimeScore.text(Number(score).format(0, null, " ", "."))
        elUptimeAddress.html(
            $("<a>")
                .addClass("big-value no-decor")
                .attr("href", (explorer.toLowerCase() === "mina" ? MINA_EXPLORER : MINATAUR_EXPLORER) + address)
                .html(`<span class='reduce-1'>${shortAddress(address)}</span>`)
        )
        elUptimeRange.html(`${range.min} .. ${range.max}`)
        elUptimeUpdated.html(datetime().format("DD-MM-YYYY HH:mm"))

        drawUptimeLine(state.uptime.line)
    } else {
        elUptimePosition.html("<span class='mif-infinite'>").removeClassBy("label-").addClass(`label-normal`)
        elUptimePositionIcon.removeClassBy("label-").removeClassBy("mif-").addClass(`label-normal`).addClass(`mif-infinite`)
        elUptimeRate.text("NONE")
        elUptimeScore.text("NONE")
        elUptimeAddress.html("NONE")
        elUptimeRange.html(`0 .. 0`)
        elUptimeUpdated.html(`no time`)
    }
}

export const drawUptimeLine = data => {
    if (!data || !data.length) {
        $("#graph-blocks-per-epoch").parent().hide()
        return
    }

    const points = []
    const _data = data.reverse()
    let borderTop = 1, borderBottom = 240

    for(let r of _data) {
        if (+r.position > +borderBottom) borderBottom = +r.position + 20
    }

    $("#uptime-line-top").text(borderTop)
    $("#uptime-line-bottom").text(borderBottom)

    for(let r of _data) {
        let x = datetime(r.time).time()
        let y = borderBottom - r.position

        points.push([x, y])
    }

    const areas = [
        {
            name: "Uptime Line",
            dots: {
                size: 1,
                type: 'circle'
            },
            size: 2
        }
    ]

    chart.lineChart("#uptime-line", [points], {
        ...areaDefaultOptions,
        height: 40,
        padding: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        lines: areas,
        legend: false,
        colors: [Metro.colors.toRGBA('#7528d2', 1)],
        boundaries: {
            minY: 0,
            maxY: borderBottom
        },
        axis: {
            y: {
                line: {
                    color: "#dadada"
                },
                label: {
                    showLabel: false
                }
            },
            x: {
                label: {
                    showLabel: false,
                    skip: 0,
                    count: 30
                }
            }
        },
        type: 'curve',
        arrows: false,
        cross: false,
        onDrawLabelX: (v) => {
            return datetime(+v).format("DD MMM")
        },
        onTooltipShow: (d) => {
            return `
            <span>Pos:</span>
            <span class="text-bold">${borderBottom - d[1]}</span>
            <span>at</span>
            <span class="text-bold">${datetime(d[0]).format(config.format.date)}</span>
        `
        }
    })

    const graph = $("#uptime-graph")
    graph.append(
        $("<div>").addClass("max-graph-value").html(`${borderTop}`)
    )
    graph.append(
        $("<div>").addClass("min-graph-value").html(`${borderBottom}`)
    )
}