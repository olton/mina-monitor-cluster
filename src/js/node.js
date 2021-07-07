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
    const elProducerCount = $(".producer-count")
    const elProducerFirst = $(".producer-first")
    const elSnarkFee = $(".snark-fee")
    const elSnarkAddress = $(".snark-address")
    const elPeersCount = elNode.find(".peers-count")
    const elLog = elNode.find(".node-load-status")
    const elNodeInfoGeneral = elNode.find(".node-info-general")
    const elNodeHealth = elNode.find(".node-health")

    // elLog.html(imgStop)

    let health = await getInfo(node, 'health')
    let status = await getInfo(node, 'node-status')

    elNodeInfoGeneral.removeClass("bg-alert")
    if (health) {
        if (health.length) {
            elLog.html(imgStop)
            elNodeInfoGeneral.addClass("bg-alert")
            elNodeHealth.html($("<span>").html(health.join(" ")))
        } else {
            elLog.html(imgOk)
            elNodeHealth.html($("<span>").addClass("label-success").html("OK"))
        }
    } else {
        elLog.html(imgStop)
    }

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

        elNode.removeClass("CATCHUP SYNCED BOOTSTRAP OFFLINE CONNECTING")
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

        if (syncStatus === 'SYNCED') {
            elNodeHeightContainer.removeClassBy("bg-").removeClass("bell-alert")

            elNodeMaxHeight.removeClass("ani-flash").html(maxHeight)
            elNodeMaxHeight.closest("td").removeClass("bg-alert")
            if (MAX_DIFF > blockDiff) {
                elNodeMaxHeight.addClass("ani-flash")
                elNodeMaxHeight.closest("td").addClass("bg-alert")
                elNodeHeightContainer.addClass("bell-alert")
            }

            elNodeUnvHeight.removeClass("ani-flash").html(unvHeight)
            elNodeUnvHeight.closest("td").removeClass("bg-alert")
            if (UNV_DIFF > blockDiff || UNV_DIFF_FORWARD > blockDiff) {
                elNodeUnvHeight.addClass("ani-flash")
                elNodeUnvHeight.closest("td").addClass("bg-alert")
                elNodeHeightContainer.addClass("bell-alert")
            }

            if (expHeight) {
                elNodeExpHeight.removeClass("ani-flash")
                elNodeExpHeight.closest("td").removeClass("bg-info bg-alert")
                if (EXP_DIFF > blockDiff) {
                    elNodeExpHeight.addClass("ani-flash")
                    elNodeExpHeight.closest("td").addClass("bg-alert")
                    elNodeHeightContainer.addClass("bell-alert")
                } else if (EXP_DIFF < 0 && Math.abs(EXP_DIFF) >= blockDiff) {
                    elNodeExpHeight.addClass("ani-flash")
                    elNodeExpHeight.closest("td").addClass("bg-info")
                }
            }
        }

        elProducerFirst.clear()

        if (blockProductionKeys && blockProductionKeys.length) {
            elProducerCount.html(blockProductionKeys.length)
            elProducerFirst.html(shortAddress(blockProductionKeys[0])).attr("title", blockProductionKeys[0])
        } else {
            elProducerCount.html("NONE")
        }

        elSnarkFee.html(snarkWorkFee / 10**9)
        elSnarkAddress.html(snarkWorker ? shortAddress(snarkWorker) : "NONE").attr("title", snarkWorker ? snarkWorker : "")

        globalThis.Monitor.charts[index].peersChartStartPoint += 10
        globalThis.Monitor.charts[index].peersChart.add(0, [globalThis.Monitor.charts[index].peersChartStartPoint - 10, globalThis.Monitor.charts[index].peersChartStartPoint, peers.length], true)
        elPeersCount.html(peers.length)
    }

    setTimeout(() => getNodeStatus(index, node), globalThis.Monitor.config.intervals.daemon)
}