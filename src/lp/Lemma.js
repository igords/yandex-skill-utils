/**
 * Объект слова в команде, набор синонимов.
 * Получает на вход набор ключевых слов, команду.
 *
 *  is(stemmedWord) boolean проверяет входит ли в команду
 *
 */


const natural = require('natural');
const porterStemmer = natural.PorterStemmerRu;

class Lemma {

    constructor(commandWords) {
        this.words = commandWords.map(w => porterStemmer.stem(w))
    }

    is(stemmed) {
        return this.words.indexOf(stemmed) >= 0;
    }
}

module.exports = Lemma;