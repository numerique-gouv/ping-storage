import { variabilize } from './utils';

describe('utils', () => {
    describe('variabilize', () => {
        it('should return the original text if no variable pass', () => {
            const text = 'truc';

            const variabilizedText = variabilize(text, {});

            expect(variabilizedText).toBe(text);
        });

        it('should return the variablized text if right variable pass', () => {
            const text = 'truc {{count}} machin';

            const variabilizedText = variabilize(text, { count: 2 });

            expect(variabilizedText).toBe('truc 2 machin');
        });

        it('should return the variablized text if right variable passed twice', () => {
            const text = 'truc {{count}} machin {{count}}';

            const variabilizedText = variabilize(text, { count: 2 });

            expect(variabilizedText).toBe('truc 2 machin 2');
        });

        it('should return the variablized text if several variables passed', () => {
            const text = 'truc {{count}} machin {{double}}';

            const variabilizedText = variabilize(text, { count: 2, double: 4 });

            expect(variabilizedText).toBe('truc 2 machin 4');
        });
    });
});
