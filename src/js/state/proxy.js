import {updateBalance, updateBalanceCost, updateTiming} from "../modules/balance";
import {updatePrice} from "../modules/price";
import {updateUptime} from "../modules/uptime";
import {updateBlockchain} from "../modules/blockchain";
import {updateRewards} from "../modules/rewards";
import {updateDelegations} from "../modules/delegations";
import {updateNextBlock} from "../modules/next-block";

export const registerStateProxy = () => {
    globalThis.state = new Proxy({
        blockchain: null,
        uptime: null,
        balance: 0,
        timing: null,
        price: [],
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
                // updateBalanceCost()
            }
            // if (prop === 'price') {
            //     obj[prop] = val
            //     updatePrice()
            //     updateBalanceCost()
            // }
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