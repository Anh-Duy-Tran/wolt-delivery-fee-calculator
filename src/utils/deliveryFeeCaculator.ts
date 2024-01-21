import { OrderDetailFormType } from '../components/OrderDetailsForm/OrderDetailsForm';

const MAX_DELIVERY_FEE = 15; // Euro

type AdditionalFeeRuleType = {
  message: string;
  calculateAdditionalFee: (orderDetails: OrderDetailFormType) => number;
};

type FreeDeliveryRuleType = {
  message: string;
  condition: (orderDetails: OrderDetailFormType) => boolean;
};

type FeeBasedRuleType = {
  message: string;
  calculateFeeBasedAdditionalFee: (
    orderDetails: OrderDetailFormType,
    currentFee: number
  ) => number;
};

export type FeeCalculatorReturnType = {
  deliveryFee: number;
  subjectedRules: {
    message: string;
    amount: string;
  }[];
};

const additionalFeeRules: AdditionalFeeRuleType[] = [
  {
    message:
      'For orders under 10€, a small order surcharge equal to the difference up to 10€ will be added to your delivery fee.',
    calculateAdditionalFee: ({ cartValue }) => {
      const smallOrderThreshold = 10; // Euro

      return Math.max(smallOrderThreshold - cartValue, 0);
    },
  },
  {
    message:
      'Delivery fee: 2€ for the first 1km, plus 1€ for every additional 500m (minimum 1€ surcharge for distances over 1km).',
    calculateAdditionalFee: ({ deliveryDistance }) => {
      const fixPriceDistance = 1000; // Meter
      const distanceInterval = 500; // Meter
      const pricePerInterval = 1; // Euro
      const fixPrice = 2; // Euro

      return (
        fixPrice +
        Math.ceil(
          Math.max(deliveryDistance - fixPriceDistance, 0) / distanceInterval
        ) *
          pricePerInterval
      );
    },
  },
  {
    message:
      'Orders with 5+ items incur a 50 cent surcharge per item, starting from the 5th item, and a 1,20€ bulk fee for more than 12 items.',
    calculateAdditionalFee: ({ numberOfItems }) => {
      const threshold = 4; // Number of Items
      const bulkThreshold = 12; // Number of Items
      const pricePerItem = 0.5; // Euro
      const bulkPrice = 1.2; // Euro

      let surcharge = 0; // Euro

      if (numberOfItems > threshold) {
        surcharge += (numberOfItems - threshold) * pricePerItem;
      }

      if (numberOfItems > bulkThreshold) {
        surcharge += bulkPrice;
      }

      return surcharge;
    },
  },
];

const freeDeliveryRules: FreeDeliveryRuleType[] = [
  {
    message: 'Enjoy free delivery for order of 200€ or more.',
    condition: ({ cartValue }) => {
      const threshold = 200; //Euro

      return cartValue >= threshold;
    },
  },
];

const feeBasedRules: FeeBasedRuleType[] = [
  {
    message:
      'During Friday rush hours (3 - 7 PM Local Time Zone), delivery fees are increased by 1.2x.',
    calculateFeeBasedAdditionalFee: (orderDetails, currentFee) => {
      const rushDay = 5; // Friday
      const lowerRushHour = 15; // 3PM or 15:00
      const higherRushHour = 19; // 7PM or 19:00
      const increaseFactor = 0.2; // 1.2 - 1 = 0.2 or 20% increase from the fee

      const { orderTime } = orderDetails;
      if (
        orderTime.getDay() === rushDay &&
        orderTime.getHours() >= lowerRushHour &&
        orderTime.getHours() < higherRushHour
      ) {
        const extraFee = currentFee * increaseFactor;
        return extraFee + currentFee > MAX_DELIVERY_FEE ? 0 : extraFee;
      }

      return 0;
    },
  },
];

export function deliveryFeeCaculator(
  orderDetails: OrderDetailFormType
): FeeCalculatorReturnType {
  const deliveryFeeResponse: FeeCalculatorReturnType = {
    deliveryFee: 0,
    subjectedRules: [],
  };

  for (const rule of freeDeliveryRules) {
    if (rule.condition(orderDetails)) {
      deliveryFeeResponse.subjectedRules.push({
        message: rule.message,
        amount: 'FREE',
      });

      // Stop the calculation if any match of the free delivery rules
      return deliveryFeeResponse;
    }
  }

  for (const rule of additionalFeeRules) {
    // Get the possible surcharge based only on the order details
    const fee = rule.calculateAdditionalFee(orderDetails);
    if (fee) {
      deliveryFeeResponse.deliveryFee += fee;
      deliveryFeeResponse.subjectedRules.push({
        message: rule.message,
        amount: `${fee.toFixed(2)}€`,
      });
    }
  }

  for (const rule of feeBasedRules) {
    // Get the possible surcharge based on the order details and the current calculated fee
    const fee = rule.calculateFeeBasedAdditionalFee(
      orderDetails,
      deliveryFeeResponse.deliveryFee
    );
    if (fee) {
      deliveryFeeResponse.deliveryFee += fee;
      deliveryFeeResponse.subjectedRules.push({
        message: rule.message,
        amount: `${fee.toFixed(2)}€`,
      });
    }
  }

  if (deliveryFeeResponse.deliveryFee > MAX_DELIVERY_FEE) {
    deliveryFeeResponse.deliveryFee = MAX_DELIVERY_FEE;
    deliveryFeeResponse.subjectedRules.push({
      message: 'Maximum delivery fee reached',
      amount: '',
    });
  }

  return deliveryFeeResponse;
}
