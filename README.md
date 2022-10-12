# `Express Server Products Operations`

This project features a server made using Express and a User Interface made using React.

The server works as an API that allows the user to view, add, edit and delete products in a fake store admin pannel.

PS: The project is not connected to a database, so when the server re-starts all the data come back to the initial stage, which relies on the `resource/products.json`.

## `API Reference` 

**GET** `/api/products` returns all the products of the store

<hr>

**GET** `/api/products/:id` returns a specific products of the store. The id must always be a numeric value.

<hr>

**POST** `/api/products` Adds a product to the store.

**JSON Body**
- `name` (**required**)
- `price` (**required**)
- `image_url` (optional)

<hr>

**UPDATE** `/api/products/:id` Edits a product from the store. If no parameters are provided, the API will return an error message and the product will not be edited.

**JSON Body**
- `name` (optional)
- `price` (optional)
- `image_url` (optional)

<hr>

**DELETE** `/api/products/:id` Deletes a product from the store.