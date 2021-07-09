import {getInfo} from "./helpers/get-info";

export const getNetworkInfo = async (index, node) => {
    let net = await getInfo(node,'net-stat')

    if (net) {
        const tx = Math.round(net[0].tx_sec)
        const rx = Math.round(net[0].rx_sec)
        globalThis.Monitor.charts[index].txChart.add(0, [datetime().time(), tx], true, {maxX: true, maxY: true})
        globalThis.Monitor.charts[index].rxChart.add(0, [datetime().time(), rx], true, {maxX: true, maxY: true})

        let speedTitleTx = 'Kb'
        let speedTitleRx = 'Kb'
        let speedTx = tx / 1024
        let speedRx = rx / 1024
        if (speedTx > 100) {
            speedTx /= 1024
            speedTitleTx = 'Mb'
        }
        if (speedRx > 100) {
            speedRx /= 1024
            speedTitleRx = 'Mb'
        }

        $(`#node-${index+1} .tx-count`).html(`${(speedTx).toFixed(parseInt(speedTx) === 0 ? 1 : 0)}<span class="reduce-2 mt-2-minus text-normal">${speedTitleTx}</span>`)
        $(`#node-${index+1} .rx-count`).html(`${(speedRx).toFixed(parseInt(speedRx) === 0 ? 1 : 0)}<span class="reduce-2 mt-2-minus text-normal">${speedTitleRx}</span>`)
    }

    setTimeout(()=> getNetworkInfo(index, node), globalThis.Monitor.config.intervals.resources)

}