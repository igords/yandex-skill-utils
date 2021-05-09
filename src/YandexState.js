class YandexState {

    constructor(obj) {
        this.user = obj.user || {}
        this.session = obj.session || obj.session_state || {}
    }
}

module.exports = YandexState;