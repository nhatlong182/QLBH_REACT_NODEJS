import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        categoryId: { type: Number, required: true, unique: true },
        categoryName: { type: String, required: true, unique: true },
        active: { type: Boolean, default: true }
    }
);

const Category = mongoose.model('category', categorySchema);
export default Category;