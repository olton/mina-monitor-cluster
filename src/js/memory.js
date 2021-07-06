import {getInfo} from "./helpers/get-info"
import {imgOk, imgStop} from "./helpers/consts"
import {gaugeOptions} from "./helpers/charts";

export const getMemoryInfo = async (index, node) => {
    const data = await getInfo(node, 'mem')

    if (data) {
        const memUsage = data.used / (1024 ** 3)
        const memFree = data.free / (1024 ** 3)
        const memTotal = data.total / (1024 ** 3)

        globalThis.Monitor.charts[index].memoryChart.setBoundaries({maxY: memTotal})
        globalThis.Monitor.charts[index].memoryChart.add(0, [datetime().time() - 2000, memTotal], true)
        globalThis.Monitor.charts[index].memoryChart.add(1, [datetime().time() - 2000, memUsage], true)

        $(`#node-${index+1} .total-mem`).html(Math.ceil(memTotal))
        $(`#node-${index+1} .free-mem`).html(Math.ceil(memFree))
        $(`#node-${index+1} .used-mem`).html(Math.ceil(memUsage))
    }

    setTimeout(() => getMemoryInfo(index, node), globalThis.Monitor.config.intervals.resources)
}