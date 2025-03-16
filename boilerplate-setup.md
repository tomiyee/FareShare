# The Monorepo

Frontend:
* Typescript
* React Native Framework
* ESLint + Prettier

Backend: 
* Rust
* Axum Framework
* Utoipa 

API:
* OpenAPI

Database:
* PostgreSQL

## Step 1: Initialize the Monorepo

The target structure of the repo at a high level is:

```
/FareShare
├── /frontend           # React-Native (TypeScript) app
│   ├── src
│   │   ├── api.ts      # TypeScript API client (auto-generated)
│   │   ├── types.ts    # Type definitions from OpenAPI
│   │   └── ...
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── ...
├── /backend            # Rust REST API
│   ├── src
│   │   ├── main.rs
│   │   ├── routes.rs
│   │   ├── models.rs   # Define API request/response models
│   │   ├── openapi.rs  # Utoipa setup
│   │   └── ...
│   ├── Cargo.toml
│   ├── openapi.json    # OpenAPI spec (generated)
│   ├── .env
│   └── ...
├── /scripts            # Automation scripts
│   ├── generate-types.sh  # Automates OpenAPI & TypeScript generation
│   └── ...
│── README.md
│── .gitignore
│── .github             # GitHub Actions workflows
│   ├── workflows
│   └── ...
```

### 1.1 Create the `/backend` directory

```sh
# In the root directory
mkdir backend && cd backend
cargo init --bin
```

### 1.2 Create the `/frontend` directory

See the recommended steps for creating a React Native project [here](https://docs.expo.dev/get-started/create-a-project/).

```sh
# In the root directory
npx create-expo-app@latest 
```

When prompted for the name of the app, simply enter "frontend". It will create a directory named frontend and populate it with the template.

## Step 2: