const TextResponse = require("../src/TextResponse");
const StepResponse = require("../src/StepResponse");

describe('TextResponse', () => {

    test('returns response object', () => {
        const t = TextResponse({texts: ['aa', 'bb']}, {})
        expect(t).toBeInstanceOf(StepResponse);
    });

    test('rotate texts without repetitions', () => {
        const texts = ['test1', 'test2', 'test3'];
        let state = {}
        let text = ''
        for (let i=0; i<20; i++) {
            const t = TextResponse({texts, stateKeyName: 'testKeyName'}, state)
            expect(t.response).toBeTruthy()
            expect(t.response.text).toBeTruthy();
            expect(t.response.text).not.toBe(text)
            text = t.response.text
            state = t.session_state
        }
    })

    test('replacements', () => {
        const texts = ['test1 {{KEY1}}', 'test2 {{KEY1}}']
        const word = 'foo';
        expect(TextResponse({texts, replacement: {KEY1: word}}).text).toContain(word)
    });

    test('does not fail to rotate on a single text', () => {
        const texts = ['test1'];
        let state = {}
        for (let i=0; i<20; i++) {
            const t = TextResponse({texts, stateKeyName: 'testKeyName'}, state)
            expect(t.response).toBeTruthy()
            expect(t.response.text).toBeTruthy();
            expect(t.response.text).toBe('test1')
            state = t.session_state
        }
    });
})