import {getInfo} from "./helpers/get-info"

export const getMemoryInfo = async (index, node) => {
    const data = await getInfo(node, 'mem')
    const elTotalMem = $(`#node-${index+1} .total-mem`)
    const elFreeMem = $(`#node-${index+1} .free-mem`)
    const elUsedMem = $(`#node-${index+1} .used-mem`)
    const elMemIndicators = $(`#node-${index+1} .memory-indicators`)
    const elProcessMem = $(`#node-${index+1} .process-mem`)
    const elNodeMem = $(`#node-${index+1} .node-mem`)

    elMemIndicators.removeClass("bg-warning bg-alert")

    if (data) {
        const memUsage = data.used / (1024 ** 3)
        const memFree = data.free / (1024 ** 3)
        const memTotal = data.total / (1024 ** 3)
        const memPercent = Math.round(data.used * 100 / data.total)
        const processMem = !data.process ? 0 : data.process.heapUsed / 1024 ** 2

        globalThis.Monitor.charts[index].memoryChart.setBoundaries({maxY: memTotal})
        globalThis.Monitor.charts[index].memoryChart.add(0, [datetime().time() - 2000, memTotal], true)
        globalThis.Monitor.charts[index].memoryChart.add(1, [datetime().time() - 2000, memUsage], true)

        if (globalThis.Monitor.charts[index].memProcessChart.options.boundaries.maxY < processMem * 2)
            globalThis.Monitor.charts[index].memProcessChart.setBoundaries({maxY: processMem * 2})
        globalThis.Monitor.charts[index].memProcessChart.add(0, [datetime().time() - 2000, processMem], true)

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

    setTimeout(getMemoryInfo, globalThis.Monitor.config.intervals.resources, index, node)
}