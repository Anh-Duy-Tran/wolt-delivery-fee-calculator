# Wolt Summer 2024 Engineering Internships Assignment

[![codecov](https://codecov.io/gh/Anh-Duy-Tran/wolt-delivery-fee-calculation/graph/badge.svg?token=CJQV0NZ99N)](https://codecov.io/gh/Anh-Duy-Tran/wolt-delivery-fee-calculation) [![Default Project](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/jsr1iq&style=flat&logo=cypress)](https://cloud.cypress.io/projects/jsr1iq/runs)

Deployed url: [https://wolt-delivery-fee-calculation.vercel.app/](https://wolt-delivery-fee-calculation.vercel.app/)

Please find in this folder the solution to the preliminary assignment for the frontend internships.

### Tech stack:

- **React** with **Typescript** bundle with **Vite**.
- Styling with **TailwindCss**.
- Unit testing with **Vitest** and **Jest**.
- End to end testing with **Cypress**.
- CI/CD with **Github actions**.
- Deployed with **Vercel**.

## Requirement

There are multiple ways to build and run this application. Please satisfy one of these requirements to get started:

- Docker (tested on version 23.0.5)
- Docker compose (tested on version v2.17.3)
- Node (tested on v21.5.0)

## Getting started

### With Docker Compose:

<i>Required Docker and Docker Compose</i>

Build and run command for docker compose:

```
$ docker compose up -d
```

Once finish, the application should be available on [http://localhost:3000](http://localhost:3000)

### With Docker:

<i>Required Docker</i>

Build the image with:

```
$ docker build -t duytran/delivery-fee-calculator:latest .
```

Run the image with:

```
$ docker run --name  dfc-container -p 3000:3000 duytran/delivery-fee-calculator:latest
```

Once finish, the application should be available on [http://localhost:3000](http://localhost:3000)

### With npm:

<i>Required Node</i>

Install the dependencies before starting the project.

```
$ npm install
```

Runs the app in the development mode. (Visit: [http://localhost:5173](http://localhost:5173))

```
$ npm run dev
```

Or build and preview the production. (Visit: [http://localhost:4173](http://localhost:4173))

```
$ npm run build
$ npm run preview
```

### Testing

<i>Required Node</i>

**Unit test (with Vitest):**

Start the test runner in the interactive watch mode.

```
$ npm run test
```

**End to end test (with Cypress):**

Run end to end test suites.

```
$ npm run cy:local
```

Run component test suites.

```
$ npm run cy-component:local
```

## Notable extra features

<i>Please find in the next chapter to see the demo of the mentioned features</i>

- Calculate also the delivery fee component i.e. it shows how the application calculate the delivery fee and what rules are applied to the order.
- Interactive tooltip.
- Accessible on Desktop (PC), pressing **tab** would cycle the focus to every interactable component.
- Accessible also on Mobile, using responsive media query to restructure component to work well on smaller screen.

## Demos

- Desktop (PC)
