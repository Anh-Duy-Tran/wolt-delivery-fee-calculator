import { describe, it, expect } from 'vitest';
import {
  calculateDeliveryDistanceSurcharge,
  calculateNumberOfItemSurcharge,
  calculateRushHourSurcharge,
  calculateSmallOrderSurcharge,
  eligibleForFreeDeliveryBasedOnCartValue,
} from './ruleHelperFunctions';

const NORMAL_TIME = new Date(2024, 0, 22, 10, 0, 0);
const RUSH_HOUR_TIME = new Date(2024, 0, 26, 16, 0, 0); // A Friday during rush hour (Fri 26/1/2024 16:00:00)
const FRIDAY_JUST_BEFORE_3PM = new Date(2024, 0, 26, 14, 59, 59); // (Fri 26/1/2024 14:59:59)
const FRIDAY_JUST_AFTER_7PM = new Date(2024, 0, 26, 19, 0, 1); // (Fri 26/1/2024 19:00:01)

describe('Test individual rules helper functions', () => {
  // Small Order Surcharge calculate function
  describe('Small Order Surcharge', () => {
    it('adds surcharge for orders under 10€', () => {
      const result = calculateSmallOrderSurcharge(8.8);
      expect(result).toBeCloseTo(1.2);
    });
    it('do not add surcharge for 10€ order', () => {
      const result = calculateSmallOrderSurcharge(10);
      expect(result).toBe(0);
    });
    it('do not add surcharge for over 10€ order', () => {
      const result = calculateSmallOrderSurcharge(15);
      expect(result).toBe(0);
    });
  });

  // Delivery Distance Fee calculate function
  describe('Delivery Distance Fee', () => {
    it('calculates correct fee (2 euros) for 1 meters', () => {
      const result = calculateDeliveryDistanceSurcharge(1);
      expect(result).toBe(2);
    });
    it('calculates correct fee (2 euros) for 999 meters', () => {
      const result = calculateDeliveryDistanceSurcharge(999);
      expect(result).toBe(2);
    });
    it('calculates correct fee (3 euros) for 1499 meters', () => {
      const result = calculateDeliveryDistanceSurcharge(1499);
      expect(result).toBe(3);
    });
    it('calculates correct fee (3 euros) for 1500 meters', () => {
      const result = calculateDeliveryDistanceSurcharge(1500);
      expect(result).toBe(3);
    });
    it('calculates correct fee (4 euros) for 1501 meters', () => {
      const result = calculateDeliveryDistanceSurcharge(1501);
      expect(result).toBe(4);
    });
  });

  // Item Count Surcharge calculate function
  describe('Item Count Surcharge', () => {
    it('does not add surcharge for 4 items order', () => {
      const result = calculateNumberOfItemSurcharge(4);
      expect(result).toBe(0);
    });
    it('adds surcharge for 5 items order', () => {
      const result = calculateNumberOfItemSurcharge(5);
      expect(result).toBeCloseTo(0.5, 2);
    });
    it('adds surcharge for 10 items order', () => {
      const result = calculateNumberOfItemSurcharge(10);
      expect(result).toBe(3);
    });
    it('adds surcharge and bulk fee for 13 items order', () => {
      const result = calculateNumberOfItemSurcharge(13);
      expect(result).toBe(5.7);
    });
    it('adds surcharge and bulk fee for 14 items order', () => {
      const result = calculateNumberOfItemSurcharge(14);
      expect(result).toBe(6.2);
    });
  });

  // Free Delivery for High-Value Orders
  describe('Free Delivery for High-Value Orders', () => {
    it('does not provides free delivery for orders under 200€', () => {
      const result = eligibleForFreeDeliveryBasedOnCartValue(199);
      expect(result).toBeFalsy();
    });
    it('provides free delivery for orders exactly 200€', () => {
      const result = eligibleForFreeDeliveryBasedOnCartValue(200);
      expect(result).toBeTruthy();
    });
    it('provides free delivery for orders over 200€', () => {
      const result = eligibleForFreeDeliveryBasedOnCartValue(201);
      expect(result).toBeTruthy();
    });
  });

  // Rush Hour Fee Increase
  describe('Rush Hour Fee Increase', () => {
    it('increases fee (20%) during rush hour on Fridays', () => {
      const result = calculateRushHourSurcharge(RUSH_HOUR_TIME, 2);
      expect(result).toBeCloseTo(0.4); // 20% of 2 euros = 0.4 euros
    });
    it('does not increase fee during normal day', () => {
      const result = calculateRushHourSurcharge(NORMAL_TIME, 2);
      expect(result).toBe(0);
    });
    it('does not increase fee before 3PM Friday', () => {
      const result = calculateRushHourSurcharge(FRIDAY_JUST_BEFORE_3PM, 2);
      expect(result).toBe(0);
    });
    it('not increases fee after 7PM Friday', () => {
      const result = calculateRushHourSurcharge(FRIDAY_JUST_AFTER_7PM, 2);
      expect(result).toBe(0);
    });
  });
});
