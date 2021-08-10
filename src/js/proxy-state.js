import {updateBalance, updateBalanceCost} from "./dom/balance";
import {updatePrice} from "./dom/price";
import {updateUptime} from "./dom/uptime";

export const registerStateProxy = () => {
    globalThis.state = new Proxy({
        height: 0,
        uptime: null,
        balance: 0,
        price: null,
        delegations: null,
        epoch: null,
        slot: null,
        nextBlock: null
    }, {
        set(obj, prop, val) {
            if (prop === 'balance') {
                obj[prop] = val
                updateBalance()
                updateBalanceCost()
                return true
            }
            if (prop === 'price') {
                obj[prop] = val
                updatePrice()
                updateBalanceCost()
                return true
            }
            if (prop === 'uptime') {
                obj[prop] = val
                updateUptime()
                return true
            }
        }
    })
}