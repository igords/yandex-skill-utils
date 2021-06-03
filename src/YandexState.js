const StepResponse = require("./StepResponse");

//TODO: make session immutable

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

    stateAfter(step) {
        return {
            session_state: step.session_state,
            user_state: {...this.user, ...step.user_state_update}
        }
    }

}

module.exports = YandexState;