use axum::{Json, Router, routing::get};
use serde::{Deserialize, Serialize};
use utoipa::{OpenApi, ToSchema};

#[derive(Debug, Serialize, Deserialize, ToSchema)]
struct User {
    id: u32,
    name: String,
}

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
    Json(User {
        id: 1,
        name: "Alice".to_string(),
    })
}

#[derive(OpenApi)]
#[openapi(paths(get_user), components(schemas(User)))]
struct ApiDoc;

#[tokio::main]
async fn main() {
    // build the app and define the routes for the different API endpoints
    let app = Router::new()
        .route("/users/{id}", get(get_user))
        // Add the /swagger route to allow testing API endpoints
        .merge(
            utoipa_swagger_ui::SwaggerUi::new("/swagger")
                .url("/api-docs/openapi.json", ApiDoc::openapi()),
        );

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
