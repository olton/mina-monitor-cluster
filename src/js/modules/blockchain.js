export const processBlockchain = (i, node, data) => {
    if (!data) return

    const blockchain = data.data.bestChain[0].protocolState.consensusState

    if (!state.blockchain || (state.blockchain.blockHeight < blockchain.blockHeight)) {
        state.blockchain = blockchain
    }
}