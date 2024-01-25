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
      <div>
        <p>
          Integrated CI/CD pipelines with Codecov and Cypress badges display
          test results live, ensuring reliability.
        </p>
        <br />
        <img src="./intro-tooltip.gif" />
        <p className="text-center">please try it out !</p>
        <br />
        <p>
          My project does more than just calculate fees - it demystifies them.
          Each fee component is clearly explained through interactive, reusable
          tooltips, offering users insight into their delivery costs with just a
          hover or click. I've also prioritized accessibility, making the app
          easily navigable and understandable for all users.
        </p>
      </div>
    </Card>
  );
}
