export const updateNextBlock = () => {
    if (isNaN(state.nextBlock)) return

    const elNextBlock = $(".next-block-countdown")
    const elNextBlockText = $(".next-block-text")

    if (state.nextBlock === 0) {
        elNextBlockText.html("Maybe lucky in the next!")
        elNextBlock.html(`<span class="text-bold">None this epoch :(</span>`)
    } else {
        const nextBlockDate = datetime(state.nextBlock)

        elNextBlockText.html(nextBlockDate.format("ddd, DD MMM, HH:mm"))
        elNextBlock.clear()
        const countdown = $("<div>").attr("data-role", "countdown").attr("data-date", nextBlockDate).attr("data-animate", "none").appendTo(elNextBlock)
        Metro.makePlugin(countdown, "countdown")
    }
}