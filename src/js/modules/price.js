import {isset} from "../helpers/utils";
import {disco} from "../helpers/disco";

export const processMinaPrice = (i, node, data) => {
    if (!data || !isset(data[0], false)) return

    if (!Array.isArray(data)) return

    const price = data[0]

    if (!state.price || datetime(state.price.last_updated).time() < datetime(price.last_updated).time()) {
        state.price = price
    }
}

export const updatePrice = () => {
    if (!state.price) return

    const {last_updated, current_price = 0, price_change_24h = 0, price_change_percentage_24h = 0, total_supply = 0, currency = 'xxx', ath = 0, atl = 0} = state.price
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
}
