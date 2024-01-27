import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  cartValue: Yup.number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? null : value
    )
    .typeError('Cart value must be a number.')
    .positive('Cart value must be a positive number.')
    .required('Cart value is required.'),
  deliveryDistance: Yup.number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? null : value
    )
    .typeError('Delivery distance must be a number.')
    .positive('Delivery distance must be a positive number.')
    .integer('Delivery distance must be a whole number.')
    .required('Delivery distance is required.'),
  numberOfItems: Yup.number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? null : value
    )
    .typeError('Number of items must be a number.')
    .positive('Number of items must be a positive number.')
    .integer('Number of items must be a whole number.')
    .required('Number of items is required.'),
  orderTime: Yup.date()
    .transform(function (value) {
      return this.isType(value) ? value : undefined;
    })
    .required('Please enter a valid time.'),
});
