import 'regenerator-runtime/runtime'
import "../vendor/metro4/css/metro-all.css"
import "../css/index.less"
import "../vendor/metro4/js/metro"
import "../vendor/chart/chart"
import {messages as Messages} from "./helpers/messages"
import {title, version} from "./helpers/consts"
import {nodeController} from "./node-controller";
import {proc} from "./helpers/proc";
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

fetch("./config.json").then(r => {
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

    proc(getPrice, [config.price.currency, config.price.update_interval])
    proc(getExplorerSummary)
    proc(getConsensus)
    proc(getUptime)
    proc(getBalance)
    proc(getBlockchain)
    proc(getBlockSpeed)
    proc(getDelegations)
    proc(getRewards)
    proc(getNextBlock)

    $.each(config.nodes, (i, node) => {
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
})
.catch(r => {
    console.log(r)
})

globalThis.epochNumberDrawValue = () => {
    return globalThis.Monitor.epoch
}
