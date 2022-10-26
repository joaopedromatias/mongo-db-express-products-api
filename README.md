# `MongoDB & Express Products API`

This project is like the project of my repository `express-server-products-api-crud-operations`, but it adds more complexity by inserting a `MongoDB database` and other `middlewares`.

This application is made using `Express` for the server, a user interface made using `React` and a database running on `MongoDB Atlas` 🗺️.

In order to run it locally, you will first need to create a database on MongoDB Atlas and insert your connection string on the `.env` file

```
npm install 💻
```

```
npm start ✨
```

## `API Reference 📑` 

- **GET** `/api/products` returns all the products of the store

<hr>

- **GET** `/api/products/sku` returns a specific products of the store. The sku must always be a numeric value with 5 characters.

<hr>

- **POST** `/api/products` Adds a product to the store.

**JSON Body**
- `sku` (**required**)
- `name` (**required**)
- `price` (**required**)
- `image_url` (optional)

<hr>

- **UPDATE** `/api/products/sku` Edits a product from the store. If no parameters are provided, the API will return an error message and the product will not be edited.

**JSON Body**
- `name` (optional)
- `price` (optional)
- `image_url` (optional)

<hr>

- **DELETE** `/api/products/sku` Deletes a product from the store.