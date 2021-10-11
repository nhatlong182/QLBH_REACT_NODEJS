import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        isSale: { type: Boolean, default: false },
        saleOff: { type: Number, default: 0 }
    }
);
productSchema.index({ name: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;