import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  productId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  image_path: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
