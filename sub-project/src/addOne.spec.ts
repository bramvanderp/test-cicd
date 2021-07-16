import { addOne } from "./addOne";

describe('addOne', () => {
    it('should add one to one making it two', () => {
        const initial = 1;

        const result = addOne(1);

        expect(result).toEqual(2);
    });
});