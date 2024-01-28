import { OrderDetailFormType } from '../components/OrderDetailsForm/OrderDetailsForm';
import {
  calculateDeliveryDistanceSurcharge,
  calculateNumberOfItemSurcharge,
  calculateRushHourSurcharge,
  calculateSmallOrderSurcharge,
  eligibleForFreeDeliveryBasedOnCartValue,
} from './ruleHelperFunctions';
import { validationSchema } from './orderDetailsValidationSchema';
import { MAX_DELIVERY_FEE } from './constants';

export enum DeliveryFeeRuleId {
  // Free delivery rules
  FreeDeliveryCartValueBased = 'FREE_DELIVERY_CART_VALUE_BASED',

  // Surcharge rule
  SurchargeSmallOrder = 'SURCHARGE_SMALL_ORDER',
  SurchargeDeliveryDistance = 'SURCHARGE_DELIVERY_DISTANCE',
  SurchargeItemCount = 'SURCHARGE_ITEM_COUNT',
  SurchargeRushHour = 'RUSH_HOUR',

  // Other rule
  MaxFee = 'MAX_FEE',
}

type FeeAdjustmentResult =
  | { isRuleApplied: true; newFee: number; feeChangeAmount?: number }
  | { isRuleApplied: false };

type DeliveryFeeRuleType = {
  /**
   * A short message describe the rule to the client
   */
  message: string;
  /**
   * Set to True if the chain of responsibilities should end if this particular rule is applied
   */
  shouldTerminateCalculationIfApplied?: boolean;
  /**
   * Function try and apply rule to the requested order details and return the fee adjustment instructions.
   * @param requestedOrderDetails the requested order details object
   * @param currentFee the current calculated delivery fee
   * @returns fee adjustment result object (type FeeAdjustmentResult)
   */
  getFeeAdjustment: (
    requestedOrderDetails: OrderDetailFormType,
    currentFee: number
  ) => FeeAdjustmentResult;
};

export type FeeCalculatorReturnType = {
  /**
   * The calculated delivery fee
   */
  deliveryFee: number;
  /**
   * Array of object that stores the information about the applied rules
   */
  subjectedRules: {
    id: DeliveryFeeRuleId;
    message: string;
    amount: string;
  }[];
};

export type DeliveryFeeRulesMapType = {
  [key in DeliveryFeeRuleId]: DeliveryFeeRuleType;
};

const RULE_NOT_APPLY: FeeAdjustmentResult = {
  isRuleApplied: false,
};

export const deliveryFeeRulesMap: DeliveryFeeRulesMapType = {
  [DeliveryFeeRuleId.FreeDeliveryCartValueBased]: {
    message: 'Enjoy free delivery for order of 200€ or more.',
    shouldTerminateCalculationIfApplied: true,
    getFeeAdjustment: ({ cartValue }) =>
      eligibleForFreeDeliveryBasedOnCartValue(cartValue)
        ? {
            isRuleApplied: true,
            newFee: 0,
          }
        : RULE_NOT_APPLY,
  },
  [DeliveryFeeRuleId.SurchargeSmallOrder]: {
    message:
      'For orders under 10€, a small order surcharge equal to the difference up to 10€ will be added to your delivery fee.',
    getFeeAdjustment: ({ cartValue }, currentFee) => {
      const surcharge = calculateSmallOrderSurcharge(cartValue);
      return surcharge !== 0
        ? {
            isRuleApplied: true,
            newFee: currentFee + surcharge,
            feeChangeAmount: surcharge,
          }
        : RULE_NOT_APPLY;
    },
  },
  [DeliveryFeeRuleId.SurchargeDeliveryDistance]: {
    message:
      'Delivery fee: 2€ for the first 1km, plus 1€ for every additional 500m (minimum 1€ surcharge for distances over 1km).',
    getFeeAdjustment: ({ deliveryDistance }, currentFee) => {
      const surcharge = calculateDeliveryDistanceSurcharge(deliveryDistance);
      return surcharge !== 0
        ? {
            isRuleApplied: true,
            newFee: currentFee + surcharge,
            feeChangeAmount: surcharge,
          }
        : RULE_NOT_APPLY;
    },
  },
  [DeliveryFeeRuleId.SurchargeItemCount]: {
    message:
      'Orders with 5+ items incur a 50 cent surcharge per item, starting from the 5th item, and a 1,20€ bulk fee for more than 12 items.',
    getFeeAdjustment: ({ numberOfItems }, currentFee) => {
      const surcharge = calculateNumberOfItemSurcharge(numberOfItems);
      return surcharge !== 0
        ? {
            isRuleApplied: true,
            newFee: currentFee + surcharge,
            feeChangeAmount: surcharge,
          }
        : RULE_NOT_APPLY;
    },
  },
  [DeliveryFeeRuleId.SurchargeRushHour]: {
    message:
      'During Friday rush hours (3 - 7 PM Local Time Zone), delivery fees are increased by 1.2x.',
    getFeeAdjustment: ({ orderTime }, currentFee) => {
      const surcharge = calculateRushHourSurcharge(orderTime, currentFee);
      return surcharge !== 0
        ? {
            isRuleApplied: true,
            newFee: currentFee + surcharge,
            feeChangeAmount: surcharge,
          }
        : RULE_NOT_APPLY;
    },
  },
  [DeliveryFeeRuleId.MaxFee]: {
    message: `Maximum delivery fee of 15€ reached`,
    getFeeAdjustment: (_, currentFee) =>
      currentFee > MAX_DELIVERY_FEE
        ? {
            isRuleApplied: true,
            newFee: MAX_DELIVERY_FEE,
          }
        : RULE_NOT_APPLY,
  },
};

const deliveryFeeRuleIdsInOrder: DeliveryFeeRuleId[] = [
  // Rules that would terminate the calculation if applied should be run first
  // Example: Free delivery Rule should run first
  DeliveryFeeRuleId.FreeDeliveryCartValueBased,

  // Normal surcharge Rules
  DeliveryFeeRuleId.SurchargeSmallOrder,
  DeliveryFeeRuleId.SurchargeDeliveryDistance,
  DeliveryFeeRuleId.SurchargeItemCount,

  // Surcharge multiplier Rules should be run after all but before the maximum fee limit Rules
  DeliveryFeeRuleId.SurchargeRushHour,

  // Maximum fee limit Rules
  DeliveryFeeRuleId.MaxFee,
];

/**
 * Calculates the delivery fee based on various rules.
 * - Small order surcharge is added for orders less than 10€.
 * - Delivery distance fee: 2€ for the first 1km, then 1€ for every additional 500m.
 * - Item count surcharge: 50 cents per item for 5+ items; additional bulk fee for 12+ items.
 * - Max fee cap at 15€.
 * - Free delivery for orders 200€ and above.
 * - Rush hour (Fri, 3-7 PM Local Time) fee increase by 1.2x.
 *
 * @param orderDetails The details of the order.
 * @returns The calculated fee and applied rules.
 */
export function deliveryFeeCalculator(
  orderDetails: OrderDetailFormType
): FeeCalculatorReturnType {
  // Validate the order details request object
  if (!validationSchema.isValidSync(orderDetails)) {
    throw new TypeError('Invalid Order Details');
  }

  let deliveryFeeResponse: FeeCalculatorReturnType = {
    deliveryFee: 0,
    subjectedRules: [],
  };

  // Loop through all the rules in an ordered matter
  for (const ruleId of deliveryFeeRuleIdsInOrder) {
    const rule = deliveryFeeRulesMap[ruleId];
    const currentFee = deliveryFeeResponse.deliveryFee;

    const { message, getFeeAdjustment } = rule;
    const feeAdjustment = getFeeAdjustment(orderDetails, currentFee);

    if (feeAdjustment.isRuleApplied) {
      // Modify response by construct new response object (the functional
      // programming way, the alternative would be modifying the object in-place
      // would technically be more efficient though it does not adhere to
      // functional programming paradigms)
      deliveryFeeResponse = {
        deliveryFee: feeAdjustment.newFee,
        subjectedRules: [
          ...deliveryFeeResponse.subjectedRules,
          {
            id: ruleId,
            message,
            amount: feeAdjustment.feeChangeAmount
              ? `${feeAdjustment.feeChangeAmount.toFixed(2)}€`
              : '',
          },
        ],
      };

      if (rule.shouldTerminateCalculationIfApplied) {
        // Terminate the calculation early, return the current response
        return deliveryFeeResponse;
      }
    }
  }

  return deliveryFeeResponse;
}
