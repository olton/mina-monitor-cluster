import {shortAddress} from "../helpers/utils";
import {MINA_EXPLORER, MINATAUR_EXPLORER} from "../helpers/consts";
import {areaDefaultOptions} from "../helpers/charts";

export const processUptime = (i, node, data) => {
    if (!data) return

    state.uptime = data
}

export const updateUptime = () => {
    if (!state.uptime) return

    const {uptime_snark, uptime_sidecar, uptime_line_sidecar_avg, uptime_line_sidecar_avg_48, uptime_line_snark_avg, uptime_line_snark_avg_48} = state.uptime
    const {position, score, score_percent, timestamp} = uptime_snark
    const {position: sc_position, score: sc_score, score_percent: sc_score_percent} = uptime_sidecar
    const {explorer = ""} = config
    const address = uptime_snark.public_key.trim()

    const elUptimePosition = $("#uptime-position")
    const elUptimePositionIcon = $("#position-icon")
    const elUptimeRate = $("#uptime-rate")
    const elUptimeScore = $("#uptime-score")
    const elUptimeAddress = $("#uptime-key")
    const elUptimePositionSidecar = $("#uptime-position-sidecar")
    const elUptimeScoreSidecar = $("#uptime-score-sidecar")
    const elUptimeScorePercentSidecar = $("#uptime-rate-sidecar")
    const elUptimeUpdated = $("#uptime-updated")

    if (address) {
        let color = "neutral", icon = "infinite", pos_color = 'fg-green'

        if (Metro.utils.between(position, 0, 150, true)) {
            color = 'success'
            icon = 'checkmark'
        } else if (Metro.utils.between(position, 151, 200, true)) {
            color = 'warning'
            icon = 'warning'
            pos_color = 'fg-orange'
        } else if (Metro.utils.between(position, 201, 240, true)) {
            color = 'alert'
            icon = 'bin'
            pos_color = 'fg-red'
        }

        elUptimePosition.text(position).removeClassBy("fg-").addClass(`${pos_color}`)
        elUptimePositionIcon.removeClassBy("label-").removeClassBy("mif-").addClass(`label-${color}`).addClass(`mif-${icon}`)
        elUptimeRate.text((parseFloat(score_percent)) + "%")
        elUptimeScore.text(Number(score).format(0, null, " ", "."))
        elUptimeAddress.html(
            $("<a>")
                .addClass("big-value no-decor")
                .attr("href", (explorer.toLowerCase() === "mina" ? MINA_EXPLORER : MINATAUR_EXPLORER) + address)
                .html(`<span class='reduce-1'>${shortAddress(address)}</span>`)
        )

        elUptimeUpdated.html(datetime(timestamp).format("DD MMM HH:mm"))
        elUptimePositionSidecar.html(`${sc_position}`)
        elUptimeScoreSidecar.html(`${sc_score}`)
        elUptimeScorePercentSidecar.html(`${sc_score_percent}%`)

        drawUptimeLine({
            snark: [uptime_line_snark_avg, uptime_line_snark_avg_48],
            sidecar: [uptime_line_sidecar_avg, uptime_line_sidecar_avg_48],
        })
    } else {
        elUptimePosition.html("<span class='mif-infinite'>").removeClassBy("label-").addClass(`label-normal`)
        elUptimePositionIcon.removeClassBy("label-").removeClassBy("mif-").addClass(`label-normal`).addClass(`mif-infinite`)
        elUptimeRate.text("NONE")
        elUptimeScore.text("NONE")
        elUptimeAddress.html("NONE")
        elUptimeUpdated.html(`no time`)
    }
}

export const drawUptimeLine = data => {
    if (!data || !data.snark) {
        return
    }

    const index = 1
    const {snark, sidecar} = data
    const snarkPoints = []
    const sidecarPoints = []
    const snarkData = snark[index].reverse()
    const sidecarData = sidecar[index].reverse()
    let borderTop = 1, borderBottom = 240

    for(let r of snarkData) {
        if (+r.position > +borderBottom) borderBottom = +r.position + 20
    }

    for(let r of sidecarData) {
        if (+r.position > +borderBottom) borderBottom = +r.position + 20
    }

    $("#uptime-line-top").text(borderTop)
    $("#uptime-line-bottom").text(borderBottom)

    for(let r of snarkData) {
        let x = datetime(r.timestamp).time()
        let y = borderBottom - r.position

        snarkPoints.push([x, y])
    }

    for(let r of sidecarData) {
        let x = datetime(r.timestamp).time()
        let y = borderBottom - r.position

        sidecarPoints.push([x, y])
    }

    const lines = [
        {
            name: "snark",
            dots: {
                size: 1,
                type: 'circle'
            },
            size: 2
        },
        {
            name: "sidecar",
            dots: {
                size: 1,
                type: 'circle'
            },
            size: 2
        }
    ]

    chart.lineChart("#uptime-line", [snarkPoints, sidecarPoints], {
        ...areaDefaultOptions,
        height: 55,
        padding: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 16
        },
        lines,
        // legend: false,
        colors: [Metro.colors.toRGBA('#d06714', 1), Metro.colors.toRGBA('#7528d2', 1)],
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
            <span>Avg pos:</span>
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