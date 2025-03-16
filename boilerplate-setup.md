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

```sh
? What is your app named? › frontend
```

## Step 2: Install Backend Dependencies

### 2.1 Add Cargo Dependencies

Some dependencies use features to enable extra functionality, such as `tokio`.

```sh
# In the `/backend` directory

# Web Framework
cargo add axum

# Async Runtime
cargo add tokio --features full
# Testing utility for tokio
cargo add --dev tokio-test

# Serialization
cargo add serde --features derive

# OpenAPI Generation
cargo add utoipa --features axum_extras
cargo add utoipa-swagger-ui --features axum

# HTTP Server
cargo add tower
# Middleware
cargo add hyper --features full
```

### 2.2 Setup a simple REST server

For this example, we'll make a server that only has a GET request to `/users/{id}`. 

First, we define the `User` data structure, or "struct".

Clear `main.rs` and add this to the top.
```rust
use axum::{Router, routing::get, Json};
use serde::{Serialize, Deserialize};
use utoipa::{OpenApi, ToSchema};

#[derive(Debug, Serialize, Deserialize, ToSchema)]
struct User {
    id: u32,
    name: String,
}
```

Now, we define the API endpoint and the function to handle the get request. You can see more documentation for utoipa [here](https://github.com/juhaku/utoipa).
```rust
#[utoipa::path(
    get,
    path = "/users/{id}",
    params(("id" = u32, Path, description = "User ID")),
    responses(
        (status = 200, description = "User found", body = User),
        (status = 404, description = "User not found")
    )
)]
async fn get_user() -> Json<User> {
    Json(User { id: 1, name: "Alice".to_string() })
}
```

```rust
#[derive(OpenApi)]
#[openapi(paths(get_user), components(schemas(User)))]
struct ApiDoc;
```

```rust
#[tokio::main]
async fn main() {
    // build the app and define the routes for the different API endpoints
    let app = Router::new()
        .route("/users/{id}", get(get_user))
        // Add the /swagger route to allow testing API endpoints
        .merge(utoipa_swagger_ui::SwaggerUi::new("/swagger").url("/api-docs/openapi.json", ApiDoc::openapi()));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
```

### 2.3 Run the backend

```sh
cargo run
```

Open the Swagger UI: http://localhost:3000/swagger
OpenAPI Spec: http://localhost:3000/api-docs/openapi.json

## 3. Frontend Setup

### 3.1. ESLint

```sh
npm install -D eslint eslint-plugin-react-hooks@latest @typescript-eslint/eslint-plugin@latest eslint-plugin-jest@latest
```

Add the `.eslintrc.js` file to define the configurations for ESLint
```js
// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  ignorePatterns: ['/dist/*'],
  env: {
    // This tells ESLint to recognize Jest globals like `it` and `expect`
    jest: true, 
  },
  extends: [
    'expo',
    'plugin:jest/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime' 
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
};
```

Optional: I like to add these rules to `.eslintrc.js`. You can look up what each rule does on ESLint's website, and add your own.
```js
module.exports = {
  // ...
  rules: {
    "@typescript-eslint/no-shadow": ["error", { "allow": ["_"] }],
    "dot-notation": "error",
    "eqeqeq": "error",
    "no-param-reassign": "error",
    "no-var": "warn",
    "react/self-closing-comp": "warn",
    "require-await": "error",
    "yoda": "error"
  },
  // ...
}
```

Then, update the compilerOptions section in `tsconfig.json` to define jsx:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

In `./.vscode/settings.json` to enable eslint to work for `frontend` while having the parent directory open.
```json
{
  "eslint.workingDirectories": [
    { "directory": "./frontend", "changeProcessCWD": true }
  ]
}
```

### 3.2 Prettier

Add a `/frontend/.prettierrc.json`. Here are some that 
```json
{
  "singleQuote": true,
  "quoteProps": "consistent"
}
```