import { describe, it, expect } from 'vitest';
import {
  DeliveryFeeRuleId,
  FeeCalculatorReturnType,
  deliveryFeeCalculator,
} from './deliveryFeeCalculator';

const NORMAL_TIME = new Date(2024, 0, 22, 10, 0, 0); // (Mon 22/1/2024 10:00:00)
const RUSH_HOUR_TIME = new Date(2024, 0, 26, 16, 0, 0); // A Friday during rush hour (Fri 26/1/2024 16:00:00)

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
  describe('Maximum Delivery Fee', () => {
    it('does not exceed 15€', () => {
      const orderDetails = createOrderDetails(20, 10000, 25);
      const result = deliveryFeeCalculator(orderDetails);

      expect(result.deliveryFee).toBe(15);
      findRuleByIdAndAssertAmount(result, DeliveryFeeRuleId.MaxFee);
    });
  });
  describe('Throw on invalid order details', () => {
    it('invalid cartValue', () => {
      let orderDetails = createOrderDetails(-20, 10000, 25);
      expect(() => deliveryFeeCalculator(orderDetails)).toThrow();
      orderDetails = createOrderDetails(0, 10000, 25);
      expect(() => deliveryFeeCalculator(orderDetails)).toThrow();
    });
    it('invalid distance', () => {
      let orderDetails = createOrderDetails(20, 1000.5, 25);
      expect(() => deliveryFeeCalculator(orderDetails)).toThrow();
      orderDetails = createOrderDetails(20, 0, 25);
      expect(() => deliveryFeeCalculator(orderDetails)).toThrow();
      orderDetails = createOrderDetails(20, -100, 25);
      expect(() => deliveryFeeCalculator(orderDetails)).toThrow();
    });
    it('invalid number of items', () => {
      let orderDetails = createOrderDetails(20, 1000, 10.5);
      expect(() => deliveryFeeCalculator(orderDetails)).toThrow();
      orderDetails = createOrderDetails(20, 1000, 0);
      expect(() => deliveryFeeCalculator(orderDetails)).toThrow();
      orderDetails = createOrderDetails(20, 1000, -4);
      expect(() => deliveryFeeCalculator(orderDetails)).toThrow();
    });
  });
  describe('Correct calculate fee', () => {
    it('for order value from 200 euro, free delivery applied', () => {
      const orderDetails = createOrderDetails(200, 1234, 10);
      const result = deliveryFeeCalculator(orderDetails);

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
      const result = deliveryFeeCalculator(orderDetails);

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
      const result = deliveryFeeCalculator(orderDetails);

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
      const result = deliveryFeeCalculator(orderDetails);

      expect(result.deliveryFee).toBeCloseTo(7.2);
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
