export const updatePrice = () => {
    if (!globalThis.state.price) return

    const {current_price = 0, price_change_24h = 0, price_change_percentage_24h = 0, total_supply = 0, currency = 'xxx', ath = 0, atl = 0} = globalThis.state.price
    const elCurrentPrice = $("#current-price")
    const elCurrency = $("#currency")
    const elPriceChange = $("#price-change")
    const elPriceHigh = $("#price-high")
    const elPriceLow = $("#price-low")
    const elPriceArrow = $("#price-arrow")
    const elMinaPrice = $("#mina-price")
    const elMinaPriceCurrency = $("#mina-price-currency")

    const priceDelta = +(price_change_24h).toFixed(2)
    const priceDeltaSign = priceDelta > 0 ? "+" : "";
    const priceDeltaColor = priceDelta === 0.00 ? "" : priceDelta > 0 ? "fg-green" : "fg-red";
    const symbol = priceDelta === 0.00 ? `` : `<span class="ani-vertical mif-${+price_change_percentage_24h < 0 ? 'arrow-down fg-red' : 'arrow-up fg-green'}"></span>`
    const priceChange = `<span class="${priceDeltaColor}">${+(price_change_percentage_24h).toFixed(2)}%</span>`
    const totalSupply = +(total_supply).toFixed(0)

    elMinaPrice.html(`${current_price}`)
    elMinaPriceCurrency.html(currency.toUpperCase())
    elCurrentPrice.html(`${current_price}`)
    elCurrency.html(currency.toUpperCase())
    elPriceChange.html(`${priceChange}`)
    elPriceHigh.html(+(ath).toFixed(2))
    elPriceLow.html(+(atl).toFixed(2))

    elPriceArrow.html(`<span class="fg-accent ${priceDeltaColor}">${priceDeltaSign}${priceDelta}</span>${symbol}`)
}
