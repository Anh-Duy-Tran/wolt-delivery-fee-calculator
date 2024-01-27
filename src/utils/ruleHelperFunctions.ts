import {
  ADDITIONAL_DISTANCE_FEE,
  ADDITIONAL_DISTANCE_UNIT,
  BASE_DELIVERY_FEE,
  BASE_DISTANCE_LIMIT,
  BULK_ITEM_THRESHOLD,
  BULK_SURCHARGE_AMOUNT,
  ITEM_SURCHARGE_AMOUNT,
  ITEM_SURCHARGE_THRESHOLD,
  RUSH_HOUR_DAY_OF_WEEK,
  RUSH_HOUR_END_TIME,
  RUSH_HOUR_MULTIPLIER,
  RUSH_HOUR_START_TIME,
  SMALL_ORDER_SURCHARGE_THRESHOLD,
  THRESHOLD_FREE_CART_VALUE,
} from './constants';

/**
 * The delivery is free when the cart value is equal or more than 200€.
 * @param cartValue Value of the shopping cart in euros.
 * @return boolean represent the eligibility of the order to free delivery.
 */
export function eligibleForFreeDeliveryBasedOnCartValue(
  cartValue: number
): boolean {
  return cartValue >= THRESHOLD_FREE_CART_VALUE;
}

/**
 * If the cart value is less than 10€, a small order surcharge is added to the
 * delivery price. The surcharge is the difference between the cart value and
 * 10€.
 * For example if the cart value is 8.90€, the surcharge will be 1.10€.
 * @param cartValue Value of the shopping cart in euros.
 * @return surcharge amount in euros.
 */
export function calculateSmallOrderSurcharge(cartValue: number): number {
  return Math.max(SMALL_ORDER_SURCHARGE_THRESHOLD - cartValue, 0);
}

/**
 * A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery
 * distance is longer than that, 1€ is added for every additional 500 meters
 * that the courier needs to travel before reaching the destination. Even if the
 * distance would be shorter than 500 meters, the minimum fee is always 1€.
 * - Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€
 *   base fee + 1€ for the additional 500 m => 3€
 * - Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€
 *   base fee + 1€ for the additional 500 m => 3€
 * - Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€
 *   base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€
 * @param distance The distance between the store and customer’s location in meters.
 * @returns surcharge amount in euros (cannot be 0 in this case => rule always apply).
 */
export function calculateDeliveryDistanceSurcharge(distance: number): number {
  return (
    BASE_DELIVERY_FEE +
    Math.ceil(
      Math.max(distance - BASE_DISTANCE_LIMIT, 0) / ADDITIONAL_DISTANCE_UNIT
    ) *
      ADDITIONAL_DISTANCE_FEE
  );
}

/**
 *If the number of items is five or more, an additional 50 cent surcharge is
 *added for each item above and including the fifth item. An extra "bulk" fee
 *applies for more than 12 items of 1,20€
 * - Example 1: If the number of items is 4, no extra surcharge
 * - Example 2: If the number of items is 5, 50 cents surcharge is added
 * - Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is
 *   added
 * - Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 * 50
 *   cents) + 1,20€)
 * - Example 5: If the number of items is 14, 6,20€ surcharge is added ((10 * 50
 *   cents) + 1,20€)
 * @param numberOfItems The number of items in the customer's shopping cart.
 * @returns surcharge amount in euros.
 */
export function calculateNumberOfItemSurcharge(numberOfItems: number): number {
  let surcharge = 0;

  if (numberOfItems >= ITEM_SURCHARGE_THRESHOLD) {
    surcharge +=
      (numberOfItems - ITEM_SURCHARGE_THRESHOLD + 1) * ITEM_SURCHARGE_AMOUNT;
  }
  // Adding bulk price if the number of item surpass the bulk number of item threshold
  if (numberOfItems > BULK_ITEM_THRESHOLD) {
    surcharge += BULK_SURCHARGE_AMOUNT;
  }

  return surcharge;
}

/**
 * During the Friday rush, 3 - 7 PM, the delivery fee (the total fee including
 * possible surcharges) will be multiplied by 1.2x.
 * @param orderTime The date/time when the order is being made.
 * @param currentFee The current calculated delivery fee for the order in euros.
 * @returns surcharge amount in euros.
 */
export function calculateRushHourSurcharge(
  orderTime: Date,
  currentFee: number
): number {
  if (
    orderTime.getDay() === RUSH_HOUR_DAY_OF_WEEK &&
    orderTime.getHours() >= RUSH_HOUR_START_TIME &&
    orderTime.getHours() < RUSH_HOUR_END_TIME
  ) {
    return currentFee * (RUSH_HOUR_MULTIPLIER - 1); // getting only the increased fee from the rule hence the "-1"
  }

  return 0;
}
