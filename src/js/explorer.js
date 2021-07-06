import {getAPIData, getInfo} from "./helpers/get-info"
import {imgStop, imgOk} from "./helpers/consts"

const EXPLORER_API = `https://api.minaexplorer.com`

export const getExplorerAPIInfo = async (path) => {
    return await getAPIData(`${EXPLORER_API}/${path}`)
}

export const getExplorerSummary = async () => {
    const elLog = $("#query-explorer")

    elLog.html(imgStop)

    const data = await getExplorerAPIInfo('summary')

    if (data && !isNaN(data.blockchainLength)) {
        const {blockchainLength: height} = data
        const elExplorerHeight = $(".explorer-height")

        globalThis.Monitor.explorerHeight = +height
        elExplorerHeight.html(height)

        elLog.html(imgOk)
    }

    setTimeout(()=> getExplorerSummary(), globalThis.Monitor.config.intervals.daemon)
}