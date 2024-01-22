import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  cartValue: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Cart value is required.')
    .positive('Cart value must be a positive number.'),
  deliveryDistance: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Delivery distance is required.')
    .positive('Delivery distance must be a positive number.')
    .integer('Delivery distance must be a whole number.'),
  numberOfItems: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Number of items is required.')
    .positive('Number of items must be a positive number.')
    .integer('Number of items must be a whole number.'),
  orderTime: Yup.date()
    .transform(function (value) {
      return this.isType(value) ? value : undefined;
    })
    .required('Please enter a valid time.'),
});
