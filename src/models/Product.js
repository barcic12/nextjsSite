import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    file_name: { type: String, required: true },
    image_path: { type: String, required: true },
    quantity_in_stock: { type: Number, required: true, min: 1 },
  },
  { collection: "products" }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
