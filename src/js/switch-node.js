export const switchNode = (v) => {
    let {currentNode, config} = globalThis.Monitor

    if (typeof v !== "undefined") {
        globalThis.Monitor.currentNode = v
    } else {
        currentNode++
        if (currentNode >= config.nodes.length) {
            currentNode = 0
        }
        globalThis.Monitor.currentNode = currentNode
    }

    if (globalThis.Monitor.nodes.length > 1) {
        const syncStatus = globalThis.Monitor.nodes[globalThis.Monitor.currentNode].syncStatus
        if (syncStatus && syncStatus !== 'SYNCED') {
            switchNode()
        }
    }

    Metro.storage.setItem("currentNode", globalThis.Monitor.currentNode)
    console.log("Current node: ", globalThis.Monitor.currentNode)
    const elNodes = $(".is-node")
    const elCurrentNode = $(`#node-${globalThis.Monitor.currentNode + 1}`)

    elNodes.removeClass("current")
    elCurrentNode.addClass("current")
}

export const countRequest = () => {
    globalThis.Monitor.counter++
    if (globalThis.Monitor.counter >= 12) {
        switchNode()
        globalThis.Monitor.counter = 0
    }
}