import {getInfo} from "./helpers/get-info"
import {countRequest, switchNode} from "./switch-node"
import {imgOk, imgStop} from "./helpers/consts"
import {parseTime} from "./helpers/parse-time";

export const getNextBlock = async () => {
    let reload
    const node = globalThis.Monitor.config.nodes[globalThis.Monitor.currentNode]
    const elNextBlock = $(".next-block-countdown")
    const elNextBlockText = $(".next-block-text")
    const elLog = $("#query-next-block")

    if (globalThis.Monitor.noSlots) {
        elNextBlock.html(`<span class="text-bold">None this epoch :(</span>`)
        elLog.html(imgOk)
        return
    }

    elLog.html(imgStop)

    const status = await getInfo(node, 'node-status')

    if (status) {
        const node = status.data
        const daemon = node.daemonStatus

        const {
            syncStatus,
            nextBlockProduction
        } = daemon

        const times = nextBlockProduction ? nextBlockProduction.times : []

        if (times.length) {
            const blockDate = datetime(+times[0].startTime)

            if (globalThis.Monitor.nextBlock !== blockDate) {
                elNextBlockText.html(blockDate.format("ddd, DD MMM, HH:mm"))
                elNextBlock.clear()
                const countdown = $("<div>").attr("data-role", "countdown").attr("data-date", blockDate).attr("data-animate", "none").appendTo(elNextBlock)
                Metro.makePlugin(countdown, "countdown")
                globalThis.Monitor.nextBlock = blockDate
            }
        } else {
            elNextBlockText.html("")
            elNextBlock.html(`<span class="text-bold">${syncStatus === 'BOOTSTRAP' ? 'No data available' : 'None this epoch :('}</span>`)
            if (syncStatus !== 'BOOTSTRAP') {
                globalThis.Monitor.noSlots = true
            }
        }

        elLog.html(imgOk)
        reload = parseTime(globalThis.Monitor.config.intervals.daemon)
        countRequest()
    } else {
        reload = 0
        switchNode()
    }

    setTimeout(getNextBlock, reload)
}