import {getAPIData} from "./helpers/get-info"
import {imgStop, imgOk} from "./helpers/consts"
import {shortAddress} from "./helpers/utils";

export const getUptime = async () => {
    const {blockSpeed, config} = globalThis.Monitor
    const {address, update_interval = 180000} = config.uptime
    const url = `https://minastake.com/utils/uptime.php?publicKey=${address}`
    const elLog = $("#query-uptime")
    let interval

    if (!address) {
        elLog.html(imgOk)
        return
    }

    elLog.html(imgStop)

    const uptime = await getAPIData(url)

    if (uptime) {
        let [position, publicKey, score, rate] = uptime
        let color = "neutral", icon = "infinite"

        if (Metro.utils.between(position, 0, 75)) {
            color = 'success'
            icon = 'checkmark'
        } else if (Metro.utils.between(position, 75, 100, true)) {
            color = 'warning'
            icon = 'warning'
        } else if (Metro.utils.between(position, 101, 120, true)) {
            color = 'alert'
            icon = 'bin'
        }

        $("#uptime-position").text(position).removeClassBy("label-").addClass(`label-${color}`)
        $("#position-icon").removeClassBy("label-").removeClassBy("mif-").addClass(`label-${color}`).addClass(`mif-${icon}`)
        $("#uptime-rate").text((parseFloat(rate)) + "%")
        $("#uptime-score").text(score)
        $("#uptime-key").html( shortAddress(publicKey) )

        elLog.html(imgOk)
        interval = blockSpeed ? blockSpeed : update_interval
    } else {
        interval = 0
    }

    setTimeout( () => getUptime(), interval)
}