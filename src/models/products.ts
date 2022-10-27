import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({ 
    name: { 
        type: String,
        required: [true, 'The product must have a name'],
        maxLength: [20, 'The product name can not have more than 20 characters'],
        trim: true,
    },
    image_url: { 
        type: String,
        required: false
    },
    price: { 
        type: Number,
        required: [true, 'The product needs to have a price'],
        trim: true,
        min: [0.01, 'The product needs to have a price']
    },
    sku: {
        type: String,
        required: [true, 'The product needs to have a SKU.'],
        trim: true,
        maxLength: [5, `Product sku must have 5 characters`],
        minLength: [5, 'Product sku must have 5 characters']
    }
});

const ProductModel = mongoose.model('Product', productsSchema);

export default ProductModel