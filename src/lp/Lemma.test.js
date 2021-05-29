const Lemma = require("./Lemma");

describe('Инициализация леммы', () => {
    test('Слова берутся по основанию (стемятся)', () => {
        const i1 = new Lemma(['Добавить', 'дополнить', 'расширить'])
        const i2 = new Lemma(['Добавь', 'Дополните', 'Расширь'])
        expect(i1.words).toStrictEqual(i2.words)
    })
});