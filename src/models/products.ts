import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({ 
    name: { 
        type: String,
        required: [true, 'you must provide a name'],
        trim: true,
        maxLenght: [30, 'product name can not have more than 30 characters']
    },
    image_url: { 
        type: String,
        required: false
    },
    price: { 
        type: Number,
        required: [true, 'The product needs to have a price'],
        trim: true
    },
    sku: { 
        type: Number,
        required: [true, 'you need to provide a SKU for the product. It needs to number and have only 5 characters'],
        trim: true,
        length: 5
    }
});

const ProductModel = mongoose.model('Product', productsSchema);

export default ProductModel