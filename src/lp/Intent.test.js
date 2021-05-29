const Intent = require("./Intent");
const Lemma = require("./Lemma");
const {QUANTIFIER_ONE} = require("./enums/quantifiers");


describe('Intent', () => {

    const lemma1 = new Lemma(['Добавить', 'дополнить', 'расширить'])
    const lemma2 = new Lemma(['Книга', 'Рассказ', 'Повесть', 'Новелла'])
    const lemma3 = new Lemma(['Пожалуйста'])

    describe('Инициализация намерения', () => {

        test('Конструктор работает', () => {
            const intent = new Intent([{lemma: lemma1, quantifier: QUANTIFIER_ONE}, {lemma: lemma2}])
            expect(intent.isMyWords(['Добавить', 'книгу'])).toBeTruthy();
        });

    });

    describe('Simple Negative tests', () => {

        const intent = new Intent([{lemma: lemma1, quantifier: QUANTIFIER_ONE}, {lemma: lemma2}, {lemma: lemma3}])

        test('Простой отрицательный тест', () => {
            const intent = new Intent([{lemma: lemma1}, {lemma: lemma2}])
            expect(intent.isMyWords(['Какая-то', 'фигня'])).toBeFalsy();
        });

        test('Отрицательный на пустом предложении', () => {
            const intent = new Intent([{lemma: lemma1}, {lemma: lemma2}])
            expect(intent.isMyWords([])).toBeFalsy();
        });

        test('QUANTIFIER_ONE требует наличия слова', () => {
            expect(intent.isMyWords(['Книга', 'Пожалуйста'])).toBeFalsy();
            expect(intent.isMyWords(['Добавить', 'Книга', 'Пожалуйста'])).toBeTruthy();
            expect(intent.isMyWords(['Книга', 'Добавить', 'Пожалуйста'])).toBeTruthy();
        })

    });

    describe('Intent constructor options', () => {
        const intent = new Intent([{lemma: lemma1, quantifier: QUANTIFIER_ONE}, {lemma: lemma2}, {lemma: lemma3}])

        test('Options.contentRequired', () => {
            const text = 'Добавь пожалуйста книгу'.split(' ');
            expect(intent.isMyWords(text)).toBeTruthy();
            intent.contentRequired = true;
            expect(intent.isMyWords(text)).toBeFalsy();
            expect(intent.isMyWords([...text, 'опиумные', 'войны'])).toBeTruthy();
        });
    });

    describe('Intent::isMy output format', () => {

        const intent = new Intent([{lemma: lemma1, quantifier: QUANTIFIER_ONE}, {lemma: lemma2}, {lemma: lemma3}])

        test('Basic input format', () => {
           const result = intent.isMyWords('Добавь пожалуйста книгу цветы для элджернона'.split(' '));
           expect(result).toBeTruthy();
           expect(result.command).toBeTruthy();
           expect(result.command).toStrictEqual([0,3]);
           expect(result.content).toBeTruthy();
           expect(result.content).toStrictEqual([3,6]);

        });

    });
});