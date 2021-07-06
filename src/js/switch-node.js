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

    const elCurrentNodes = $(".is-node")
    const elCurrentNode = $(`#node-${globalThis.Monitor.currentNode + 1}`)

    elCurrentNodes.removeClass("current")
    elCurrentNode.addClass("current")
    // elCurrentNode.find(".panel").addClass("selected")
    // elCurrentNodes.find(".panel").removeClass("selected")

    console.log("Current Node switched to " + globalThis.Monitor.currentNode)
}

export const countRequest = () => {
    globalThis.Monitor.counter++
    if (globalThis.Monitor.counter >= 12) {
        switchNode()
        globalThis.Monitor.counter = 0
    }
}