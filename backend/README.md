# The Backend

This is the backend for the application, implemented as a REST API in Rust, using [Axum](https://github.com/tokio-rs/axum) for routing and [Utoipa](https://github.com/juhaku/utoipa) for OpenAPI documentation. It interacts with a SQL database for persistent storage.

Since this backend is a simple CRUD (Create, Read, Update, Delete) server without extreme concurrency requirements or performance bottlenecks, Rust may not be necessary. However, Rust provides type safety, performance, and reliability, making it a solid choice for backend development. Plus, we wanted to learn Rust.

## 📦 Project Structure

```
backend/
├── src/
│   └── main.rs       # Main entry point of the application
├── Cargo.toml        # Rust package dependencies
└── .env              # Environment variables (ignored in Git)
```

## 🚀 Development

If you haven't installed Rust, follow the instructions at:\
🔗 [Rust Installation Guide](https://www.rust-lang.org/tools/install)

In the backend directory, install the dependencies:

```sh
cargo build
```

To start the backend server, run:

```sh
cargo run
```

This will compile the project and start the API on http://localhost:3000

### 🌍 Making the Backend Accessible from Your Network

If you're running the React Native frontend on a physical device, it won’t be able to connect to localhost. You need to use your computer’s local network IP address.

📌 On Mac/Linux:

```sh
ipconfig getifaddr en0  # Wi-Fi users
ipconfig getifaddr en1  # Ethernet users
```

📌 On Windows:

```sh
ipconfig
```

Look for the IPv4 Address under your active network connection (e.g., Wi-Fi or Ethernet).
It will look something like 192.168.1.100.

Then, set the environment variable for the frontend to use this IP address.

### 🛠️ Testing the API

There are multiple ways to test the backend:

#### 1. Using Swagger

The backend includes OpenAPI documentation using Utoipa.
With the server running, open Swagger UI in a browser:
http://localhost:3000/swagger/

#### 2. Using cURL

Test API endpoints from the command line:

```sh
curl -X GET http://localhost:3000/users/1
```

#### 3. Using Postman

You can install Postman (either as the standalone application, or as a VSCode extension) and make HTTP requests there.

### 📜 Generating OpenAPI Types for the Frontend

The frontend needs to statically type API requests/responses using OpenAPI-generated TypeScript types.

1. Make sure the backend server is running.
2. Generate the static type files using: `npm run openapi`

This script will generate the static type files and save them to `/frontend/api/types.ts`.
