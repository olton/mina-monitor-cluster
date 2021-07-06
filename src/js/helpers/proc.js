export const proc = (fn, args = []) => setTimeout(() => {
    if (typeof fn === "function") fn.apply(null, args)
}, 0)