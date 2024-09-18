import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Set phone number for contact"],
    },
    dateOfBirth: {
      type: Date,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // ref: "User",
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("contact", contactSchema);
