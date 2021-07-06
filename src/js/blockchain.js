import {getInfo} from "./helpers/get-info"
import {countRequest, switchNode} from "./switch-node"
import {imgStop, imgOk} from "./helpers/consts"

export const getBlockchain = async () => {
    const elLog = $("#query-blockchain")
    const elEpochCountdown = $("#epoch-countdown")
    let reload
    let {config, currentNode, genesisStart, epochDuration, epochTimer} = globalThis.Monitor
    let node = config.nodes[currentNode]

    elLog.html(imgStop)

    const blockchain = await getInfo(node, 'blockchain')

    if (blockchain && blockchain.data && blockchain.data.bestChain && blockchain.data.bestChain.length) {
        const {
            blockHeight,
            epoch,
            slot,
            slotSinceGenesis,
        } = blockchain.data.bestChain[0].protocolState.consensusState

        if (globalThis.Monitor.epoch !== epoch) {
            epochTimer = false
        }

        globalThis.Monitor.epoch = epoch
        globalThis.Monitor.blockHeight = blockHeight

        $("#slot-number").text(slot)
        $("#slot-since-genesis").text(slotSinceGenesis)
        $("#block-height").text(blockHeight)

        const epochDurationProgress = (+slot * globalThis.Monitor.slotDuration * 100) / globalThis.Monitor.epochDuration
        const progress = Metro.getPlugin('#epoch-number', 'donut')

        progress.val(epochDurationProgress)

        let epochEnd = datetime(genesisStart).addSecond(epochDuration/1000 * (+epoch + 1)).format("YYYY/MM/DD HH:mm")
        let countdown

        if (!epochTimer) {
            elEpochCountdown.find(".countdown").remove()
            countdown = $("<div>").attr("data-role", "countdown").attr("data-date", epochEnd).attr("data-animate", "slide").appendTo(elEpochCountdown)
            Metro.makePlugin(countdown, "countdown")
            globalThis.Monitor.epochTimer = true
        }

        elLog.html(imgOk)
        reload = globalThis.Monitor.config.intervals.daemon
        countRequest()
    } else {
        reload = 0
        switchNode()
    }

    setTimeout(()=>getBlockchain(), reload)
}

export const getBlockSpeed = async () => {
    let reload
    const node = globalThis.Monitor.config.nodes[globalThis.Monitor.currentNode]
    const elLog = $("#query-block-speed")

    elLog.html(imgStop)

    const speed = await getInfo(node, 'block-speed')

    if (speed) {
        $("#block-speed").html(`<span class="text-bold fg-accent">${(speed / 60000).toFixed(2)}</span>`)

        globalThis.Monitor.blockSpeed = speed

        elLog.html(imgOk)

        reload = speed
        countRequest()
    } else {
        reload = 0
        switchNode()
    }

    setTimeout(()=>getBlockSpeed(), reload)
}
