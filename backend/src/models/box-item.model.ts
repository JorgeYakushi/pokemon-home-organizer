import { model, Schema } from "mongoose";
import { IBoxItems } from "@/types/box-items.interface";

const boxItemSubSchema: Schema = new Schema({
  pokemonGuid: { type: String, required: false },
  box_id: { type: Number, required: false },
  spriteUrl: { type: String, required: false },
  boxPosition: { type: Number, required: false },
  isCaught: { type: Boolean, required: false },
});

const boxItemsSchema: Schema = new Schema(
  {
    userGuid: {
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

export default model<IBoxItems>("BoxItems", boxItemsSchema);
