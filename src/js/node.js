import {getInfo} from "./helpers/get-info";
import {imgOk, imgStop} from "./helpers/consts";
import {shortAddress} from "./helpers/utils";

export const getNodeStatus = async (index, node) => {
    const {blockDiff} = globalThis.Monitor.config
    const infinite = `<span class="mif-infinite"></span>`
    const elNode = $(`#node-${index + 1}`)
    const elNodeStatus = elNode.find(".node-sync-status")
    const elNodeUptime = elNode.find(".node-uptime")
    const elNodeHeightContainer = elNode.find(".block-height-container")
    const elNodeBlockHeight = elNode.find(".block-height")
    const elNodeMaxHeight = elNode.find(".max-block")
    const elNodeUnvHeight = elNode.find(".max-unvalidated")
    const elNodeExpHeight = elNode.find(".explorer-height")
    const elPeersCount = elNode.find(".peers-count")
    const elLog = elNode.find(".node-load-status")
    const elNodeInfoGeneral = elNode.find(".node-info-general")
    const elNodeHealth = elNode.find(".node-health")
    const elNodeResponseTime = elNode.find(".node-response-time")
    const elNodeBlockProducer = elNode.find(".block-producer")
    const elNodeSnarkWorker = elNode.find(".snark-worker")
    const elNodeSnarkWorkerFee = elNode.find(".snark-worker-fee")
    const elNodeHealthContainer = elNode.find(".node-health-container")
    const elProducerCog = elNode.find(".producer-work")
    const elSnarkWorkerCog = elNode.find(".snark-worker-work")

    let health = await getInfo(node, 'health')
    let status = await getInfo(node, 'node-status')
    let responseTime = await getInfo(node, 'node-response-time')

    globalThis.Monitor.health[index] = health

    if (isNaN(responseTime)) {
        responseTime = 0
    }

    responseTime /= 1000

    globalThis.Monitor.charts[index].nodeResponseChart.add(0, [datetime().time(), responseTime], true)

    elNodeResponseTime.removeClass("alert success warning")
    elNodeResponseTime.html(responseTime.toFixed(2) + "s")
    if (responseTime <= 1) {
        elNodeResponseTime.addClass("success")
    }
    if (Metro.utils.between(responseTime, 1, 5)) {
        elNodeResponseTime.addClass("yellow-warning")
    }
    if (Metro.utils.between(responseTime, 5, 10)) {
        elNodeResponseTime.addClass("warning")
    }
    if (responseTime >= 10) {
        elNodeResponseTime.addClass("alert")
    }

    elNodeInfoGeneral.removeClass("bg-alert")
    elNodeHealthContainer.removeClass("warning")
    if (health) {
        if (health.length) {
            elLog.html(imgStop)
            elNodeInfoGeneral.addClass("bg-alert")
            elNodeHealth.html($("<span>").addClass("label-alert").html(health.join(", ")))
            elNodeHealthContainer.addClass("warning")
        } else {
            elLog.html(imgOk)
            elNodeHealth.html($("<span>").addClass("label-success").html("OK"))
        }
    } else {
        elLog.html(imgStop)
    }

    elNode.removeClass("CATCHUP SYNCED BOOTSTRAP OFFLINE CONNECTING UNKNOWN")
    elProducerCog.removeClass("ani-spin")
    elSnarkWorkerCog.removeClass("ani-spin")

    if (status) {
        const node = status.data
        const version = node.version
        const netStatus = node.syncStatus
        const daemon = node.daemonStatus
        const {
            peers = 0,
            syncStatus = 'NONE',
            blockchainLength = 0,
            addrsAndPorts,
            highestBlockLengthReceived = 0,
            highestUnvalidatedBlockLengthReceived = 0,
            uptimeSecs = 0,
            nextBlockProduction,
            blockProductionKeys = [],
            snarkWorker,
            snarkWorkFee,
            consensusTimeNow
        } = daemon

        const height = +blockchainLength
        const maxHeight = +highestBlockLengthReceived
        const unvHeight = +highestUnvalidatedBlockLengthReceived
        const expHeight = globalThis.Monitor.explorerHeight
        const MAX_DIFF = maxHeight - height
        const UNV_DIFF = unvHeight - height
        const UNV_DIFF_FORWARD = unvHeight < height ? height - unvHeight : 0
        const EXP_DIFF = expHeight - height

        globalThis.Monitor.nodes[index] = {
            syncStatus,
            blockHeight: blockchainLength,
            uptime: uptimeSecs
        }

        elNode.addClass(syncStatus)

        elNodeInfoGeneral.removeClass("bg-info bg-alert bg-success bg-warning")
        elNodeStatus.html(syncStatus)

        const uptime = Metro.utils.secondsToTime(uptimeSecs)
        if (syncStatus === 'BOOTSTRAP') {
            elNodeUptime.html(infinite)
        } else {
            elNodeUptime.html(`${uptime.d}d, ${uptime.h}h ${uptime.m}m`)
        }

        if (syncStatus === 'BOOTSTRAP') {
            elNodeBlockHeight.html(infinite)
        } else {
            if (syncStatus === 'CATCHUP') {
                elNodeBlockHeight.html(`${height} <span class="ml-2 reduce-3">(${height - (unvHeight || maxHeight)})</span>`)
            } else {
                elNodeBlockHeight.html(`${height}`)
            }
        }

        elNodeMaxHeight.html(maxHeight)
        elNodeUnvHeight.html(unvHeight)
        elNodeExpHeight.html(expHeight)

        elNodeHeightContainer.removeClassBy("bg-")
        elNodeHeightContainer.removeClass("bell-alert")
        elNodeMaxHeight.removeClass("ani-flash")
        elNodeMaxHeight.closest("td").removeClass("bg-alert")
        elNodeUnvHeight.removeClass("ani-flash")
        elNodeUnvHeight.closest("td").removeClass("bg-alert")
        elNodeExpHeight.removeClass("ani-flash")
        elNodeExpHeight.closest("td").removeClass("bg-info bg-alert")

        if (syncStatus === 'SYNCED') {

            elNodeMaxHeight.html(maxHeight)
            if (MAX_DIFF > blockDiff) {
                elNodeMaxHeight.addClass("ani-flash")
                elNodeMaxHeight.closest("td").addClass("bg-alert")
                elNodeHeightContainer.addClass("bell-alert")
            }

            elNodeUnvHeight.html(unvHeight)
            if (UNV_DIFF > blockDiff || UNV_DIFF_FORWARD > blockDiff) {
                elNodeUnvHeight.addClass("ani-flash")
                elNodeUnvHeight.closest("td").addClass("bg-alert")
                elNodeHeightContainer.addClass("bell-alert")
            }

            if (expHeight) {
                if ((EXP_DIFF > blockDiff) || (EXP_DIFF < 0 && Math.abs(EXP_DIFF) >= blockDiff)) {
                    elNodeExpHeight.addClass("ani-flash")
                    elNodeExpHeight.closest("td").addClass("bg-alert")
                }
                if (EXP_DIFF > blockDiff) {
                    elNodeHeightContainer.addClass("bell-alert")
                }
            }
        }

        if (blockProductionKeys && blockProductionKeys.length) {
            elProducerCog.addClass("ani-spin")
            elNodeBlockProducer
                .html(shortAddress(blockProductionKeys[0]))
                .attr("title", blockProductionKeys[0])
                .attr("data-name", blockProductionKeys[0])
        } else {
            elNodeBlockProducer.html("NONE")
        }

        if (snarkWorker) {
            elSnarkWorkerCog.addClass("ani-spin")
            elNodeSnarkWorker
                .html(shortAddress(snarkWorker))
                .attr("data-name", snarkWorker)
        } else {
            elNodeSnarkWorker.html("NONE")
        }

        elNodeSnarkWorkerFee.html(snarkWorkFee / 10**9)

        globalThis.Monitor.charts[index].peersChartStartPoint += 10
        globalThis.Monitor.charts[index].peersChart.add(0, [globalThis.Monitor.charts[index].peersChartStartPoint - 10, globalThis.Monitor.charts[index].peersChartStartPoint, peers.length], true)
        elPeersCount.html(peers.length)
    } else {
        elNode.addClass("UNKNOWN")
        elNodeStatus.html("UNKNOWN")
        elNodeHealth.html($("<span>").addClass("label-success").html("UNKNOWN"))
    }

    setTimeout(getNodeStatus, globalThis.Monitor.config.intervals.daemon, index, node)
}