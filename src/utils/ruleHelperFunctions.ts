/**
 * The delivery is free when the cart value is equal or more than 200€.
 * @param cartValue Value of the shopping cart in euros.
 * @return boolean represent the eligibility of the order to free delivery.
 */
export function eligibleForFreeDeliveryBasedOnCartValue(
  cartValue: number
): boolean {
  const threshold = 200; //Euro
  return cartValue >= threshold;
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
  const smallOrderValueThreshold = 10; // Euro

  if (cartValue < smallOrderValueThreshold) {
    return Math.max(smallOrderValueThreshold - cartValue, 0);
  }

  return 0;
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
  const fixPriceDistance = 1000; // Meter
  const fixPrice = 2; // Euro
  const distanceInterval = 500; // Meter
  const pricePerInterval = 1; // Euro

  return (
    fixPrice +
    Math.ceil(Math.max(distance - fixPriceDistance, 0) / distanceInterval) *
      pricePerInterval
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
  const threshold = 4; // Number of items without surcharge
  const bulkThreshold = 12; // Number of Items
  const pricePerItem = 0.5; // Euro
  const bulkPrice = 1.2; // Euro

  let surcharge = 0;

  if (numberOfItems > threshold) {
    surcharge += (numberOfItems - threshold) * pricePerItem;
  }
  // Adding bulk price if the number of item surpass the bulk number of item threshold
  if (numberOfItems > bulkThreshold) {
    surcharge += bulkPrice;
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
  const rushDay = 5; // Friday
  const lowerRushHour = 15; // 3PM or 15:00
  const higherRushHour = 19; // 7PM or 19:00
  const increaseFactor = 0.2; // 1.2 - 1 = 0.2 or 20% increase from the fee

  if (
    orderTime.getDay() === rushDay &&
    orderTime.getHours() >= lowerRushHour &&
    orderTime.getHours() < higherRushHour
  ) {
    return currentFee * increaseFactor;
  }

  return 0;
}
