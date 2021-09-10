import {isset} from "../helpers/utils";
import {GENESIS_START, SLOT_DURATION} from "../helpers/consts";

export const processBalance = (i, node, data) => {
    if (!data) return
    if (!isset(data.data.account, false)) return

    const {balance, timing} = data.data.account

    if (!state.balance.total || (balance.total !== state.balance.total) ) {
        state.balance = balance
        state.timing = timing
    }
}

export const updateBalance = () => {
    if (!state.balance) return

    const {total, liquid, locked} = state.balance
    const {precision = 4} = config

    const b = Number(total/10**9).format(9, null, " ", ".").split(".")
    const q = Number(liquid/10**9).format(9, null, " ", ".").split(".")
    const l = Number(locked/10**9).format(9, null, " ", ".").split(".")

    $("#balance-total").html(`${b[0]}<div class="sub-value mt-2-minus" style="line-height: 2">${b[1].substring(0, precision)}</div>`)
    $("#balance-liquid").html(`${q[0]}<div class="sub-value mt-2-minus" style="line-height: 2">${q[1].substring(0, precision)}</div>`)
    $("#balance-locked").html(`${l[0]}<div class="sub-value mt-2-minus" style="line-height: 2">${l[1].substring(0, precision)}</div>`)
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
    const genStart = datetime(GENESIS_START)
    const nextTime = genStart.addSecond(cliff_time * (SLOT_DURATION/1000))

    $(`#cliff-amount`).html((cliff_amount/10**9).format(0, null, " ", "."))
    $(`#cliff-time`).html(nextTime.format("DD-MM-YYYY HH:mm"))
}