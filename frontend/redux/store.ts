import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import pokemonDataReducer from "@/redux/features/pokemonData/pokemonDataSlice";
import currentPokemonReducer from "@/redux/features/currentPokemon/currentPokemonSlice";
export const store = configureStore({
  reducer: {
    pokemonData: pokemonDataReducer,
    currentPokemon: currentPokemonReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
