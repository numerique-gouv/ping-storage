import { slugify } from './utils';

describe('utils', () => {
    describe('slugify', () => {
        it('should slugify', () => {
            const displayName = 'ProConnect monitor RIE !';

            const slug = slugify(displayName);

            expect(slug).toBe('proconnect-monitor-rie');
        });
    });
});
