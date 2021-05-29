/**
 * Объект команды.
 * Получает на вход набор ключевых слов, обозначающих команду.
 *  checkStemmed - получает на вход массив основ слов
 *  check получает набор слов
 *
 */


const natural = require('natural');
const Operand = require("./Operand");
const porterStemmer = natural.PorterStemmerRu;

const MARK_EMPTY = 0;
const MARK_MAIN = 2;
const MARK_OPERAND = 1;

/**
 * Possible options:
 * contentRequired: boolean // Для того чтобы команда сработала, нужен непустой контент.
 */
class Intent {

    constructor(operands, options = {} ) {
        this.operands = operands.map(o => new Operand(o.lemma, o.quantifier));
        this.contentRequired = !!options.contentRequired;
    }

    isMy(stems) {
        if (stems.length > 0) {
            const map = stems.map(w => {
                for (let operand of this.operands) {
                    if (operand.is(w)) {
                        return operand.main ? MARK_MAIN : MARK_OPERAND;
                    }
                }
                return MARK_EMPTY;
            });
            const left = map.indexOf(MARK_EMPTY);
            const leftMain = map.indexOf(MARK_MAIN);
            if (left !== 0 && leftMain >= 0 && (!this.contentRequired || left >= 0)) return { command: [0, left], content: [left, map.length]};
        }
        return false;
        // Найти первый 0 с начала, если есть все помеченные is_main -
    }

    /*
         hasMain() {
            return this.operands.reduce((orig, operand) => orig || operand.main, false)
         }
    */

    isMyWords(words) {
        return this.isMy(words.map(w => porterStemmer.stem(w)));
    }
}

module.exports = Intent;