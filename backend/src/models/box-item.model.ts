import { model, Schema } from "mongoose";
import { IBoxItem } from "@/types/box.interface";

const boxItemSchema: Schema = new Schema(
  {
    boxNumber: {
      type: Number,
      required: true,
    },
    boxLocation: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IBoxItem>("BoxItem", boxItemSchema);
