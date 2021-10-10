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
    const elCopyAddress = $(`${id} .copy-address`)
    const elCopyAddressSW = $(`${id} .copy-sw-address`)

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
    const diffUnvValue = unvHeight - height

    elProducerCog.removeClass("ani-spin")
    elSnarkWorkerCog.removeClass("ani-spin")

    elNodeSyncStatus.html(syncStatus)

    if (badStates.includes(syncStatus)) {
        elBlockHeight.html(INFINITE)
        elBlockHeightMax.html(INFINITE)
        elBlockHeightUnv.html(INFINITE)
    } else {
        elBlockHeightMax.html(maxHeight.format(0, null, " ", "."))
        elBlockHeightUnv.html(unvHeight.format(0, null, " ", "."))
    }

    elBlockHeightContainer.removeClass("bell-alert")
    elBlockHeightMax.removeClass("alert ani-flash")
    elBlockHeightUnv.removeClass("alert ani-flash")
    if (syncStatus === 'SYNCED' || syncStatus === 'CATCHUP') {
        if (diffMax || diffUnv) {
            elBlockHeightContainer.addClass("bell-alert")
        }
        if (maxHeight && diffMax) {
            elBlockHeightMax.addClass("alert ani-flash")
            elBlockHeight.html(height.format(0, null, " ", ".") + (diffMaxValue ? ` <span class="label-alert text-small ml-1 mt-1-minus">(${-1 * diffMaxValue})</span>` : ""))
        } else
        if (unvHeight && diffUnv) {
            elBlockHeightUnv.addClass("alert ani-flash")
            elBlockHeight.html(height.format(0, null, " ", ".") + (diffUnvValue ? ` <span class="label-alert text-small ml-1 mt-1-minus">(${-1 * diffUnvValue})</span>` : ""))
        } else {
            elBlockHeight.html(height.format(0, null, " ", "."))
        }
    }

    const uptime = Metro.utils.secondsToTime(uptimeSecs)
    if (badStates.includes(syncStatus)) {
        elNodeUptime.html(INFINITE)
    } else {
        elNodeUptime.html(`${uptime.d}d, ${uptime.h}h ${uptime.m}m`)
    }

    if (blockProductionKeys && blockProductionKeys.length) {
        elCopyAddress.attr("data-name", blockProductionKeys[0])
        elProducerCog.addClass("ani-spin")
        elBlockProducer
            .html(`<a class="fg-accent no-decor" target="_blank" href="https://mina.staketab.com/validator/${blockProductionKeys[0]}">${shortAddress(blockProductionKeys[0])}</a>`)
            .attr("title", blockProductionKeys[0])
            .attr("data-name", blockProductionKeys[0])
    } else {
        elBlockProducer.html("NONE")
    }

    if (snarkWorker) {
        elCopyAddressSW.attr("data-name", snarkWorker)
        elSnarkWorkerCog.addClass("ani-spin")
        elSnarkWorker
            .html(`<a class="fg-accent no-decor" target="_blank" href="https://mina.staketab.com/validator/${snarkWorker}>${shortAddress(snarkWorker)}</a>`)
            .attr("data-name", snarkWorker)
    } else {
        elSnarkWorker.html("NONE")
    }

    elSnarkWorkerFee.html(snarkWorkFee / 10**9)

}
