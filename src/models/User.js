import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    //email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //phone_number: { type: String, unique: true, sparse: true }, // Optional phone number
    //oauth_provider: { type: String, required: false }, // Required for OAuth users
    //oauth_id: { type: String, unique: true, sparse: true }, // Unique for OAuth users);
  },
  { collection: "users" }
);
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
