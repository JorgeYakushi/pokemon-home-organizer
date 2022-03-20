import { Document } from "mongoose";

export interface IBoxItems extends Document {
  userGuid: string;
  boxItems: IBoxItem[];
}
interface IBoxItem extends Document {
  pokemonGuid: string;
  box_id: number;
  spriteUrl: string;
  boxPosition: number;
  isCaught: boolean;
}
