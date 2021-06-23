const StepResponse = require("./StepResponse");
const TextResponse = require("./TextResponse");

//TODO: make session immutable
const SESSION_ERROR_KEY = 'error'

class YandexState {

    constructor(obj) {
        this.user = obj.user || {}
        this.session = obj.session || obj.session_state || {}
        this.userChanges = {}
    }

    updateSession(name, value) {
        this.session[name] = value;
    }

    updateUserData(name, value) {
        this.user[name] = value;
        this.userChanges[name] = value;
    }

    formResponse(text) {
        return new StepResponse({
            response: {
                text,
                end_session: false
            },
            session_state: this.session,
            user_state_update: this.userChanges
        });
    }

    setError(error) {
        this.updateSession(SESSION_ERROR_KEY, error)
    }

    resetError() {
        this.updateSession(SESSION_ERROR_KEY, false)
    }

    textResponse(texts, replacement = {}) {
        return TextResponse({texts, replacement}, this)
    }

}

module.exports = YandexState;