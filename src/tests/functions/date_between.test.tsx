import { isWithin90Days } from '../../utils';

describe('isWithin90Days', () => {
    test('should return true when the difference is less than 90 days', () => {
      const init = new Date('2022-01-01');
      const end = new Date('2022-03-31');
      expect(isWithin90Days(init, end)).toBe(true);
    });
  
    test('should return false when the difference is greater than 90 days', () => {
      const init = new Date('2022-01-01');
      const end = new Date('2022-04-02');
      expect(isWithin90Days(init, end)).toBe(false);
    });
  
    test('should return true when the difference is exactly 90 days', () => {
      const init = new Date('2022-01-01');
      const end = new Date('2022-03-31T23:59:59.999Z');
      expect(isWithin90Days(init, end)).toBe(true);
    });
  
    test('should return true when the difference is negative but less than 90 days', () => {
      const init = new Date('2022-03-31');
      const end = new Date('2022-01-01');
      expect(isWithin90Days(init, end)).toBe(true);
    });
  });
  