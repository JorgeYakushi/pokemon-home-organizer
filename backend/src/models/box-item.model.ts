import { model, Schema } from "mongoose";
import { IUserBoxes } from "@/types/box-items.interface";

const boxItemSubSchema: Schema = new Schema({
  pokemonGuid: { type: String, required: false },
  boxPosition: { type: Number, required: false },
});

const boxSchema: Schema = new Schema(
  {
    boxName: {
      type: String,
      required: true,
    },
    boxItems: {
      type: [boxItemSubSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const userBoxesSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },

  boxes: {
    type: [boxSchema],
    required: true,
  },
});
export default model<IUserBoxes>("UserBoxes", userBoxesSchema);
