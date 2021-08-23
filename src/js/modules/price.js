import {isset} from "../helpers/utils";

export const processMinaPrice = (i, node, data) => {
    if (!data || !isset(data[0])) return

    state.price = data[0]
}