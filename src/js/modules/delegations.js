export const processDelegations = (i, node, data) => {
    if (!data) return

    state.delegations = data
}

export const updateDelegations = () => {
    if (!state.delegations) return

    const {current, next} = state.delegations
    const {precision = 4} = config

    const s1 = Number(current.stake).format(9, null, " ", ".").split(".")
    const s2 = Number(next.stake).format(9, null, " ", ".").split(".")

    $("#delegators-total").text(current.count)
    $("#delegators-stack").html(`${s1[0]}<div class="sub-value mt-1-minus" style="line-height: 2">${s1[1].substring(0, precision)}</div>`)

    $("#delegators-total-next").text(next.count)
    $("#delegators-stack-next").html(`${s2[0]}<div class="sub-value mt-1-minus" style="line-height: 2">${s2[1].substring(0, precision)}</div>`)
}