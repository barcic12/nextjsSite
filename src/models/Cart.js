import mongoose from "mongoose";
const CartSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User schema
    required: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product", // Assuming you have a Product schema
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;
