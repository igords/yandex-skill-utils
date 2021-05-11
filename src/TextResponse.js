const StepResponse = require("./StepResponse");
const {variativeText} = require("../lib/utils");


function TextResponse(params, state = {}) {
    const {texts, stateKeyName, replacement} = params;
    if (!texts) {
        throw new Error('TextResponse: Invalid params');
    }
    const lastResponse = stateKeyName ? parseInt(state.session[stateKeyName]) : -1
    const {text, current} = variativeText(texts, lastResponse, replacement)
    if (stateKeyName) {
        state.updateSession(stateKeyName, current);
    }
    return state.formResponse(text);
}

module.exports = TextResponse;