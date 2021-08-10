export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function merge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                merge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return merge(target, ...sources);
}

export const copy2clipboard = (str) => {
    const el = document.createElement('textarea')
    el.value = str
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
}

export const shortAddress = (v, l = 5) => `<span class="reduce-2">${v.substring(0, l) + ' ... ' + v.substring(v.length - l)}</span>`

export const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))

export const getFakeData = (len, inc = 2000, init = 0) => {
    const a = []
    let d = datetime().time() - inc * len
    for (let i = 0; i < len; i++) {
        a.push([d, init])
        d += inc
    }
    return a
}

export const getFakeTriplets = (count, min, max, zero) => {
    let y = 0, x = 0, a = [], d = 10

    for(let i = 0; i < count; i++) {
        y = typeof zero !== 'undefined' ? +zero : rand(min, max)
        x += d
        a.push([x - d, x, y])
    }

    return a
}

export const isNum = (v) => !isNaN(v)

export const isset = (v) => {
    try {
        return typeof v !== 'undefined'
    } catch (e) {
        return false
    }
}