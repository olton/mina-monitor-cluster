export const updateBalance = () => {
    if (!globalThis.state.balance) return

    const total = +globalThis.state.balance.total
    const liquid = +globalThis.state.balance.liquid
    const locked = +globalThis.state.balance.locked

    const b = (total/10**9).format(9, null, " ", ".").split(".")
    const q = liquid/10**9
    const l = locked/10**9

    $("#balance-total").html(`${b[0]}<div class="sub-value mt-2-minus" style="line-height: 2">${b[1]}</div>`)
    $("#balance-liquid").html(`${q.format(0, null, " ", ".")}`)
    $("#balance-locked").html(`${l.format(0, null, " ", ".")}`)
}


export const updateBalanceCost = () => {
    if (!globalThis.state.balance) return
    if (!globalThis.state.price) return

    const balance = +globalThis.state.balance.total
    const {current_price, currency} = globalThis.state.price
    const u = (balance/10**9 * current_price).format(2, null, " ", ".").split(".")

    $("#balance-in-currency").html(`${u[0]}<div class="sub-value reduce-5 mt-2-minus" style="line-height: 2">&nbsp;${currency}</div>`)
}
