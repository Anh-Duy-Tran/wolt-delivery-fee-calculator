import { describe, it, expect } from 'vitest';
import {
  DeliveryFeeRuleId,
  FeeCalculatorReturnType,
  deliveryFeeCaculator,
} from './deliveryFeeCaculator';
import {
  calculateDeliveryDistanceSurcharge,
  calculateNumberOfItemSurcharge,
  calculateRushHourSurcharge,
  calculateSmallOrderSurcharge,
  eligibleForFreeDeliveryBasedOnCartValue,
} from './ruleHelperFunctions';

const NORMAL_TIME = new Date(2024, 0, 22, 10, 0, 0);
const RUSH_HOUR_TIME = new Date(2024, 0, 26, 16, 0, 0); // A Friday during rush hour

// Helper function to create order details
function createOrderDetails(
  cartValue: number,
  deliveryDistance: number,
  numberOfItems: number,
  orderTime: Date = NORMAL_TIME
) {
  return { cartValue, deliveryDistance, numberOfItems, orderTime };
}

function findRuleByIdAndAssertAmount(
  result: FeeCalculatorReturnType,
  id: DeliveryFeeRuleId,
  amount: string = '' // default value
) {
  const itemCountRule = result.subjectedRules.find((rule) => rule.id === id);
  expect(itemCountRule).toBeDefined();
  expect(itemCountRule?.amount).toBe(amount);
}

describe('Delivery Fee Calculator', () => {
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
      it('calculates correct fee for 1 meters', () => {
        const result = calculateDeliveryDistanceSurcharge(1);
        expect(result).toBe(2);
      });
      it('calculates correct fee for 999 meters', () => {
        const result = calculateDeliveryDistanceSurcharge(999);
        expect(result).toBe(2);
      });
      it('calculates correct fee for 1499 meters', () => {
        const result = calculateDeliveryDistanceSurcharge(1499);
        expect(result).toBe(3);
      });
      it('calculates correct fee for 1500 meters', () => {
        const result = calculateDeliveryDistanceSurcharge(1500);
        expect(result).toBe(3);
      });
      it('calculates correct fee for 1501 meters', () => {
        const result = calculateDeliveryDistanceSurcharge(1501);
        expect(result).toBe(4);
      });
    });

    // Item Count Surcharge calculate function
    describe('Item Count Surcharge', () => {
      it('no surcharge for 4 items', () => {
        const result = calculateNumberOfItemSurcharge(4);
        expect(result).toBe(0);
      });
      it('adds surcharge for 5 items', () => {
        const result = calculateNumberOfItemSurcharge(5);
        expect(result).toBeCloseTo(0.5, 2);
      });
      it('adds surcharge for 10 items', () => {
        const result = calculateNumberOfItemSurcharge(10);
        expect(result).toBe(3);
      });
      it('adds surcharge and bulk fee for 13 items', () => {
        const result = calculateNumberOfItemSurcharge(13);
        expect(result).toBe(5.7);
      });
      it('adds surcharge and bulk fee for 14 items', () => {
        const result = calculateNumberOfItemSurcharge(14);
        expect(result).toBe(6.2);
      });
    });

    // Free Delivery for High-Value Orders
    describe('Free Delivery for High-Value Orders', () => {
      it('dont provides free delivery for orders under 200€', () => {
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
      it('increases fee during rush hour on Fridays', () => {
        const result = calculateRushHourSurcharge(RUSH_HOUR_TIME, 2);
        expect(result).toBeCloseTo(0.4);
      });
      it('not increases fee during normal day', () => {
        const result = calculateRushHourSurcharge(NORMAL_TIME, 2);
        expect(result).toBe(0);
      });
      it('not increases fee before 3PM Friday', () => {
        const justBefore3PM = new Date(2024, 0, 26, 14, 59, 59);
        const result = calculateRushHourSurcharge(justBefore3PM, 2);
        expect(result).toBe(0);
      });
      it('not increases fee after 7PM Friday', () => {
        const justAfter7PM = new Date(2024, 0, 26, 19, 0, 1);
        const result = calculateRushHourSurcharge(justAfter7PM, 2);
        expect(result).toBe(0);
      });
    });
  });

  // Maximum Delivery Fee
  describe('All rules combine', () => {
    describe('Maximum Delivery Fee', () => {
      it('does not exceed 15€', () => {
        const orderDetails = createOrderDetails(20, 10000, 25);
        const result = deliveryFeeCaculator(orderDetails);

        expect(result.deliveryFee).toBe(15);
        findRuleByIdAndAssertAmount(result, DeliveryFeeRuleId.MaxFee);
      });
    });
    describe('Throw on invalid order details', () => {
      it('invalid cartValue', () => {
        let orderDetails = createOrderDetails(-20, 10000, 25);
        expect(() => deliveryFeeCaculator(orderDetails)).toThrow();
        orderDetails = createOrderDetails(0, 10000, 25);
        expect(() => deliveryFeeCaculator(orderDetails)).toThrow();
      });
      it('invalid distance', () => {
        let orderDetails = createOrderDetails(20, 1000.5, 25);
        expect(() => deliveryFeeCaculator(orderDetails)).toThrow();
        orderDetails = createOrderDetails(20, 0, 25);
        expect(() => deliveryFeeCaculator(orderDetails)).toThrow();
        orderDetails = createOrderDetails(20, -100, 25);
        expect(() => deliveryFeeCaculator(orderDetails)).toThrow();
      });
      it('invalid number of items', () => {
        let orderDetails = createOrderDetails(20, 1000, 10.5);
        expect(() => deliveryFeeCaculator(orderDetails)).toThrow();
        orderDetails = createOrderDetails(20, 1000, 0);
        expect(() => deliveryFeeCaculator(orderDetails)).toThrow();
        orderDetails = createOrderDetails(20, 1000, -4);
        expect(() => deliveryFeeCaculator(orderDetails)).toThrow();
      });
    });
    describe('Correct calculate fee', () => {
      it('for order value from 200 euro, free delivery applied', () => {
        const orderDetails = createOrderDetails(200, 1234, 10);
        const result = deliveryFeeCaculator(orderDetails);

        expect(result.deliveryFee).toBe(0);
        // only one free delivery rule should be applied
        expect(result.subjectedRules.length).toBe(1);
        findRuleByIdAndAssertAmount(
          result,
          DeliveryFeeRuleId.FreeDeliveryCartValueBased
        );
      });
      it('for order 100 euro, 2m, 2 items, normal hour', () => {
        const orderDetails = createOrderDetails(100, 2, 2);
        const result = deliveryFeeCaculator(orderDetails);

        expect(result.deliveryFee).toBe(2);
        expect(result.subjectedRules.length).toBe(1);
        findRuleByIdAndAssertAmount(
          result,
          DeliveryFeeRuleId.SurchargeDeliveryDistance,
          '2.00€'
        );
      });
      it('for order 100 euro, 1001m, 20 items, normal hour', () => {
        const orderDetails = createOrderDetails(100, 1001, 20);
        const result = deliveryFeeCaculator(orderDetails);

        expect(result.deliveryFee).toBe(12.2);
        expect(result.subjectedRules.length).toBe(2);
        findRuleByIdAndAssertAmount(
          result,
          DeliveryFeeRuleId.SurchargeDeliveryDistance,
          '3.00€'
        );
        findRuleByIdAndAssertAmount(
          result,
          DeliveryFeeRuleId.SurchargeItemCount,
          '9.20€'
        );
      });
      it('for order 100 euro, 1234m, 10 items, rush hour', () => {
        const orderDetails = createOrderDetails(100, 1234, 10, RUSH_HOUR_TIME);
        const result = deliveryFeeCaculator(orderDetails);

        expect(result.deliveryFee).toBe(7.2);
        expect(result.subjectedRules.length).toBe(3);
        findRuleByIdAndAssertAmount(
          result,
          DeliveryFeeRuleId.SurchargeItemCount,
          '3.00€'
        );
        findRuleByIdAndAssertAmount(
          result,
          DeliveryFeeRuleId.SurchargeDeliveryDistance,
          '3.00€'
        );
        findRuleByIdAndAssertAmount(
          result,
          DeliveryFeeRuleId.SurchargeRushHour,
          '1.20€'
        );
      });
    });
  });
});
