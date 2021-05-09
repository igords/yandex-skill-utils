
class YandexRequest {
    constructor(request) {
        this.nlu = request.nlu || {};
        this.original = request.original_utterance;
    }

    get intents()  {
        return this.nlu.intents || []
    }

    get tokens() {
        return this.nlu.tokens || []
    }

    get empty() {
        return !this.tokens.length
    }

    get isConfirm() {
        return this.intents['YANDEX.CONFIRM'];
    }

    get isReject() {
        return this.intents['YANDEX.REJECT'];
    }

    get isHelp() {
        return !!this.intents['YANDEX.HELP'];
    }

}

module.exports = YandexRequest;