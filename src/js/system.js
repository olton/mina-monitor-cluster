import {getInfo} from "./helpers/get-info"

export const getSystemInfo = async (index, node) => {
    let cpuInfo = await getInfo(node, 'cpu')
    let platformInfo = await getInfo(node,'platform')
    let time = await getInfo(node,'time'), uptime

    if (cpuInfo) {
        $(`#node-${index+1} .cpu-info`).html(cpuInfo.model)
    }

    if (platformInfo) {
        $(`#node-${index+1} .os-info`).html(platformInfo.osVersion)
    }

    if (time) {
        uptime = Metro.utils.secondsToTime(time.uptime)
        $(`#node-${index+1} .server-time`).text(datetime(time.time).format("DD-MM-YYYY HH:mm"))
        $(`#node-${index+1} .server-uptime`).text(`${uptime.d}d, ${uptime.h}h ${uptime.m}m`)
    }

    setTimeout(getSystemInfo, globalThis.Monitor.config.intervals.system, index, node)
}