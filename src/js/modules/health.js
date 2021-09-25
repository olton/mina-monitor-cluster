export const processHealth = (i, node, data) => {
    if (!data) return

    const id = `#node-${i+1}`
    const elNodeHealth = $(`${id} .node-health`)
    const elNodeHealthParent = $(`${id} .node-sync-status-container`)
    const ok = data.length === 0

    elNodeHealthParent.removeClass("alert success")
    if (ok) {
        elNodeHealth.html("OK")
    } else {
        elNodeHealth.html(data.join(", "))
        elNodeHealthParent.addClass("alert")
    }
}