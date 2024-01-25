import { Card } from '../Card';
import { InfoTooltip } from '../InfoTooltip';

export function Introduction() {
  return (
    <Card className="flex flex-col gap-4">
      <h2>INTRODUCTION</h2>
      <div className="flex items-center gap-2">
        <InfoTooltip
          tipContent={
            <p>
              Codecov Report: Shows the percentage of code covered by tests.
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
              Cypress Status: Indicates the results of automated end-to-end
              tests using Cypress.
            </p>
          }
        >
          <a href="https://cloud.cypress.io/projects/jsr1iq/runs">
            <img src="https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/jsr1iq/main&style=flat&logo=cypress" />
          </a>
        </InfoTooltip>
      </div>
    </Card>
  );
}
