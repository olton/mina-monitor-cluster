import {getAPIData, getInfo} from "./helpers/get-info";
import {parseTime} from "./helpers/parse-time";

// TODO Синхронизировать обновление стоимости баланса

export const getPrice = async () => {
    const node = globalThis.Monitor.config.nodes[globalThis.Monitor.currentNode]

    const elCurrentPrice = $("#current-price")
    const elCurrency = $("#currency")
    const elPriceChange = $("#price-change")
    const elPriceHigh = $("#price-high")
    const elPriceLow = $("#price-low")
    const elPriceArrow = $("#price-arrow")
    const elTotalSupply = $("#total-supply")

    const data = await getInfo(node, "price")

    if (data) {
        const mina = data[0]
        const currency = mina.currency
        const price = (+mina.current_price).toFixed(2)
        const priceDelta = (mina.price_change_24h).toFixed(2)
        const priceDeltaSign = priceDelta > 0 ? "+" : "";
        const priceDeltaColor = priceDelta == 0.00 ? "" : priceDelta > 0 ? "fg-green" : "fg-red";
        const sign = mina.price_change_percentage_24h
        const symbol = priceDelta == 0.00 ? `` : `<span class="ani-vertical mif-${sign < 0 ? 'arrow-down fg-red' : 'arrow-up fg-green'}"></span>`
        const priceChange = `<span class="${priceDeltaColor}">${+(mina.price_change_percentage_24h).toFixed(2)}%</span>`
        const totalSupply = +(mina.total_supply).toFixed(0)

        elCurrentPrice.html(`${price}`)
        elCurrency.html(currency.toUpperCase())
        elPriceChange.html(`${priceChange}`)
        elPriceHigh.html(+(mina.ath).toFixed(2))
        elPriceLow.html(+(mina.atl).toFixed(2))
        elTotalSupply.html(totalSupply.format(0, null, " ", "."))

        elPriceArrow.html(`<span class="text-bold fg-accent ${priceDeltaColor}">${priceDeltaSign}${priceDelta}</span>${symbol}`)

        globalThis.Monitor.price = +price
        globalThis.Monitor.price_currency = currency
        globalThis.Monitor.totalSupply = totalSupply
    }

    setTimeout(getPrice, parseTime(globalThis.Monitor.config.intervals.price))
}