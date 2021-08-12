export const updateRewards = () => {
    if (!globalThis.state.rewards) return

    let blocks = globalThis.state.rewards
    let rewards = blocks.reduce((acc, val)=>acc + parseInt(val.transactions.coinbase), 0)

    $("#blocks-in-epoch").text(blocks.length)
    $("#rewards-in-epoch").text(rewards / 10**9)
}