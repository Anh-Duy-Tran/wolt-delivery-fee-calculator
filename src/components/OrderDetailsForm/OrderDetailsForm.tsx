import { InputField } from '../InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../Button';
import {
  FeeCalculatorReturnType,
  deliveryFeeCaculator,
} from '../../utils/deliveryFeeCaculator';
import { Card } from '../Card';
import { validationSchema } from '../../utils/orderDetailsValidationSchema';

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
        <Button data-testid={'calculateFee'} className="mt-2" type="submit">
          CALCULATE FEE
        </Button>
      </form>
    </Card>
  );
}
