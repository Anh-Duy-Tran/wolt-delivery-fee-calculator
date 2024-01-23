import { SetStateAction, useState } from 'react';
import { Card } from './components/Card';
import { FeeResult } from './components/FeeResult/FeeResult';
import { OrderDetailsForm } from './components/OrderDetailsForm';
import { FeeCalculatorReturnType } from './utils/deliveryFeeCaculator';
import { OrderDetailFormType } from './components/OrderDetailsForm/OrderDetailsForm';
import { InfoTooltip } from './components/InfoTooltip';

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
              <div className="flex items-center gap-2">
                <InfoTooltip
                  tipContent={
                    <p>
                      Codecov Report: Shows the percentage of code covered by
                      tests.
                    </p>
                  }
                >
                  <a href="https://codecov.io/gh/Anh-Duy-Tran/wolt-delivery-fee-calculation">
                    <img src="https://codecov.io/gh/Anh-Duy-Tran/wolt-delivery-fee-calculation/graph/badge.svg?token=CJQV0NZ99N" />
                  </a>
                </InfoTooltip>
                <InfoTooltip
                  tipContent={
                    <p>
                      Cypress Status: Indicates the results of automated
                      end-to-end tests using Cypress.
                    </p>
                  }
                >
                  <a href="https://cloud.cypress.io/projects/jsr1iq/runs">
                    <img src="https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/jsr1iq/main&style=flat&logo=cypress" />
                  </a>
                </InfoTooltip>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
