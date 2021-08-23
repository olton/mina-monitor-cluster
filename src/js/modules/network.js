import {getFakeData} from "../helpers/utils";
import {chartOptions} from "../helpers/charts";

export const processNetStat = (i, node, data) => {
    if (!data) return

    const id = `#node-${i+1}`
    const elTxChart = $(`${id} .tx-chart`)
    const elRxChart = $(`${id} .rx-chart`)
    const elTxCount = $(`${id} .tx-count`)
    const elRxCount = $(`${id} .rx-count`)

    const [net] = data

    if (!charts[i].txChart) {
        charts[i].txChart = chart.areaChart(elTxChart[0], [
            getFakeData(100)
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
    }

    if (!charts[i].rxChart) {
        charts[i].rxChart = chart.areaChart(elRxChart[0], [
            getFakeData(100)
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
    }

    const tx = Math.round(net.tx_sec)
    const rx = Math.round(net.rx_sec)
    charts[i].txChart.add(0, [datetime().time(), tx], true, {maxX: true, maxY: true})
    charts[i].rxChart.add(0, [datetime().time(), rx], true, {maxX: true, maxY: true})

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

    elTxCount.html(`${(speedTx).toFixed(parseInt(speedTx) === 0 ? 1 : 0)}<span class="reduce-2 mt-2-minus text-normal">${speedTitleTx}</span>`)
    elRxCount.html(`${(speedRx).toFixed(parseInt(speedRx) === 0 ? 1 : 0)}<span class="reduce-2 mt-2-minus text-normal">${speedTitleRx}</span>`)

}

export const processNetConn = (i, node, data) => {
    if (!data) return

    const id = `#node-${i+1}`

}
