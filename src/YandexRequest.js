const natural = require('natural');
const porterStemmer = natural.PorterStemmerRu;
const TOKEN_DATA_VALUE = 'all';

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
     * Заполнить объект значениями из слотов.
     * @param intentName - название намерения
     * @param obj - объект, должен содержать не undefined в значениях для заполнения
     * @param stem - стеммировать ли значения
     * @param separator - разделитель, если значения есть
     * @return заполненный объект
     */
    fillFromSlots(intentName, obj, stem=false, separator='') {
        if (!this.intents[intentName]) {
            throw  new Error(`Intent "${intentName}" not found!`);
        }
        const slots = this.intents[intentName].slots;
        Object.entries(slots).forEach(entry => {
            const name = entry[0]
            const data = entry[1]
            if (obj[name] === undefined) {
                throw new Error(`Unknown slot field: '${name}'`)
            }
            if (data.value !== TOKEN_DATA_VALUE) {
                obj[name] = data.value
            } else {
                obj[name] = this.intentValue(intentName, name, stem, separator)
            }
        })
        return obj
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