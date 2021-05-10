const StepResponse = require("./StepResponse");
const {variativeText} = require("../lib/utils");


function TextResponse(params, session = {}) {
    const {texts, stateKeyName, replacement} = params;
    if (!texts) {
        throw new Error('TextResponse: Invalid params');
    }
    const lastResponse = stateKeyName ? parseInt(session[stateKeyName]) : -1
    const {text, current} = variativeText(texts, lastResponse, replacement)
    const session_state = {...session}
    if (stateKeyName) {
        session_state[stateKeyName] = current;
    }
    return new StepResponse({
        response: {
            text,
            end_session: false
        },
        session_state
    });
}

module.exports = TextResponse;