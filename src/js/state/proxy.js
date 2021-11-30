import {updateBalance, updateTiming} from "../modules/balance";
import {updateUptime} from "../modules/uptime";
import {updateBlockchain} from "../modules/blockchain";
import {updateRewards} from "../modules/rewards";
import {updateDelegations} from "../modules/delegations";
import {updateNextBlock} from "../modules/next-block";
import {updateLatestBlocks} from "../modules/latest-block";
import {updateExplorerSummary} from "../modules/explorer-summary";

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
        latestBlocks: null
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
            if (prop === 'latestBlocks') {
                obj[prop] = val
                updateLatestBlocks()
            }

            return true
        }
    })
}