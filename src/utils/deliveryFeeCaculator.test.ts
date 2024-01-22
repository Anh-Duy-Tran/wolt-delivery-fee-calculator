import { describe, it, expect } from 'vitest';
import {
  additionalFeeRules,
  deliveryFeeCaculator,
  feeBasedRules,
  freeDeliveryRules,
} from './deliveryFeeCaculator';

const NORMAL_TIME = new Date('2024-01-22T10:00:00Z');
const RUSH_HOUR_TIME = new Date('2024-01-26T16:00:00Z'); // A Friday during rush hour

// Helper function to create order details
function createOrderDetails(
  cartValue: number,
  deliveryDistance: number,
  numberOfItems: number,
  orderTime: Date = NORMAL_TIME
) {
  return { cartValue, deliveryDistance, numberOfItems, orderTime };
}

function getAdditionalFeeRuleFunc(type: string) {
  const ruleFunction = additionalFeeRules.find(
    (rule) => rule.type === type
  )?.calculateAdditionalFee;
  if (!ruleFunction) {
    throw new TypeError(`Cannot find rule type ${type}`);
  }
  return ruleFunction;
}

function getFreeDeliveryRuleFunc(type: string) {
  const ruleFunction = freeDeliveryRules.find(
    (rule) => rule.type === type
  )?.condition;
  if (!ruleFunction) {
    throw new TypeError(`Cannot find rule type ${type}`);
  }
  return ruleFunction;
}

function getFeeBasedRuleFunc(type: string) {
  const ruleFunction = feeBasedRules.find(
    (rule) => rule.type === type
  )?.calculateFeeBasedAdditionalFee;
  if (!ruleFunction) {
    throw new TypeError(`Cannot find rule type ${type}`);
  }
  return ruleFunction;
}

describe('Delivery Fee Calculator', () => {
  // Small Order Surcharge
  describe('Small Order Surcharge', () => {
    const smallOrderFunc = getAdditionalFeeRuleFunc('smallOrder');
    it('adds surcharge for orders under 10€', () => {
      const orderDetails = createOrderDetails(8.8, 1000, 1);
      const result = smallOrderFunc(orderDetails);
      expect(result).toBeCloseTo(1.2);
    });
    it('do not add surcharge for 10€ order', () => {
      const orderDetails = createOrderDetails(10, 1000, 1);
      const result = smallOrderFunc(orderDetails);
      expect(result).toBe(0);
    });
    it('do not add surcharge for over 10€ order', () => {
      const orderDetails = createOrderDetails(15, 1000, 1);
      const result = smallOrderFunc(orderDetails);
      expect(result).toBe(0);
    });
  });

  // Delivery Distance Fee
  describe('Delivery Distance Fee', () => {
    const deliveryDistanceFunc = getAdditionalFeeRuleFunc('deliveryDistance');
    it('calculates correct fee for 1 meters', () => {
      const orderDetails = createOrderDetails(20, 1, 1);
      const result = deliveryDistanceFunc(orderDetails);
      expect(result).toBe(2);
    });
    it('calculates correct fee for 999 meters', () => {
      const orderDetails = createOrderDetails(20, 999, 1);
      const result = deliveryDistanceFunc(orderDetails);
      expect(result).toBe(2);
    });
    it('calculates correct fee for 1499 meters', () => {
      const orderDetails = createOrderDetails(20, 1499, 1);
      const result = deliveryDistanceFunc(orderDetails);
      expect(result).toBe(3);
    });
    it('calculates correct fee for 1500 meters', () => {
      const orderDetails = createOrderDetails(20, 1500, 1);
      const result = deliveryDistanceFunc(orderDetails);
      expect(result).toBe(3);
    });
    it('calculates correct fee for 1501 meters', () => {
      const orderDetails = createOrderDetails(20, 1501, 1);
      const result = deliveryDistanceFunc(orderDetails);
      expect(result).toBe(4);
    });
  });

  // Item Count Surcharge
  describe('Item Count Surcharge', () => {
    const itemCountFunc = getAdditionalFeeRuleFunc('itemCount');
    it('no surcharge for 4 items', () => {
      const orderDetails = createOrderDetails(20, 1000, 4);
      const result = itemCountFunc(orderDetails);
      expect(result).toBe(0);
    });
    it('adds surcharge for 5 items', () => {
      const orderDetails = createOrderDetails(20, 1000, 5);
      const result = itemCountFunc(orderDetails);
      expect(result).toBeCloseTo(0.5, 2);
    });
    it('adds surcharge for 10 items', () => {
      const orderDetails = createOrderDetails(20, 1000, 10);
      const result = itemCountFunc(orderDetails);
      expect(result).toBe(3);
    });
    it('adds surcharge and bulk fee for 13 items', () => {
      const orderDetails = createOrderDetails(20, 1000, 13);
      const result = itemCountFunc(orderDetails);
      expect(result).toBe(5.7);
    });
    it('adds surcharge and bulk fee for 14 items', () => {
      const orderDetails = createOrderDetails(20, 1000, 14);
      const result = itemCountFunc(orderDetails);
      expect(result).toBe(6.2);
    });
  });

  // Maximum Delivery Fee
  describe('Maximum Delivery Fee', () => {
    it('does not exceed 15€', () => {
      const orderDetails = createOrderDetails(20, 10000, 20); // large order
      const result = deliveryFeeCaculator(orderDetails);
      expect(result.deliveryFee).toBeLessThanOrEqual(15);
    });
  });

  // Free Delivery for High-Value Orders
  describe('Free Delivery for High-Value Orders', () => {
    const highValueFreeDeliveryCondition =
      getFreeDeliveryRuleFunc('freeDelivery');
    it('dont provides free delivery for orders under 200€', () => {
      const orderDetails = createOrderDetails(199, 1000, 1);
      const result = highValueFreeDeliveryCondition(orderDetails);
      expect(result).toBeFalsy();
    });
    it('provides free delivery for orders exactly 200€', () => {
      const orderDetails = createOrderDetails(200, 1000, 1);
      const result = highValueFreeDeliveryCondition(orderDetails);
      expect(result).toBeTruthy();
    });
    it('provides free delivery for orders over 200€', () => {
      const orderDetails = createOrderDetails(201, 1000, 1);
      const result = highValueFreeDeliveryCondition(orderDetails);
      expect(result).toBeTruthy();
    });
  });

  // Rush Hour Fee Increase
  describe('Rush Hour Fee Increase', () => {
    const rushHourFunction = getFeeBasedRuleFunc('rushHour');
    it('increases fee during rush hour on Fridays', () => {
      const orderDetails = createOrderDetails(20, 1000, 1, RUSH_HOUR_TIME);
      const result = rushHourFunction(orderDetails, 2);
      expect(result).toBeCloseTo(0.4);
    });
  });
});
