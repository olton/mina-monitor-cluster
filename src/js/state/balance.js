import {genesisStart, slotDuration} from "../helpers/consts";

export const updateBalance = () => {
    if (!state.balance) return

    const {total, liquid, locked} = state.balance

    const b = (total/10**9).format(9, null, " ", ".").split(".")
    const q = liquid/10**9
    const l = locked/10**9

    $("#balance-total").html(`${b[0]}<div class="sub-value mt-2-minus" style="line-height: 2">${b[1]}</div>`)
    $("#balance-liquid").html(`${q.format(0, null, " ", ".")}`)
    $("#balance-locked").html(`${l.format(0, null, " ", ".")}`)
}


export const updateBalanceCost = () => {
    if (!state.balance) return
    if (!state.price) return

    const balance = +state.balance.total
    const {current_price, currency} = state.price
    const u = (balance/10**9 * current_price).format(4, null, " ", ".").split(".")

    $("#balance-in-currency").html(`${u[0]}<div class="sub-value reduce-5 mt-2-minus" style="line-height: 2">&nbsp;${u[1]}</div>`)
}

export const updateTiming = () => {
    if (!state.timing) return

    const {cliff_time, cliff_amount} = state.timing
    const genStart = datetime(genesisStart)
    const nextTime = genStart.addSecond(cliff_time * (slotDuration/1000))

    $(`#cliff-amount`).html((cliff_amount/10**9).format(0, null, " ", "."))
    $(`#cliff-time`).html(nextTime.format("DD-MM-YYYY HH:mm"))
}