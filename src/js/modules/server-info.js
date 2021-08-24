export const processServerInfo = (i, node, data) => {
    if (!data) return
    const {hostname, osVersion, platform, release, type, version} = data
    const id = `#node-${i+1}`
    const elOsInfo = $(`${id} .os-info`)
    const elHostname = $(`${id} > .panel > .panel-title > .caption`)

    elOsInfo.html(osVersion)
    elHostname.html(hostname.split(".")[0])
}

export const processServerCpu = (i, node, data) => {
    if (!data) return
    const {model, cores} = data
    const id = `#node-${i+1}`
    const elCpuInfo = $(`${id} .cpu-info`)
    const elCpuCores = $(`${id} .cores-count`)

    elCpuInfo.html(model)
    elCpuCores.html(cores/2)
}

export const processServerTime = (i, node, data) => {
    if (!data) return

    let {time, uptime} = data
    const id = `#node-${i+1}`
    const elServerTime = $(`${id} .server-time`)
    const elServerUptime = $(`${id} .server-uptime`)

    uptime = Metro.utils.secondsToTime(uptime)

    elServerTime.html(datetime(time).format("DD-MM-YYYY HH:mm"))
    elServerUptime.html(`${uptime.d}d, ${uptime.h}h ${uptime.m}m`)
}