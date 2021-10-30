import {isset} from "../helpers/utils";
import {parseTime} from "../helpers/parse-time";

const getPriceIndex = (curr = 'usd') => {
    let i = -1, result = -1
    for(let p of state.price) {
        i++
        if (p.currency === curr) {
            result = i
            break
        }
    }

    return result
}

export const processMinaPrice = (i, node, data) => {
    if (!data || !isset(data[0], false)) return

    if (!Array.isArray(data)) return

    for (let val of data) {
        const curr = val.currency
        const index = getPriceIndex(curr)

        val.node = node

        if (index === -1) {
            state.price.push(val)
        } else {
            if (datetime(state.price[index].last_updated).time() < datetime(val.last_updated).time()) {
                state.price[index] = val
            }
        }
    }
}

export const processRotatePrice = () => {
    const length = state.price.length

    if (globalThis.priceIndex >= length) {
        globalThis.priceIndex = 0
    }

    if (length) {
        updatePrice(state.price[globalThis.priceIndex])
        globalThis.priceIndex++
    }

    setTimeout(processRotatePrice, parseTime(length ? "30s" : 0))
}

export const updatePrice = (price) => {
    if (!price) return

    const {node, last_updated, current_price = 0, price_change_24h = 0, price_change_percentage_24h = 0, total_supply = 0, currency = 'xxx', ath = 0, atl = 0} = price
    const elCurrentPrice = $("#current-price")
    const elCurrency = $("#currency")
    const elPriceChange = $("#price-change")
    const elPriceHigh = $("#price-high")
    const elPriceLow = $("#price-low")
    const elPriceArrow = $("#price-arrow")
    const elMinaPrice = $("#mina-price")
    const elMinaPriceCurrency = $("#mina-price-currency")
    const elPriceUpdated = $("#price-updated")

    const priceDelta = +(price_change_24h).toFixed(2)
    const priceDeltaSign = priceDelta > 0 ? "+" : "";
    const priceDeltaColor = priceDelta === 0.00 ? "" : priceDelta > 0 ? "fg-green" : "fg-red";
    const symbol = priceDelta === 0.00 ? `` : `<span class="ani-vertical mif-${+price_change_percentage_24h < 0 ? 'arrow-down fg-red' : 'arrow-up fg-green'}"></span>`
    const priceChange = `<span class="${priceDeltaColor}">${+(price_change_percentage_24h).toFixed(2)}%</span>`
    const totalSupply = +(total_supply).toFixed(0)
    const lastUpdated = datetime(last_updated)

    elMinaPrice.html(`${current_price}`)
    elMinaPriceCurrency.html(currency.toUpperCase())
    elCurrentPrice.html(`${current_price}`)
    elCurrency.html(currency.toUpperCase())
    elPriceChange.html(`${priceChange}`)
    elPriceHigh.html(+(ath).toFixed(2))
    elPriceLow.html(+(atl).toFixed(2))
    elPriceUpdated.html(lastUpdated.format("DD-MM-YYYY HH:mm"))

    elPriceArrow.html(`<span class="fg-accent ${priceDeltaColor}">${priceDeltaSign}${priceDelta}</span>${symbol}`)

    if (!state.balance) return

    const balance = +state.balance.total
    const u = (balance/10**9 * current_price).format(4, null, " ", ".").split(".")

    $("#balance-in-currency").html(`${u[0]}<div class="sub-value reduce-5 mt-2-minus" style="line-height: 2">&nbsp;${u[1]}</div>`)
}
