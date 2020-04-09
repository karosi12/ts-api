import * as Mongoose from 'mongoose';
import { Document, Model, model, Schema } from 'mongoose';
import { IUsers } from './user.interface';

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
      required: true
    },
    image: {
      type: String
    },
    state: {
      type: String
    },
    active: {
      type: Boolean,
      default: true
    },
    city: {
      type: String
    },
    role: {
      type: String
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
export const Users: Model<IUsermodel> = model<IUsermodel>('Users', userSchema);
