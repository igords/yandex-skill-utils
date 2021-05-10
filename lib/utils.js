const pupa = require("pupa");

module.exports.variativeText = (texts, current = 0, replacement) => {
    if (texts.length === 1) return {text: texts[0], current: 0}
    let rnd;
    do {
        rnd = Math.floor(Math.random() * texts.length);
    } while (rnd === current)
    let text = texts[rnd]
    if (replacement !== undefined) {
        text = pupa(text, replacement)
    }
    return {text, current: rnd}
}

