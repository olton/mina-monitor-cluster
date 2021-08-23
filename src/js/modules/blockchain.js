import {isset} from "../helpers/utils";

export const processBlockchain = (i, node, data) => {
    if (!data) return
    if (!isset(data.data.bestChain[0].protocolState.consensusState)) return

    const blockchain = data.data.bestChain[0].protocolState.consensusState

    if (!state.blockchain || (state.blockchain.blockHeight < blockchain.blockHeight)) {
        state.blockchain = blockchain
    }
}