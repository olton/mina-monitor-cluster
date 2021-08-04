import {getInfo} from "./helpers/get-info"
import {countRequest, switchNode} from "./switch-node"
import {imgStop, imgOk} from "./helpers/consts"
import {parseTime} from "./helpers/parse-time";

export const getRewards = async () => {
    const {epoch, blockHeight, config, currentNode, noSlots} = globalThis.Monitor
    const node = config.nodes[currentNode]
    const elLog = $("#query-rewards")
    let reload

    if (epoch && blockHeight) {
        elLog.html(imgStop)

        let data = await getInfo(node,'winning-blocks')

        if (data && data.data) {
            let blocks = data.data.blocks
            let rewards = blocks.reduce((acc, val)=>acc + parseInt(val.transactions.coinbase), 0)

            $("#blocks-in-epoch").text(blocks.length)
            $("#rewards-in-epoch").text(rewards / 10**9)

            elLog.html(imgOk)
            reload = parseTime("3m")
            countRequest()
        } else {
            reload = 0
            switchNode()
        }
    }

    setTimeout(getRewards, reload)
}