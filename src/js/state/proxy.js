import {updateBalance, updateTiming} from "../modules/balance";
import {updateUptime} from "../modules/uptime";
import {updateBlockchain} from "../modules/blockchain";
import {updateRewards} from "../modules/rewards";
import {updateDelegations} from "../modules/delegations";
import {updateNextBlock} from "../modules/next-block";
import {updateLatestBlock} from "../modules/latest-block";
import {updateExplorerSummary} from "../modules/explorer-summary";
import {updateExplorerHeight} from "../modules/explorer-height";

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
        nextBlock: null,
        explorerSummary: null,
        explorerHeight: null,
        latestBlock: null
    }, {
        set(obj, prop, val) {
            if (prop === 'balance') {
                obj[prop] = val
                updateBalance()
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
            if (prop === 'explorerSummary') {
                obj[prop] = val
                updateExplorerSummary()
            }
            if (prop === 'explorerHeight') {
                obj[prop] = val
                updateExplorerHeight()
            }
            if (prop === 'latestBlock') {
                obj[prop] = val
                updateLatestBlock()
            }

            return true
        }
    })
}