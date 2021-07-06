import {getInfo} from "./helpers/get-info";

export const getNetworkInfo = async (index, node) => {
    let net = await getInfo(node,'net-stat')

    if (net) {
        globalThis.Monitor.charts[index].txChart.add(0, [datetime().time(), Math.round(net[0].tx_sec)], true, {maxX: true, maxY: true})
        globalThis.Monitor.charts[index].rxChart.add(0, [datetime().time(), Math.round(net[0].rx_sec)], true, {maxX: true, maxY: true})

        $("#all-traffic").text( ((Math.round(net[0].rx_sec) + Math.round(net[0].tx_sec)) / 1024 / 1024).toFixed(2) )
    }

    setTimeout(()=> getNetworkInfo(index, node), globalThis.Monitor.config.intervals.resources)

}