/**
 * Объект команды. в команде, набор синонимов.
 * Получает на вход набор ключевых слов, команду.
 *
 *  is(stemmedWord) boolean проверяет входит ли в команду
 *
 */


const {QUANTIFIER_ZERO_OR_MORE} = require("./enums/quantifiers");
const {QUANTIFIER_ONE} = require("./enums/quantifiers");

class Operand {

    constructor(lemma, quantifier = QUANTIFIER_ZERO_OR_MORE ) {
         this.quantifier = quantifier;
         this.lemma = lemma;
    }

    get main() {
        return this.quantifier === QUANTIFIER_ONE;
    }

    is(word) {
        return this.lemma.is(word);
    }


}

module.exports = Operand;