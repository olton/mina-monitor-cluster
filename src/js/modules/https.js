const processHttps = (i, node, data) => {
    const id = `#node-${i+1}`
    const elNodeHttps = $(`${id} .node-https-status`)

    if (data === true) {
        elNodeHttps.removeClass("https-false")
    }
}

module.exports = {
    processHttps
}