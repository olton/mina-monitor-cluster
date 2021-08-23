import {getFakeTriplets} from "../helpers/utils";
import {histogramOptions} from "../helpers/charts";

export const processNodePeers = (i, node, data) => {
    if (!data) return

    const peersCount = data.length
    const id = `#node-${i+1}`
    const elPeersCount = $(`${id} .peers-count`)
    const elPeersChart = $(`${id} .peers-chart`)

    if (!charts[i].peersChart) {
        charts[i].peersChart = chart.histogramChart(elPeersChart[0], [
            getFakeTriplets(20, 40, 60, 1)
        ], {
            ...histogramOptions,
            height: 65,
            bars: [{
                name: "Peers",
                stroke: '#fff',
                color: Metro.colors.toRGBA('#00AFF0', .5)
            }],
        })
    }

    charts[i].peersChartStartPoint += 10
    charts[i].peersChart.add(0, [charts[i].peersChartStartPoint - 10, charts[i].peersChartStartPoint, peersCount], true)

    elPeersCount.html(peersCount)
}