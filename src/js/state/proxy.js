import {updateBalance, updateBalanceCost, updateTiming} from "./balance";
import {updatePrice} from "./price";
import {updateUptime} from "./uptime";
import {updateBlockchain} from "./blockchain";
import {updateRewards} from "./rewards";
import {updateDelegations} from "./delegations";
import {updateNextBlock} from "./next-block";

export const registerStateProxy = () => {
    globalThis.state = new Proxy({
        blockchain: null,
        uptime: null,
        balance: 0,
        timing: null,
        price: null,
        rewards: null,
        speed: 0,
        consensus: null,
        delegations: null,
        nextBlock: null
    }, {
        set(obj, prop, val) {
            if (prop === 'balance') {
                obj[prop] = val
                updateBalance()
                updateBalanceCost()
            }
            if (prop === 'price') {
                obj[prop] = val
                updatePrice()
                updateBalanceCost()
            }
            if (prop === 'uptime') {
                obj[prop] = val
                updateUptime()
            }
            if (prop === 'blockchain') {
                const resetCountdown = state.blockchain === null ? true : state.blockchain.epoch !== val.epoch
                obj[prop] = val
                updateBlockchain({resetCountdown})
            }
            if (prop === 'rewards') {
                obj[prop] = val
                updateRewards()
            }
            if (prop === 'delegations') {
                obj[prop] = val
                updateDelegations()
            }
            if (prop === 'timing') {
                obj[prop] = val
                updateTiming()
            }
            if (prop === 'nextBlock') {
                obj[prop] = val
                updateNextBlock()
            }

            return true
        }
    })
}