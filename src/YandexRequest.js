const natural = require('natural');
const porterStemmer = natural.PorterStemmerRu;

class YandexRequest {
    constructor(request) {
        this.nlu = request.nlu || {};
        this.original = request.original_utterance;
    }

    get intents() {
        return this.nlu.intents || []
    }

    get tokens() {
        return this.nlu.tokens || []
    }

    /**
     * Вытащить значение намерения.
     * @param intentName - название намерения
     * @param slotName - имя слота
     * @param stem - стеммировать ли значения
     * @param separator - разделитель, если значения есть
     * @return string
     */
    intentValue(intentName, slotName, stem = false, separator = ' ') {
        if (!this.intents[intentName]) {
            throw  new Error(`Intent "${intentName}" not found!`);
        }
        const slots = this.intents[intentName].slots;
        const slot = slots[slotName];
        if (!slot) {
            return "";
        }
        const data = this.tokens.slice(slot.tokens.start, slot.tokens.end)
        if (stem) {
            return data.map(e => porterStemmer.stem(e)).join(separator)
        }
        return data.join(separator)
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