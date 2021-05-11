class StepResponse {

    constructor(obj) {
        if (!obj) throw new Error('Empty response object!');
        if (!obj.session_state || !obj.response) throw new Error('Wrong response format!')
        const state = obj.state;
    }

    get userState() {
        return this.user_state_update;
    }

    get text() {
        return this.response.text;
    }

    get state() {
        return {
            ...this.session_state,
            user: this.user_state_update
        }
    }

    get step() {
        return this.session_state.step;
    }

    get intent() {
        return this.session_state.intent;
    }

    appendUserData(data) {
        this.user_state_update = data;
    }
}

module.exports = StepResponse;