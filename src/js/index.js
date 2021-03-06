// import 'regenerator-runtime/runtime'
import "../vendor/metro4/css/metro-all.css"
import "../css/index.less"
import "../vendor/metro4/js/metro"
import "../vendor/chart/chart"
import {TITLE, MSG_CONFIG_READ_ERROR} from "./helpers/consts"
import {copy2clipboard} from "./helpers/utils";
import {processServerCpu, processServerInfo, processServerTime} from "./modules/server-info";
import {processCpuLoad, processCpuTemp} from "./modules/cpu";
import {processMem} from "./modules/mem";
import {processDaemonInfo} from "./modules/daemon";
import {processNetConn, processNetStat} from "./modules/network";
import {processNodePeers} from "./modules/peers";
import {processResponse} from "./modules/response";
import {processHealth} from "./modules/health";
import {registerStateProxy} from "./state/proxy";
import {processBalance} from "./modules/balance";
import {processState} from "./modules/state";
import {processBlockchain} from "./modules/blockchain";
import {processSpeed} from "./modules/speed";
import {processUptime} from "./modules/uptime";
import {processDelegations} from "./modules/delegations";
import {processMinaPrice, processRotatePrice} from "./modules/price";
import {processRewards} from "./modules/rewards";
import {processNextBlock} from "./modules/next-block";
import {processVersion, processMonitorVersion} from "./modules/version";
import {processLatestBlock} from "./modules/latest-block";
import {processExplorerSummary} from "./modules/explorer-summary";
import {processExplorerHeight} from "./modules/explorer-height";
import {processHttps} from "./modules/https";

const version = `2.1.2`

$("title").text(TITLE.replace('%VER%', version))
$("#version").text(version)

let configFile = "./config.json"

globalThis.charts = []
globalThis.state = null
globalThis.darkMode = null
globalThis.wsc = []
globalThis.daemons = []
globalThis.priceIndex = 0

fetch(configFile).then(r => {
    if (!r.ok) {
        throw new Error(MSG_CONFIG_READ_ERROR)
    }
    return r.json()
})
.then( config => {
    const {theme = "auto", nodes = [], chartLabels} = config

    if (!nodes.length) {
        throw new Error("Nodes is not defined! You must define at least one node!")
    }

    console.log("Monitor config file was loaded successfully")

    globalThis.config = config

    globalThis.darkMode = theme === "auto" ? $.dark : theme === "dark"
    $("html").addClass(globalThis.darkMode ? "dark-theme" : "light-theme")

    globalThis.chartLineColor = globalThis.darkMode ? '#3c424b' : "#e5e5e5"
    globalThis.chartLabelColor = globalThis.darkMode ? "#fff" : "#000"
    globalThis.chartBackground = globalThis.darkMode ? "#1b2125" : "#ffffff"

    registerStateProxy()

    const elNodesContainer = $("#nodes-row")
    const nodesLength = nodes.length

    $.each(nodes, (i, node) => {
        let elNodePanel, template, clone

        daemons[i] = {
            state: "UNKNOWN",
            height: 0,
            info: null,
            node: node
        }

        charts[i] = {
            cpuChart: null,
            cpuCores: null,
            memChart: null,
            memProcess: null,
            txChart: null,
            rxChart: null,
            peersChart: null,
            peersChartStartPoint: 200,
            responseChart: null,
            responseChartStartPoint: 200,
        }

        let nodeAdditionalClass = 'cell-lg-4'

        if (nodesLength === 2) {
            nodeAdditionalClass = 'cell-md-6'
        } else if (nodesLength === 3) {
            nodeAdditionalClass = 'cell-xl-4 cell-lg-6'
        } else if (nodesLength === 4) {
            nodeAdditionalClass = 'cell-xxxl-3 cell-lg-6'
        } else if (nodesLength >= 5) {
            nodeAdditionalClass = 'cell-xxxxxl-fifth cell-xxxl-3 cell-lg-6 cell-xl-4'
        }

        elNodesContainer.append(
            elNodePanel = $(`<div class='is-node' id='node-${i+1}'>`)
                .addClass(nodeAdditionalClass)
        )

        template = document.querySelector("#node-template")
        template.content.querySelector(".panel").setAttribute("data-title-caption", node.name.toUpperCase())
        clone = document.importNode(template.content, true)
        elNodePanel[0].appendChild(clone)
        elNodePanel.children(".panel").addClass("not-connected")

        const connect = () => {
            const ws = new WebSocket(`${node.https ? 'wss' : 'ws'}://${node.host}`)

            ws.onmessage = event => {
                try {
                    const content = JSON.parse(event.data)
                    if (!content.action) return
                    const {action, data} = content

                    switch (action) {
                        case 'platform': processServerInfo(i, node, data); break;
                        case 'time': processServerTime(i, node, data); break;
                        case 'cpu': processServerCpu(i, node, data); break;
                        case 'price': processMinaPrice(i, node, data); break;
                        case 'uptime': processUptime(i, node, data); break;
                        case 'mem': processMem(i, node, data); break;
                        case 'cpuLoad': processCpuLoad(i, node, data); break;
                        case 'cpuTemp': processCpuTemp(i, node, data); break;
                        case 'netConn': processNetConn(i, node, data); break;
                        case 'netStat': processNetStat(i, node, data); break;
                        case 'delegations': processDelegations(i, node, data); break;
                        case 'peers': processNodePeers(i, node, data); break;
                        case 'state': processState(i, node, data); break;
                        case 'health': processHealth(i, node, data); break;
                        case 'balance': processBalance(i, node, data); break;
                        case 'speed': processSpeed(i, node, data); break;
                        case 'blockchain': processBlockchain(i, node, data); break;
                        case 'nextBlock': processNextBlock(i, node, data); break;
                        case 'daemon': processDaemonInfo(i, node, data); break;
                        case 'version': processVersion(i, node, data); break;
                        case 'rewards': processRewards(i, node, data); break;
                        case 'responseTime': processResponse(i, node, data); break;
                        case 'latestBlock': processLatestBlock(i, node, data); break;
                        case 'explorerSummary': processExplorerSummary(i, node, data); break;
                        case 'explorerHeight': processExplorerHeight(i, node, data); break;
                        case 'monitorVersion': processMonitorVersion(i, node, data); break;
                        case 'https': processHttps(i, node, data); break;
                        // case 'welcome': console.log(data); break;
                        // default: console.log(action, data)
                    }
                } catch (e) {
                    console.log(e.message)
                    console.log(event.data)
                    console.log(e.stack)
                }
            }

            ws.onerror = error => {
                console.error(datetime().format("DD-MM-YYYY HH:mm ") + 'Socket encountered error: ', error.message, 'Closing socket');
                ws.close();
            }

            ws.onclose = event => {
                $(`#node-${i+1} > .panel`).addClass("not-connected")
                $(`#node-${i+1} .node-load-status`)
                    .removeClass("label-success")
                    .addClass("label-alert")
                console.log(datetime().format("DD-MM-YYYY HH:mm ") + 'Socket is closed. Reconnect will be attempted in 1 second.', event.reason);
                setTimeout(connect, 1000)
            }

            ws.onopen = event => {
                $(`#node-${i+1} > .panel`).removeClass("not-connected")
                $(`#node-${i+1} .node-load-status`)
                    .removeClass("label-alert")
                    // .addClass("label-success")
                console.log(datetime().format("DD-MM-YYYY HH:mm ") + 'Connected to ' + node.name);
            }

            globalThis.wsc.push(ws)
        }

        connect()
    })

    $(document).on("click", ".block-producer, .snark-work, .donate-address, .copy-bp-address, .copy-sw-address", function() {
        const val = $(this).attr("data-name")
        if (val) copy2clipboard(val)
    })

    if (!chartLabels) {
        $(".peers-title, .response-title, .tx-title, .rx-title, .process-mem-title, .total-mem-title, .cpu-title").hide()
    }

    // Run subprocesses
    processRotatePrice()
})
.catch(r => {
    console.log(r)
})

globalThis.epochNumberDrawValue = () => {
    return state ? state.blockchain.epoch : 0
}
