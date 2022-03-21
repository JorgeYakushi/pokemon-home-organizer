import passportLocalMongoose from "passport-local-mongoose";
import { model, Model, Schema } from "mongoose";
import { IUser } from "@/types/user.interface";

const userSchema: Schema = new Schema({
  displayName: { type: String, required: true },
  googleId: { type: String, required: false },
});
userSchema.plugin(passportLocalMongoose);

export const User = model<IUser>("User", userSchema);
