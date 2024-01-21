import { InputField } from '../InputField';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../Button';
import {
  FeeCalculatorReturnType,
  deliveryFeeCaculator,
} from '../../utils/deliveryFeeCaculator';
import { Card } from '../Card';

interface OrderDetailsFormProps {
  saveCalculatedOrderDetails: (orderDetails: OrderDetailFormType) => void;
  handleResult: (result: FeeCalculatorReturnType) => void;
}

export type OrderDetailFormType = {
  cartValue: number;
  deliveryDistance: number;
  numberOfItems: number;
  orderTime: Date;
};

export function OrderDetailsForm({
  saveCalculatedOrderDetails,
  handleResult,
}: OrderDetailsFormProps) {
  const validationSchema = Yup.object().shape({
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

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OrderDetailFormType>({
    mode: 'all',
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<OrderDetailFormType> = (data) => {
    handleResult(deliveryFeeCaculator(data));
    saveCalculatedOrderDetails(data);
  };

  return (
    <Card className=" flex flex-col gap-4">
      <h2>ORDER INFORMATION</h2>

      <form
        noValidate
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          {...register('cartValue')}
          errorMessage={errors.cartValue?.message}
          data-testid="cartValue"
          label="Cart Value (EUR)"
          type="number"
          step={0.1}
        />
        <InputField
          {...register('deliveryDistance')}
          errorMessage={errors.deliveryDistance?.message}
          data-testid="deliveryDistance"
          label="Delivery Distance (Meter)"
          type="number"
          step={10}
        />
        <InputField
          {...register('numberOfItems')}
          errorMessage={errors.numberOfItems?.message}
          data-testid="numberOfItems"
          label="Number of Items"
          type="number"
        />
        <InputField
          {...register('orderTime')}
          errorMessage={errors.orderTime?.message}
          data-testid="orderTime"
          label="Time"
          type="datetime-local"
          placeholder="DD.MM.YYYY"
        />
        <Button className="mt-2" type="submit">
          CALCULATE FEE
        </Button>
      </form>
    </Card>
  );
}
