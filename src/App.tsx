import { useState } from 'react';
import { FeeResult } from './components/FeeResult/FeeResult';
import { OrderDetailsForm } from './components/OrderDetailsForm';
import { FeeCalculatorReturnType } from './utils/deliveryFeeCalculator';
import { OrderDetailFormType } from './components/OrderDetailsForm/OrderDetailsForm';
import { Introduction } from './components/Introduction';

const TITLE_HEADER = 'DELIVERY FEE CALCULATOR';

function App() {
  const [calculatedOrderDetails, setCalculatedOrderDetails] =
    useState<OrderDetailFormType>();
  const [feeResult, setFeeResult] = useState<FeeCalculatorReturnType>();

  return (
    <div id="background">
      <div className="flex h-full w-full flex-col items-center overflow-auto pt-[30px]">
        <h1 className="px-4 text-center font-black">{TITLE_HEADER}</h1>
        <div className="grid w-full max-w-[1450px] grid-cols-1 gap-4 p-8 tablet:w-[70%] tablet:grid-cols-2">
          <div>
            <OrderDetailsForm
              saveCalculatedOrderDetails={setCalculatedOrderDetails}
              handleResult={setFeeResult}
            />
          </div>
          <div className="flex flex-col gap-4">
            <FeeResult
              orderDetails={calculatedOrderDetails}
              result={feeResult}
            />
            <Introduction />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
