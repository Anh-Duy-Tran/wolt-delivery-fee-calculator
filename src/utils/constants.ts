// Constants for ruleId: FREE_DELIVERY_CART_VALUE_BASED
export const THRESHOLD_FREE_CART_VALUE = 200; // euros

// Constants for ruleId: SURCHARGE_SMALL_ORDER
export const SMALL_ORDER_SURCHARGE_THRESHOLD = 10; // euros

// Constants for ruleId: SURCHARGE_DELIVERY_DISTANCE
export const BASE_DISTANCE_LIMIT = 1000; // meter
export const BASE_DELIVERY_FEE = 2; // euros
export const ADDITIONAL_DISTANCE_UNIT = 500; // meter
export const ADDITIONAL_DISTANCE_FEE = 1; // euros

// Constants for ruleId: SURCHARGE_ITEM_COUNT
export const ITEM_SURCHARGE_THRESHOLD = 5; // number of items
export const ITEM_SURCHARGE_AMOUNT = 0.5; // euros
export const BULK_ITEM_THRESHOLD = 12; // number of items
export const BULK_SURCHARGE_AMOUNT = 1.2; // euros

// Constants for ruleId: RUSH_HOUR
export const RUSH_HOUR_DAY_OF_WEEK = 5; // Friday
export const RUSH_HOUR_START_TIME = 15; // 15:00 or 3:00 PM
export const RUSH_HOUR_END_TIME = 19; // 19:00 or 7:00 PM
export const RUSH_HOUR_MULTIPLIER = 1.2; // x1.2

// Constants for ruleId: MAX_FEE
export const MAX_DELIVERY_FEE = 15; // euros
