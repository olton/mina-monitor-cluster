import {shortAddress} from "../helpers/utils";

export const processVersion = (i, node, data) => {
    if (!data) return

    const id = `#node-${i+1}`
    const elVersionNumber = $(`${id} .mina-version`)

    elVersionNumber.html(shortAddress(data, 7))
}

export const processMonitorVersion = (i, node, data) => {
    if (!data) return

    const id = `#node-${i+1}`
    const elVersionNumber = $(`${id} .monitor-version`)

    elVersionNumber.html(data)
}