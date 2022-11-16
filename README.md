# `MongoDB & Express Products API`

This project is like the project of my repository `express-server-products-api-crud-operations`, but it adds more complexity by inserting a `MongoDB database` and other `middlewares`.

This application was made using `Express` for the backend, `React` for the frontend and `MongoDB` for the database, which runs on `MongoDB Atlas` 🗺️.

## Demonstration 📺

https://user-images.githubusercontent.com/90068133/202281430-8136ee30-2526-4e70-88b8-0941987105f5.mp4

In order to run it locally, you will first need to create a database on MongoDB Atlas and insert your connection string to the `.env` file.

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
- `sku`: **required**: must have 5 numeric characters
- `name`: **required**: maximum length is 30 characters
- `price`: **required**
- `image_url` (optional)

<hr>

- **UPDATE** `/api/products/sku` Edits a product from the store. If no parameters are provided, the API will return an error message and the product will not be edited.

**JSON Body**
- `name` (optional)
- `price` (optional)
- `image_url` (optional)

<hr>

- **DELETE** `/api/products/sku` Deletes a product from the store.