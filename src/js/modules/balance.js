import {isset} from "../helpers/utils";

export const processBalance = (i, node, data) => {
    if (!data) return
    if (!isset(data.data.account)) return

    const {balance, timing} = data.data.account

    if (!state.balance.total || (balance.total > state.balance.total) ) {
        state.balance = balance
        state.timing = timing
    }
}