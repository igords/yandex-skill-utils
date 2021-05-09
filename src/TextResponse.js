const StepResponse = require("./StepResponse");
const {variativeText} = require("../lib/utils");


function TextResponse(params, session = {}) {

    const {texts, step, intent} = params;
    if (!texts || !step || !intent) {
        throw new Error('TextResponse: Invalid params');
    }
    try {
        const {text} = variativeText(texts, -1)
        return new StepResponse({
            response: {
                text,
                end_session: false
            },
            session_state: {
                ...session,
                step,
                intent,
            }
        });
    } catch (TypeError) {
        throw new Error(`Не верный вызов TextResponse (params=${params})`)
    }
}

module.exports = TextResponse;