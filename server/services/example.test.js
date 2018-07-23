import sum from './example';

describe('/server/services/example', () => {
    it('should perform 1 + 2 and equal to 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
