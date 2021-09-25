export const processSpeed = (i, node, data) => {
    if (!data) return

    $("#block-speed").html(`<span>${(data / 60000).toFixed(2)}</span>`)
    $("#block-speed-slot").html(`<span>${((data / 60000)/3).toFixed(2)}</span>`)
}