import { FeeCalculatorReturnType } from '../../utils/deliveryFeeCaculator';
import { Card } from '../Card';
import { InfoTooltip } from '../InfoTooltip';
import { OrderDetailFormType } from '../OrderDetailsForm/OrderDetailsForm';

interface FeeResultProps {
  orderDetails?: OrderDetailFormType;
  result?: FeeCalculatorReturnType;
}

export function FeeResult({ orderDetails, result }: FeeResultProps) {
  return (
    <Card className="flex flex-col gap-4">
      <h2>CALCULATION RESULT</h2>
      {result && orderDetails ? (
        <>
          <div>
            <h3>Order details:</h3>
            <div className="indented grid grid-cols-2">
              <p data-testid={'submittedCartValue'}>
                {`• Cart Value: ${orderDetails.cartValue.toFixed(2)}€`}
              </p>
              <p data-testid={'submittedDeliveryDistance'}>
                {`• Distance: ${orderDetails.deliveryDistance}m`}
              </p>
              <p data-testid={'submittedNumberOfItems'}>
                {`• Number of items: ${orderDetails.numberOfItems}`}
              </p>
              <p data-testid={'submittedOrderTime'}>
                {`• Time: ${orderDetails.orderTime.toDateString()} at ${orderDetails.orderTime.toLocaleTimeString()}`}
              </p>
            </div>
          </div>
          <div className="relative">
            <h3>Delivery price:</h3>
            <h1
              data-testid={'fee'}
              className="indented bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              {`${result.deliveryFee.toFixed(2)}€`}
            </h1>
            <InfoTooltip
              data-testid={'info-icon'}
              tipContent={
                <ul className="flex list-disc flex-col gap-2">
                  {result.subjectedRules.map((rule, i) => (
                    <li key={i}>{`${rule.message} ( ${rule.amount} )`}</li>
                  ))}
                </ul>
              }
            >
              {infoIcon}
            </InfoTooltip>
          </div>
        </>
      ) : (
        <div className="w-full text-center italic text-black/50">
          Fill in order details and press calculate to get result.
        </div>
      )}
    </Card>
  );
}

const infoIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.5 16.8v-1.2h1v1.2h-1zm0-9.6v7.2h1V7.2h-1z"></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 21.6a9.6 9.6 0 0 0 9.6-9.6 9.6 9.6 0 1 0-19.2 0 9.6 9.6 0 0 0 9.6 9.6zm0-1a8.6 8.6 0 1 0 0-17.2 8.6 8.6 0 0 0 0 17.2z"
    ></path>
  </svg>
);
