import {getFakeData} from "../helpers/utils";
import {chartOptions} from "../helpers/charts";

export const processMem = (i, node, data) => {
    if (!data) return

    const id = `#node-${i+1}`
    const elMemChart = $(`${id} .memory-node`)
    const elProcessChart = $(`${id} .memory-process`)
    const elTotalMem = $(`${id} .total-mem`)
    const elFreeMem = $(`${id} .free-mem`)
    const elUsedMem = $(`${id} .used-mem`)
    const elMemIndicators = $(`${id} .memory-indicators`)
    const elProcessMem = $(`${id} .process-mem`)
    const elNodeMem = $(`${id} .node-mem`)

    elMemIndicators.removeClass("bg-warning bg-alert")

    const memUsage = data.used / (1024 ** 3)
    const memFree = data.free / (1024 ** 3)
    const memTotal = data.total / (1024 ** 3)
    const memPercent = Math.round(data.used * 100 / data.total)
    const processMem = !data.process ? 0 : data.process.heapUsed / 1024 ** 2

    if (!globalThis.charts[i].memChart) {
        globalThis.charts[i].memChart = chart.areaChart(elMemChart[0], [
            getFakeData(100),
            getFakeData(100)
        ], {
            ...chartOptions,
            height: 80,
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
    }

    globalThis.charts[i].memChart.setBoundaries({maxY: memTotal})
    globalThis.charts[i].memChart.add(0, [datetime().time() - 2000, memTotal], true)
    globalThis.charts[i].memChart.add(1, [datetime().time() - 2000, memUsage], true)

    if (!globalThis.charts[i].memProcess) {
        globalThis.charts[i].memProcess = chart.lineChart(elProcessChart[0], [
            getFakeData(100)
        ], {
            ...chartOptions,
            height: 50,
            legend: false,
            background: "rgba(236,236,236,0.2)",
            boundaries: {
                maxY: 50
            },
            colors: [Metro.colors.toRGBA('#7b68ee', .5)],
            lines: [
                {
                    name: "Process",
                    size: 2
                }
            ]
        })
    }

    if (globalThis.charts[i].memProcess.options.boundaries.maxY < processMem * 2)
        globalThis.charts[i].memProcess.setBoundaries({maxY: processMem * 2})
    globalThis.charts[i].memProcess.add(0, [datetime().time() - 2000, processMem], true)

    elTotalMem.html(Math.ceil(memTotal))
    elFreeMem.html(Math.round(memFree))
    elUsedMem.html(Math.round(memPercent))
    elProcessMem.html(processMem.toFixed(2))
    elNodeMem.html(memUsage.toFixed(2))

    if (memPercent >= 80 && memPercent < 90) {
        elMemIndicators.addClass("bg-warning")
    }

    if (memPercent >= 90) {
        elMemIndicators.addClass("bg-alert")
    }
}