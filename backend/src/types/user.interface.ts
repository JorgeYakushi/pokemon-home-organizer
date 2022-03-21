import { Document } from "mongoose";

export interface IUser extends Document {
  displayName: String;
  googleId: String;
}
