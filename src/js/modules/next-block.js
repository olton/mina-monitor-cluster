export const processNextBlock = (i, node, data) => {
    if (isNaN(data)) return

    if (isNaN(state.nextBlock) || state.nextBlock !== data) {
        state.nextBlock = data
    }
}