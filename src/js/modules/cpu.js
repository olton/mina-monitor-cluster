import {getFakeData} from "../helpers/utils";
import {chartOptions} from "../helpers/charts";

export const processCpuLoad = (i, node, data) => {
    if (!data) return

    const id = `#node-${i+1}`
    const elCpuLoad = $(`${id} .cpu-load`)
    const elContainer = elCpuLoad.parent()
    const elCpuLoadAvg = $(`${id} .load-avg`)
    const elCpuChart = $(`${id} .cpu-fill`)
    const elCpuCoresChart = $(`${id} .cpu-cores-fill`)

    let {load = 0, user = 0, sys = 0, loadavg = [0, 0, 0], threads = []} = data

    if (!charts[i].cpuChart) {
        charts[i].cpuChart = chart.areaChart(elCpuChart[0], [
            getFakeData(100)
        ], {
            ...chartOptions,
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
            height: 55,
            legend: false,
            boundaries: {
                maxY: 100
            },
            colors: [Metro.colors.toRGBA('#00AFF0', .5)],
            areas: [
                {
                    name: "CPU"
                }
            ]
        })
    }

    charts[i].cpuChart.add(0, [datetime().time(), load], true)

    if (!charts[i].cpuCores) {
        charts[i].cpuCores = chart.segment(elCpuCoresChart[0], threads, {
            height: 80,
            background: chartBackground,
            padding: 0,
            margin: 0,
            segment: {
                rowDistance: 4,
                count: 30
            },
            colors: [[70, '#60a917'], [90, '#f0a30a'], [100, '#a20025']],
            border: {
                color: "transparent"
            },
            ghost: {
                color: darkMode ? "rgba(125, 195, 123, .1)" : "#f0f6fc"
            }
        })
        elCpuCoresChart.css({
            marginTop: -5
        })
    }

    threads.forEach( (v, k) => {
        charts[i].cpuCores.setData(v, k)
    })

    elCpuLoad.html(`${load}`)
    elCpuLoadAvg.html(`<span class="text-bold fg-accent">${loadavg[0]}</span>, <span>${loadavg[1]}</span>, <span>${loadavg[2]}</span>`)

    elContainer.removeClass("bg-alert")
    if (load > 85) {
        elContainer.addClass("bg-alert")
    }
}

export const processCpuTemp = (i, node, data) => {
    if (!data) return

    const id = `#node-${i+1}`
    const elCpuTemp = $(`${id} .cpu-temp`)
    const elContainer = elCpuTemp.parent()

    let length = data.cores.length
    let tempAvg = length ? (data.cores.reduce((acc, v)=>acc+ +v, 0) / length).toFixed(0) : data.main

    if (isNaN(tempAvg)) tempAvg = "-"

    elCpuTemp.html(tempAvg)
    elContainer.removeClass("bg-alert")

    if (tempAvg > 85) {
        elContainer.addClass("bg-alert")
    }
}