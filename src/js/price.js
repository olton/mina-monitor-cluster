import {getInfo} from "./helpers/get-info";
import {parseTime} from "./helpers/parse-time";

export const getPrice = async () => {
    const node = globalThis.Monitor.config.nodes[globalThis.Monitor.currentNode]
    const data = await getInfo(node, "price")

    if (data) {
        globalThis.state.price = data[0]
    }

    setTimeout(getPrice, parseTime(globalThis.Monitor.config.intervals.price))
}