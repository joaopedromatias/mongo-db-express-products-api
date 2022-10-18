# `Express Server Products CRUD Operations 🔧`

This project features a server made using `Express` and a user interface made using `React`.

The server works as a `web server` and as an `API` that allows the user to **_view_**, **_add_**, **_edit_** and **_delete_** products in a store admin pannel. 🛅

In the routes that require an id to be passed, the product router uses a **`custom middleware`** to check if the value provided as the id is valid. If it is, it passes the execution to the next handler ✔️ otherwise it sends the error response

There are other two **`custom middlewares`** in order to validate if the request body meets the expectations (on POST and UPDATE routes).

In order to run it locally: 

#### `npm install 💻`

#### `npm start ✨`

## `API Reference 📑` 

- **GET** `/api/products` returns all the products of the store

<hr>

- **GET** `/api/products/id` returns a specific products of the store. The id must always be a numeric value.

<hr>

- **POST** `/api/products` Adds a product to the store.

**JSON Body**
- `name` (**required**)
- `price` (**required**)
- `image_url` (optional)

<hr>

- **UPDATE** `/api/products/id` Edits a product from the store. If no parameters are provided, the API will return an error message and the product will not be edited.

**JSON Body**
- `name` (optional)
- `price` (optional)
- `image_url` (optional)

<hr>

- **DELETE** `/api/products/id` Deletes a product from the store.

PS: The project is not connected to a database, so when the server re-starts all the data come back to the initial stage, which relies on the `resource/products.json`.