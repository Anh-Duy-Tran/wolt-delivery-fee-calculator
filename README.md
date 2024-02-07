# Wolt Summer 2024 Engineering Internships Assignment

[![codecov](https://codecov.io/gh/Anh-Duy-Tran/wolt-delivery-fee-calculation/graph/badge.svg?token=CJQV0NZ99N)](https://codecov.io/gh/Anh-Duy-Tran/wolt-delivery-fee-calculation) [![Default Project](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/jsr1iq&style=flat&logo=cypress)](https://cloud.cypress.io/projects/jsr1iq/runs)

Deployed url: [https://wolt-delivery-fee-calculation.vercel.app/](https://wolt-delivery-fee-calculation.vercel.app/)

Please find in this folder the solution to the preliminary assignment for the frontend internships.

### Tech stack:

- **React** with **Typescript** bundled with **Vite**.
- Styling with **TailwindCss**.
- Unit testing with **Vitest** and **Jest**.
- End to end testing with **Cypress**.
- CI/CD with **Github actions**.
- Deployed with **Vercel**.

# Table of Contents

- [Wolt Summer 2024 Engineering Internships Assignment](#wolt-summer-2024-engineering-internships-assignment)
  - [Tech stack:](#tech-stack)
- [Table of Contents](#table-of-contents)
  - [Requirement](#requirement)
  - [Getting started](#getting-started)
    - [With Docker Compose](#with-docker-compose)
    - [With Docker](#with-docker)
    - [With npm](#with-npm)
  - [Testing](#testing)
    - [Unit test (with Vitest)](#unit-test-with-vitest)
    - [End-to-end test (with Cypress)](#end-to-end-test-with-cypress)
  - [Notable extra features](#notable-extra-features)
  - [Demos](#demos)

## Requirement

There are multiple ways to build and run this application. Please satisfy one of these requirements to get started:

- Docker (tested on version 23.0.5)
- Docker compose (tested on version v2.17.3)
- Node (tested on v21.5.0)

## Getting started

### With Docker Compose

<i>Required Docker and Docker Compose</i>

Build and run command for docker compose:

```
$ docker compose up -d
```

Once finished, the application should be available on [http://localhost:3000](http://localhost:3000)

### With Docker

<i>Required Docker</i>

Build the image with:

```
$ docker build -t duytran/delivery-fee-calculator:latest .
```

Run the image with:

```
$ docker run --name dfc-container -p 3000:3000 duytran/delivery-fee-calculator:latest
```

Once finished, the application should be available on [http://localhost:3000](http://localhost:3000)

### With npm

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

## Testing

<i>Required Node</i>

### Unit test (with Vitest)

Start the test runner in the interactive watch mode.

```
$ npm run test
```

### End-to-end test (with Cypress)

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

- The application also calculates the components of the delivery fee, detailing how the fee is computed and which rules are applied to the order.
- Interactive tooltip.
- Accessible on Desktop (PC), pressing **tab** would cycle the focus to every interactable component.
- Accessible also on Mobile, using responsive media query to restructure component to work well on smaller screen.

## Demos

https://github.com/Anh-Duy-Tran/wolt-delivery-fee-calculation/assets/113171462/395d0986-09bf-4ddb-b264-fb2697cba24d

https://github.com/Anh-Duy-Tran/wolt-delivery-fee-calculation/assets/113171462/4b663d8e-af2a-424a-bb93-baf0c543dbc3

https://github.com/Anh-Duy-Tran/wolt-delivery-fee-calculation/assets/113171462/b3f3c1d9-1546-427d-8277-ee5b36ad98de

https://github.com/Anh-Duy-Tran/wolt-delivery-fee-calculation/assets/113171462/8633060f-283a-4246-9f83-d81060e0f7bf
