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

    updateUser(name, value) {
        this.userChanges[name] = value;
    }

    formResponse(text) {
        new StepResponse({
            response: {
                text,
                end_session: false
            },
            session_state: this.session
        });
    }

}

module.exports = YandexState;