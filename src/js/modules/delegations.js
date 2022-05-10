import {shortAddress} from "../helpers/utils";
import {MINA_EXPLORER, MINATAUR_EXPLORER} from "../helpers/consts";

export const processDelegations = (i, node, data) => {
    if (!data) return

    state.delegations = data
}

export const updateDelegations = () => {
    if (!state.delegations.length) return

    const {delegators, delegators_next, stake, stake_next, value: address} = state.delegations[0]
    const {precision = 4, explorer} = config

    const s1 = Number(stake / 10**9).format(9, null, " ", ".").split(".")
    const s2 = Number(stake_next / 10**9).format(9, null, " ", ".").split(".")

    $("#delegators-total").text(delegators)
    $("#delegators-stack").html(`${s1[0]}<div class="sub-value mt-1-minus" style="line-height: 2">${s1[1].substring(0, precision)}</div>`)

    $("#delegators-total-next").text(delegators_next)
    $("#delegators-stack-next").html(`${s2[0]}<div class="sub-value mt-1-minus" style="line-height: 2">${s2[1].substring(0, precision)}</div>`)

    $("#delegations-tracked-key").html(
        $("<a>")
            .addClass("big-value no-decor")
            .attr("href", (explorer.toLowerCase() === "mina" ? MINA_EXPLORER : MINATAUR_EXPLORER) + address)
            .html(`<span class='reduce-1'>${shortAddress(address)}</span>`)
    )
}