export const processDelegations = (i, node, data) => {
    if (!data) return

    state.delegations = data
}

export const updateDelegations = () => {
    if (!state.delegations) return

    const {current, next} = state.delegations
    const {precision = 4} = config

    const s1 = (current.stake).format(9, null, " ", ".").split(".")
    const s2 = (next.stake).format(9, null, " ", ".").split(".")

    $("#delegators-total").text(current.count)
    $("#delegators-stack").html(`${s1[0]}.<span class="reduce-3" style="line-height: 2">${s1[1].substring(0, precision)}</span>`)

    $("#delegators-total-next").text(next.count)
    $("#delegators-stack-next").html(`${s2[0]}.<span class="reduce-3" style="line-height: 2">${s2[1].substring(0, precision)}</span>`)
}