import {INFINITE} from "../helpers/consts";
import {shortAddress} from "../helpers/utils";

export const processDaemonInfo = (i, node, daemon) => {
    if (!daemon) return

    const id = `#node-${i+1}`
    const elNodeSyncStatus = $(`${id} .node-sync-status`)
    const elNodeUptime = $(`${id} .node-uptime`)
    const elBlockProducer = $(`${id} .block-producer`)
    const elSnarkWorker = $(`${id} .snark-worker`)
    const elSnarkWorkerFee = $(`${id} .snark-worker-fee`)
    const elBlockHeight = $(`${id} .block-height`)
    const elBlockHeightMax = $(`${id} .max-block`)
    const elBlockHeightUnv = $(`${id} .max-unvalidated`)
    const elProducerCog = $(`${id} .producer-work`)
    const elSnarkWorkerCog = $(`${id} .snark-worker-work`)
    const elBlockHeightContainer = $(`${id} .block-height-container`)

    const badStates = ['BOOTSTRAP', 'OFFLINE', 'CONNECTING']

    const {
        addrsAndPorts,
        syncStatus,
        blockProductionKeys,
        blockchainLength,
        consensusTimeNow,
        highestBlockLengthReceived,
        highestUnvalidatedBlockLengthReceived,
        nextBlockProduction,
        peers,
        snarkWorkFee,
        snarkWorker,
        uptimeSecs
    } = daemon
    const {
        bindIp,
        clientPort,
        externalIp,
        libp2pPort
    } = addrsAndPorts

    const height = +blockchainLength
    const maxHeight = +highestBlockLengthReceived
    const unvHeight = +highestUnvalidatedBlockLengthReceived
    const diffMax = Math.abs(maxHeight - height) >= 2
    const diffUnv = Math.abs(unvHeight - height) >= 2
    const diffMaxValue = maxHeight - height

    elProducerCog.removeClass("ani-spin")
    elSnarkWorkerCog.removeClass("ani-spin")

    elNodeSyncStatus.html(syncStatus)

    if (badStates.includes(syncStatus)) {
        elBlockHeight.html(INFINITE)
        elBlockHeightMax.html(INFINITE)
        elBlockHeightUnv.html(INFINITE)
    } else {
        elBlockHeight.html(height.format(0, null, " ", ".") + (diffMaxValue && diffMaxValue > 0 ? ` <span class="label-alert text-small ml-1 mt-1-minus">(-${diffMaxValue})</span>` : ""))
        elBlockHeightMax.html(maxHeight.format(0, null, " ", "."))
        elBlockHeightUnv.html(unvHeight.format(0, null, " ", "."))
    }

    elBlockHeightContainer.removeClass("bell-alert")
    elBlockHeightMax.removeClass("ani-flash")
    elBlockHeightUnv.removeClass("ani-flash")
    if (syncStatus === 'SYNCED') {
        if (diffMax || diffUnv) {
            elBlockHeightContainer.addClass("bell-alert")
        }
        if (maxHeight && diffMax) {
            elBlockHeightMax.addClass("ani-flash")
        }
        if (unvHeight && diffUnv) {
            elBlockHeightUnv.addClass("ani-flash")
        }
    }

    const uptime = Metro.utils.secondsToTime(uptimeSecs)
    if (badStates.includes(syncStatus)) {
        elNodeUptime.html(INFINITE)
    } else {
        elNodeUptime.html(`${uptime.d}d, ${uptime.h}h ${uptime.m}m`)
    }

    if (blockProductionKeys && blockProductionKeys.length) {
        elProducerCog.addClass("ani-spin")
        elBlockProducer
            .html(shortAddress(blockProductionKeys[0]))
            .attr("title", blockProductionKeys[0])
            .attr("data-name", blockProductionKeys[0])
    } else {
        elBlockProducer.html("NONE")
    }

    if (snarkWorker) {
        elSnarkWorkerCog.addClass("ani-spin")
        elSnarkWorker
            .html(shortAddress(snarkWorker))
            .attr("data-name", snarkWorker)
    } else {
        elSnarkWorker.html("NONE")
    }

    elSnarkWorkerFee.html(snarkWorkFee / 10**9)

}
