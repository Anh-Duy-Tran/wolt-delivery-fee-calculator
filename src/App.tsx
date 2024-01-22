import { SetStateAction, useState } from 'react';
import { Card } from './components/Card';
import { FeeResult } from './components/FeeResult/FeeResult';
import { OrderDetailsForm } from './components/OrderDetailsForm';
import { FeeCalculatorReturnType } from './utils/deliveryFeeCaculator';
import { OrderDetailFormType } from './components/OrderDetailsForm/OrderDetailsForm';

function App() {
  const [calculatedOrderDetails, setCalculatedOrderDetails] =
    useState<OrderDetailFormType>();
  const [feeResult, setFeeResult] = useState<FeeCalculatorReturnType>();

  const handleResult = (
    result: SetStateAction<FeeCalculatorReturnType | undefined>
  ) => setFeeResult(result);

  const saveCalculatedOrderDetails = (orderDetails: OrderDetailFormType) =>
    setCalculatedOrderDetails(orderDetails);

  return (
    <div id="background">
      <div className="flex h-full w-full flex-col items-center overflow-auto pt-[30px]">
        <h1>DELIVERY FEE CALCULATION</h1>
        <div className="m-8 grid w-[70%] max-w-[1450px] grid-cols-1 gap-4 tablet:grid-cols-2">
          <div>
            <OrderDetailsForm
              saveCalculatedOrderDetails={saveCalculatedOrderDetails}
              handleResult={handleResult}
            />
          </div>
          <div className="flex flex-col gap-4">
            <FeeResult
              orderDetails={calculatedOrderDetails}
              result={feeResult}
            />
            <Card className="flex flex-col gap-4">
              <h2>INTRODUCTION</h2>
              <div>
                <a href="https://codecov.io/gh/Anh-Duy-Tran/wolt-delivery-fee-calculation">
                  <img src="https://codecov.io/gh/Anh-Duy-Tran/wolt-delivery-fee-calculation/graph/badge.svg?token=CJQV0NZ99N" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
