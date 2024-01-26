# Wolt Summer 2024 Engineering Internships Assignment

Please find in this folder the solution to the preliminary Assignment for the frontend internships.

Tech stack:

- **React** with **Typescript** bundle with **Vite**.
- Styling with **TailwindCss**.
- Unit testing with **Vitest** and **Jest**.
- End to end testing with **Cypress**.
- CI/CD with **Github actions**.

## Getting started

### With Docker:

```
$ docker compose up -d
```

Once finish, the application should be available on [http://localhost:3000](http://localhost:3000)

### With npm:

```
npm install
```

Install the dependencies before starting the project.

```
npm run dev
```

Runs the app in the development mode. (Visit: [http://localhost:5173](http://localhost:5173))

```
npm run build
npm run preview
```

Or build and preview the production. (Visit: [http://localhost:4173](http://localhost:4173))

### Testing

**Unit test (with Vitest):**

```
npm run test
```

Start the test runner in the interactive watch mode.

**End to end test (with Cypress):**

```
npm run cy:local
```

Run end to end test suites.

```
npm run cy-component:local
```

Run component test suites.
