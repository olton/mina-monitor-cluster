export const disco = (el, cls= "in-update", dur = 2000) => {
    const _el = $(el)
    _el.addClass(cls)
    setTimeout(() => _el.removeClass("in-update"), 2000)
}