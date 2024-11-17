# UCADEMY

## Notes

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Please find other information guides in the `readme` folder.

## Requirements

- Node.JS ^20.11.1

## Getting Started

### Initial Setup

Run the following command on your local environment:

```sh
npm install
```

### Run locally in development mode with live reload

Run the following command on your local environment, then open <http://localhost:3000/> on your browser to see your project:

```sh
npm run dev
```

## Codebase Structure

```sh
.
└── src/
  ├── api                               # Put all defined APIs here, grouped by API path.
  ├── app                               # App router, just define the route.
  │   ├── (dashboard)
  │   ├── layout.tsx
  │   └── page.tsx
  │── shared
      ├── components                        # Components that are shared across multiple features.
      │   ├── common                        # Common component is a component composed of multiple components that are shared across multiple features.
      │   │   └── index.ts                  # Export all common components.
      │   ├── icons
      │   │   └── index.ts                  # Export all icons.
      │   ├── layouts                       # Put all layouts, such as header, footer, sidebar, etc.
      │   │   └── index.ts                  # Export all layout components.
      │   └── ui                            # Put all UI components here. UI component is an atomic component, such as button, input, etc.
      │       └── index.ts                  # Export all UI components.
      ├── constants                         # Put all defined global constants that are shared across multiple features.
      │   ├── app.constant.ts               # Defined app constant.
      │   └── course-enums.ts               # Defined course enum.
      ├── contexts                          # Put all defined global contexts here.
      │   └── index.ts                      # Export all contexts.
      ├── helpers                           # Put all defined global helpers here.
      ├── hocs                              # Put all defined global HOCs here.
      ├── hooks                             # Put all defined global hooks here.
      │   └── index.ts                      # Export all hooks.
      ├── libs                              # Put all custom/config libraries here.
      │   ├── mongoose
      │   └── index.ts
      ├── stores                            # Put all defined global Zustand stores here.
      │   └── app-store.ts
      ├── styles                            # Put all global styles here.
      └── types                             # Put all defined global types here.
        ├── course.type.ts
        └── coupon.type.ts
  ├── middleware.ts                     # middleware like Clerk
  ├── middlewares                       # Put all others defined middlewares here.
  ├── modules                           # Put all defined modules here. Module is a collection of features that are related to each other.
  │   └── course                 # Example module. Each module should have its own components, constants, contexts, hooks, pages, schemas, stores, types, etc.
  │       ├── actions
  │       ├── components
  │       ├── constants
  │       ├── contexts
  │       ├── hooks
  │       ├── schemas
  │       ├── types
  │       ├── utils
  │       ├── pages                     # Put all pages here. Page is a container component that is used to render a specific route.
  │       │   ├── create       # Example page. Each page should have its own components, constants, contexts, hooks, schemas, stores, types, etc.
  │       │   │   ├── components
  │       │   │   ├── constants
  │       │   │   ├── contexts
  │       │   │   ├── hooks
  │       │   │   ├── schemas
  │       │   │   ├── stores
  │       │   │   ├── types
  │       │   │   ├── utils
  │       │   │   └── index.ts
  │       │   └── index.ts
  │       ├── schemas
  │       ├── stores
  │       ├── types
  │       └── index.ts                  # Export pages to be used in the app router.

```

## Module Concept

- Module is a collection of features that are related to each other.
- Each module should have its own components, constants, contexts, hooks, pages, schemas, stores, types, etc. If other modules use components, constants, contexts, hooks, pages, schemas, stores, types, etc. in the module, it should be put in the folder of the root.
- Page is a container component that is used to render a specific route.
- The page should have its own components, constants, contexts, hooks, schemas, stores, types, etc. If other pages use components, constants, contexts, hooks, schemas, stores, types, etc. in the module, it should be put in the module's folder.
- Only export the necessary items in the module's `index.ts` file.

### How to create a new module?

When creating a new module, follow these rules:

- Define a new module in the `modules` folder.

  ```sh
  .
  └── modules
    └── {{module-name}}
      ├── components
      ├── constants
      ├── contexts
      ├── hooks
      ├── pages
      ├── schemas
      ├── stores
      ├── types
      └── index.ts
  ```

## Coding Style

### Naming Convention

- Use `kebab-case` for folder and file names.
- Use `PascalCase` for component, enum, type/interface names.
- Use `camelCase` for variable, function names.
- Use `UPPER_CASE` for constant names.

### Code Formatting

- Use `Prettier` for code formatting.
- Use `ESLint` for code linting.
- Use `Husky` for pre-commit hooks.
- Use `Lint-staged` for linting staged files.

```

```
