import {getNodeStatus} from "./node";
import {getMemoryInfo} from "./memory";
import {getFakeData, getFakeTriplets} from "./helpers/utils";
import {getCpuInfo} from "./cpu";
import {chartOptions, gaugeOptions} from "./helpers/charts";
import {getNetworkInfo} from "./network";
import {getSystemInfo} from "./system";

export const nodeController = async (index, node) => {
    let template, clone, target

    template = document.querySelector("#node-template")
    template.content.querySelector(".panel").setAttribute("data-title-caption", node.name.toUpperCase())
    clone = document.importNode(template.content, true)
    target = document.querySelector(`#node-${index + 1}`)

    target.appendChild(clone)

    const elMemoryChart = $(`#node-${index + 1} .memory-fill`)
    globalThis.Monitor.charts[index].memoryChart = chart.areaChart(elMemoryChart[0], [
        getFakeData(40),
        getFakeData(40)
    ], {
        ...chartOptions,
        height: 140,
        legend: false,
        colors: [Metro.colors.toRGBA('#7dc37b', .5), Metro.colors.toRGBA('#aa00ff', .5)],
        areas: [
            {
                name: "Free"
            },
            {
                name: "Used"
            }
        ]
    })

    const elCpuChart = $(`#node-${index + 1} .cpu-fill`)
    globalThis.Monitor.charts[index].cpuChart = chart.areaChart(elCpuChart[0], [
        getFakeData(40)
    ], {
        ...chartOptions,
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

    const elTxChart = $(`#node-${index + 1} .tx-chart`)
    globalThis.Monitor.charts[index].txChart = chart.areaChart(elTxChart[0], [
        getFakeData(40)
    ], {
        ...chartOptions,
        height: 65,
        boundaries: {
            maxY: 0
        },
        colors: [Metro.colors.toRGBA('#00AFF0', .5)],
        areas: [
            {
                name: "Tx"
            }
        ]
    })

    const elRxChart = $(`#node-${index + 1} .rx-chart`)
    globalThis.Monitor.charts[index].rxChart = chart.areaChart(elRxChart[0], [
        getFakeData(40)
    ], {
        ...chartOptions,
        height: 65,
        boundaries: {
            maxY: 0
        },
        colors: [Metro.colors.toRGBA('#aa00ff', .5)],
        areas: [
            {
                name: "Rx"
            }
        ]
    })

    const elPeersChart = $(`#node-${index + 1} .peers-chart`)
    globalThis.Monitor.charts[index].peersChartStartPoint = 200
    globalThis.Monitor.charts[index].peersChart = chart.histogramChart(elPeersChart[0], [
        getFakeTriplets(20, 40, 60, 1)
    ], {
        height: 140,
        bars: [{
            name: "Peers",
            stroke: '#fff',
            color: Metro.colors.toRGBA('#00AFF0', .5)
        }],
        boundaries: {
            maxY: 100,
            minY: 0
        },
        graphSize: 20,
        legend: false,
        axis: {
            x: {
                line: {
                    color: "#fafbfc",
                    shortLineSize: 0
                },
                label: {
                    count: 10,
                    color: "#24292e",
                },
                arrow: false
            },
            y: {
                line: {
                    color: "#fafbfc"
                },
                label: {
                    count: 10,
                    font: {
                        size: 10
                    },
                    color: "#24292e",
                    skip: 2,
                    fixed: 0
                },
                arrow: false,
            }
        },
        padding: 1,
        border: {
            color: "transparent"
        },
        onDrawLabelX: () => "",
        onDrawLabelY: () => ""
    })

    setTimeout(() => getSystemInfo(index, node), 0)
    setTimeout(() => getMemoryInfo(index, node), 0)
    setTimeout(() => getCpuInfo(index, node), 0)
    setTimeout(() => getNetworkInfo(index, node), 0)
    setTimeout(() => getNodeStatus(index, node), 0)
}