import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IPokemonDetail,
  IPokemonData,
  emptyPokemon,
} from "@/interfaces/pokemon-detail.interface";
import type { RootState } from "@/redux/store";

interface ICurrentPokemonState {
  value: IPokemonData;
}

const initialState: ICurrentPokemonState = {
  value: emptyPokemon,
};

export const currentPokemonSlice = createSlice({
  name: "currentPokemon",
  initialState,
  reducers: {
    setCurrentPokemon: (state, action: PayloadAction<IPokemonData>) => {
      state.value = action.payload;
    },
  },
});
export const { setCurrentPokemon } = currentPokemonSlice.actions;
export const selectCurrentPokemon = (state: RootState) =>
  state.currentPokemon.value;
export default currentPokemonSlice.reducer;
