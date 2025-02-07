import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  role: { type: String, default: "user" },
  phone: { type: String, required: true },
  money: { type: Number, default: 0 },
});

export default mongoose.model("User", UserSchema);
