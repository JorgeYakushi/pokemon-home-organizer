import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IPokemonDetail,
  IPokemonData,
} from "@/interfaces/pokemon-detail.interface";
import type { RootState } from "@/redux/store";
interface IPokemonDataState {
  value: { [key: string]: IPokemonDetail };
}

const initialState: IPokemonDataState = {
  value: {},
};
interface IUpdatePokemonData {
  key: string;
  value: IPokemonDetail;
}
export const pokemonDataSlice = createSlice({
  name: "pokemonData",
  initialState,
  reducers: {
    updateMapItem: (state, action: PayloadAction<IUpdatePokemonData>) => {
      state.value[action.payload.key] = action.payload.value;
    },
    loadMap: (state, action: PayloadAction<IPokemonData[]>) => {
      let data = action.payload;
      let obj: { [key: string]: IPokemonDetail } = {};
      data.map((item) => {
        obj[item.pokemonGuid] = item.pokemonDetail;
      });
      state.value = obj;
    },
  },
});
export const { updateMapItem, loadMap } = pokemonDataSlice.actions;
export const selectPokemonData = (state: RootState) => state.pokemonData.value;
export default pokemonDataSlice.reducer;
