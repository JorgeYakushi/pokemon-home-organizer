export interface IBoxItem {
  pokemonGuid: string;
  boxPosition: number;
}
export interface IBox {
  boxName: string;
  boxItems: IBoxItem[];
}
interface IBoxData {
  boxes: IBox[];
}
export interface IUserBoxes {
  pokemonData: string;
  boxData: IBoxData;
}
