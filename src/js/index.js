import 'regenerator-runtime/runtime'
import "../vendor/metro4/css/metro-all.css"
import "../css/index.less"
import "../vendor/metro4/js/metro"
import "../vendor/chart/chart"
import {messages as Messages} from "./helpers/messages"
import {title} from "./helpers/consts"
import {nodeController} from "./node-controller";
import {getPrice} from "./price";
import {getConsensus} from "./consensus";
import {getUptime} from "./uptime";
import {getBalance} from "./balance";
import {switchNode} from "./switch-node";
import {getBlockchain, getBlockSpeed} from "./blockchain";
import {getDelegations} from "./delegations";
import {getRewards} from "./rewards";
import {getExplorerSummary} from "./explorer";
import {getNextBlock} from "./next-block";
import {copy2clipboard} from "./helpers/utils";

const version = `1.0.3`

globalThis.Monitor = {
    config: null,
    nodes: [],
    currentNode: 0,
    balance: 0,
    price: 0,
    totalSupply: 0,
    noSlots: false,
    genesisStart: "2021-03-17 02:00:00.000000+02:00",
    epochTimer: false,
    counter: 0,
    explorerHeight: 0,
    nextBlock: 0,
    epoch: 0,
    slotDuration: 180000,
    epochDuration: 1285200000,
    charts: []
}

$("title").text(title.replace('%VER%', version))
$("#version").text(version)

const configFile = "./config.one.json"

fetch(configFile).then(r => {
    if (!r.ok) {
        throw new Error(Messages.CONFIG_READ_ERROR)
    }
    return r.json()
})
.then( config => {
    globalThis.Monitor.config = config

    if (!config.nodes.length) {
        throw new Error("Nodes is not defined! You must define at least one node!")
    }

    console.log("Monitor config file was loaded successfully")

    globalThis.darkMode = config.theme === "auto" ? $.dark : config.theme === "dark"
    $("html").addClass(globalThis.darkMode ? "dark-theme" : "light-theme")

    let startNode = Metro.storage.getItem("currentNode") || 0
    if (startNode < 0 || startNode >= config.nodes.length) {
        startNode = 0
    }
    switchNode(startNode)

    setTimeout(getPrice, 0, config.price.currency, config.price.update_interval)
    setTimeout(getExplorerSummary, 0)
    setTimeout(getConsensus, 0)
    setTimeout(getUptime, 0)
    setTimeout(getBalance, 0)
    setTimeout(getBlockchain, 0)
    setTimeout(getBlockSpeed, 0)
    setTimeout(getDelegations, 0)
    setTimeout(getRewards, 0)
    setTimeout(getNextBlock, 0)

    const elNodesContainer = $("#nodes-row")
    const nodesLength = config.nodes.length

    $.each(config.nodes, (i, node) => {
        elNodesContainer.append(
            $(`<div class='is-node' id='node-${i+1}'>`)
                .addClass(nodesLength === 3 ? 'cell-lg-4' : nodesLength === 2 ? 'cell-lg-6' : 'cell-lg-12')
        )
        globalThis.Monitor.nodes[i] = {}
        globalThis.Monitor.charts.push({
            memoryChart: null,
            cpuChart: null,
            memoryGauge: null,
            cpuGauge: null,
            cpuCores: null,
            cpuTemp: null,
            peersChart: null,
            netRxChart: null,
            netTxChart: null,
        })
        setTimeout(nodeController, 0, i, node)
    })

    $(document).on("click", ".block-producer, .snark-work", function() {
        const val = $(this).attr("data-name")
        if (val) copy2clipboard(val)
    })
})
.catch(r => {
    console.log(r)
})

globalThis.epochNumberDrawValue = () => {
    return globalThis.Monitor.epoch
}
