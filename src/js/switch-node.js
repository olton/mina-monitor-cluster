export const switchNode = (v) => {
    let {currentNode, config, nodes, health} = globalThis.Monitor

    if (typeof v !== "undefined") {
        globalThis.Monitor.currentNode = v
    } else {
        currentNode++
        if (currentNode >= config.nodes.length) {
            currentNode = 0
        }
        globalThis.Monitor.currentNode = currentNode
    }

    let healthyNodes = 0
    for(let n of nodes) {
        if (n.syncStatus === 'SYNCED') {
            healthyNodes++
        }
    }

    if (nodes.length > 1 && healthyNodes > 1) {
        const syncStatus = nodes[globalThis.Monitor.currentNode].syncStatus
        const healthNode = health[globalThis.Monitor.currentNode]
        if (
            (syncStatus && syncStatus !== 'SYNCED') ||
            (healthNode.length && (healthNode.includes('FORK') || healthNode.includes('NO PEERS') || healthNode.includes('NO-PEERS')))
        ) {
            switchNode()
        }
    }

    Metro.storage.setItem("currentNode", globalThis.Monitor.currentNode)

    const elNodes = $(".is-node")
    const elCurrentNode = $(`#node-${globalThis.Monitor.currentNode + 1}`)

    elNodes.removeClass("current")
    elCurrentNode.addClass("current")
}

export const countRequest = () => {
    const {timesToSwitchNode} = globalThis.Monitor.config
    globalThis.Monitor.counter++
    if (globalThis.Monitor.counter >= timesToSwitchNode) {
        switchNode()
        globalThis.Monitor.counter = 0
    }
}