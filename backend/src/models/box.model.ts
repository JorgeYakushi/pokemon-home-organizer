import { model, Schema } from "mongoose";
import { IBox, IBoxItem } from "@/types/box.interface";

const boxSchema: Schema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IBox>("Box", boxSchema);
