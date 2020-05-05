import { Document, Model, model, Schema } from "mongoose";
import { IUsers } from "./user.interface";

export interface IUsermodel extends IUsers, Document {}

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    mobile: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    active: {
      type: Boolean,
      default: true
    },
    city: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      trim: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export const Users: Model<IUsermodel> = model<IUsermodel>("Users", userSchema);
