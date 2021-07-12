import {getInfo} from "./helpers/get-info";

export const getCpuInfo = async (index, node) => {
    let data = await getInfo(node,'cpu-load')
    let threadsCount = 0, coresCount = 0, cpuTemp = 0, cpuLoad = 0

    const elCpuLoad = $(`#node-${index+1} .cpu-load`)
    const elCoresCount = $(`#node-${index+1} .cores-count`)
    const elCpuTemp = $(`#node-${index+1} .cpu-temp`)
    const elCpuCoresChart = $(`#node-${index+1} .cpu-cores-fill`)
    const elCpuLoadAvg = $(`#node-${index+1} .load-avg`)

    if (data) {
        let {load = 0, user = 0, sys = 0, loadavg = [0, 0, 0], threads = []} = data

        globalThis.Monitor.charts[index].cpuChart.add(0, [datetime().time(), load], true)

        threadsCount = threads.length
        cpuLoad = load

        if (!globalThis.Monitor.charts[index].cpuCoresChart) {
            globalThis.Monitor.charts[index].cpuCoresChart = chart.segment(elCpuCoresChart[0], threads, {
                height: 80,
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
                    color: "#f0f6fc"
                }
            })
            elCpuCoresChart.css({
                marginTop: -5
            })
        } else {
            threads.forEach( (v, i) => {
                globalThis.Monitor.charts[index].cpuCoresChart.setData(v, i)
            })
        }

        elCpuLoadAvg.html(`[<span class="text-bold">${loadavg[0]}</span>, <span>${loadavg[1]}</span>, <span>${loadavg[2]}</span>]`)
    }

    let temp = await getInfo(node,"cpu-temp")

    if (temp && temp.main) {
        let tempAvg = (temp.cores.reduce((acc, v)=>acc+ +v, 0) / temp.cores.length).toFixed(0)

        coresCount = temp.cores.length
        cpuTemp = tempAvg
    }

    elCpuLoad.html(`${cpuLoad}`)
    elCoresCount.html(`${coresCount || threadsCount}`)
    elCpuTemp.html(`${cpuTemp}`)

    elCpuLoad.parent().removeClass("bg-alert")
    if (cpuLoad > 85) {
        elCpuLoad.parent().addClass("bg-alert")
    }

    elCpuTemp.parent().removeClass("bg-alert")
    if (cpuTemp > 85) {
        elCpuTemp.parent().addClass("bg-alert")
    }

    setTimeout(getCpuInfo, globalThis.Monitor.config.intervals.resources, index, node)
}