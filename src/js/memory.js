import {getInfo} from "./helpers/get-info"

export const getMemoryInfo = async (index, node) => {
    const data = await getInfo(node, 'mem')
    const elTotalMem = $(`#node-${index+1} .total-mem`)
    const elFreeMem = $(`#node-${index+1} .free-mem`)
    const elUsedMem = $(`#node-${index+1} .used-mem`)
    const elMemIndicators = $(`#node-${index+1} .memory-indicators`)

    elMemIndicators.removeClass("bg-warning bg-alert")

    if (data) {
        const memUsage = data.used / (1024 ** 3)
        const memFree = data.free / (1024 ** 3)
        const memTotal = data.total / (1024 ** 3)
        const memPercent = Math.round(data.used * 100 / data.total)

        globalThis.Monitor.charts[index].memoryChart.setBoundaries({maxY: memTotal})
        globalThis.Monitor.charts[index].memoryChart.add(0, [datetime().time() - 2000, memTotal], true)
        globalThis.Monitor.charts[index].memoryChart.add(1, [datetime().time() - 2000, memUsage], true)

        elTotalMem.html(Math.round(memTotal))
        elFreeMem.html(Math.round(memFree))
        elUsedMem.html(Math.round(memUsage))

        if (memPercent >= 80 && memPercent < 90) {
            elMemIndicators.addClass("bg-warning")
        }

        if (memPercent >= 90) {
            elMemIndicators.addClass("bg-alert")
        }
    }

    setTimeout(() => getMemoryInfo(index, node), globalThis.Monitor.config.intervals.resources)
}