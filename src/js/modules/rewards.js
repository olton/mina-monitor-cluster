import {isset} from "../helpers/utils";

export const processRewards = (i, node, data) => {
    if (!data) return
    if (isset(data.error, false)) return;
    if (!isset(data.data.blocks, false)) return;

    state.rewards = data.data.blocks
}

export const updateRewards = () => {
    if (!state.rewards) return

    const {coinbaseRegular = 720, coinbaseSupercharge = 1440} = config.coinbase

    let blocks = state.rewards
    let rewards = blocks.reduce((acc, val)=>acc + parseInt(val.transactions.coinbase), 0)
    let supercharge = 0, zero = 0
    let superchargeMina = 0

    for(let b of blocks) {
        const coinbase = +b.transactions.coinbase / 10**9
        if (coinbase === coinbaseSupercharge) {
            supercharge++
            superchargeMina += coinbase - coinbaseRegular
        }

        if (!coinbase) {
            zero++
        }
    }

    $("#blocks-in-epoch").html(+(blocks.length).format(0, null, " ", "."))
    $("#rewards-in-epoch").html((rewards / 10**9).format(0, null, " ", "."))
    $("#supercharge-count").html(supercharge)
    $("#supercharge-mina").html(superchargeMina)
    $("#zero-count").html(zero)
}