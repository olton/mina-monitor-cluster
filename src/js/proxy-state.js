import {updateBalance, updateBalanceCost} from "./dom/balance";
import {updatePrice} from "./dom/price";
import {updateUptime} from "./dom/uptime";
import {updateBlockchain, updateBlockSpeed} from "./dom/blockchain";
import {updateRewards} from "./dom/rewards";
import {updateConsensus} from "./dom/consensus";
import {updateDelegations} from "./dom/delegations";

export const registerStateProxy = () => {
    globalThis.state = new Proxy({
        blockchain: null,
        uptime: null,
        balance: 0,
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
                const resetCountdown = globalThis.state.blockchain === null ? true : globalThis.state.blockchain.epoch !== val.epoch
                obj[prop] = val
                updateBlockchain({resetCountdown})
            }
            if (prop === 'rewards') {
                obj[prop] = val
                updateRewards()
            }
            if (prop === 'consensus') {
                obj[prop] = val
                updateConsensus()
            }
            if (prop === 'delegations') {
                obj[prop] = val
                updateDelegations()
            }

            return true
        }
    })
}