import {getFakeData, getFakeTriplets} from "../helpers/utils";
import {chartOptions, histogramOptions} from "../helpers/charts";

export const processResponse = (i, node, data) => {
    if (!data) return

    const responseTime = data/1000
    const id = `#node-${i+1}`
    const elResponseTime = $(`${id} .node-response-time`)
    const elResponseChart = $(`${id} .node-response-chart`)
    const elResponseCount = $(`${id} .response-count`)

    elResponseTime.html(responseTime.toFixed(1) + "s")

    let countTitle = "sec"
    let countVal = responseTime

    if (countVal > 60) {
        countVal /= 60
        countTitle = "min"
    }
    elResponseCount.html(countVal.toFixed(1) + `<span class='reduce-2 mt-2-minus text-normal'>${countTitle}</span>`)

    elResponseTime.removeClass("success yellow-warning warning alert")
    if (responseTime <= 1) {
        elResponseTime.addClass("success")
    }
    if (Metro.utils.between(responseTime, 1, 5)) {
        elResponseTime.addClass("yellow-warning")
    }
    if (Metro.utils.between(responseTime, 5, 10)) {
        elResponseTime.addClass("warning")
    }
    if (responseTime >= 10) {
        elResponseTime.addClass("alert")
    }

    if (!charts[i].responseChart) {
        charts[i].responseChart = chart.histogramChart(elResponseChart[0], [
            getFakeTriplets(20, 40, 60, 1)
        ], {
            ...histogramOptions,
            background: chartBackground,
            axis: {
                x: {
                    line: {
                        color: chartLineColor
                    }
                },
                y: {
                    line: {
                        color: chartLineColor
                    }
                },
            },
            height: 65,
            padding: 0,
            boundaries: {
                maxY: 60
            },
            bars: [{
                name: "Resp time",
                stroke: 'transparent',
                color: Metro.colors.toRGBA("#ff1493", .5)
            }],
            legend: false
        })
    }

    charts[i].responseChartStartPoint += 10
    charts[i].responseChart.add(0, [charts[i].responseChartStartPoint - 10, charts[i].responseChartStartPoint, responseTime], true)
}