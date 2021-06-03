class StepResponse {

    constructor(obj) {
        this.session_state = {}
        if (!obj) throw new Error('Empty response object!');
        if (!obj.session_state || !obj.response) throw new Error('Wrong response format!')
        Object.assign(this, obj)
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

    /**
     * Constructs object for passing to next step. Useful for tests.
     * @param prevState
     * @return State
     */
    stateStep(prevState) {
        return {
            session_state: this.session_state,
            user_state: {...prevState.user, ...this.user_state_update}
        }
    }

}

module.exports = StepResponse;