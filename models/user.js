import { Schema, model } from "mongoose";
import * as Joi from "joi";

const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: [true, "Name is required"],
    },
    nickname: {
      type: String,
      // required: [true, "Nickname is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

export default model("user", userSchema);
