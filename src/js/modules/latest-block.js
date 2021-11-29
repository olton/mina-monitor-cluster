export const processLatestBlock = (i, node, data) => {
    if (!data) return

    state.latestBlock = data
}

export const updateLatestBlock = () => {
    if (!state.latestBlock) return


}