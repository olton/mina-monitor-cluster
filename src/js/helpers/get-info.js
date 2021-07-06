export const fetchWithTimeout = async (resource, options) => {
    const { timeout = 10000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);

    return response;
}

export const getInfo = async (node, path, parse = true) => {
    const SERVER_ADDRESS = `${node.secure ? "https" : "http"}://${node.host}/${path}`

    try {
        const result = await fetch(`${SERVER_ADDRESS}`)
        if (!result.ok) return null
        return parse ? await result.json() : await result.text()
    } catch (e) {
        return null
    }
}

export const getAPIData = async (url, parse = true) => {
    try {
        const result = await fetch(`${url}`)
        if (!result.ok) return null
        return parse ? await result.json() : await result.text()
    } catch (e) {
        return null
    }
}
