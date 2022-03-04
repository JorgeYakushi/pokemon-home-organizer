export interface IPokemon {
  id: number;
  natDexNumber: number;
  name: number;
  captureRate: number;
  genderRate: number;
  hasGenderDifferences: boolean;
  types: Types;
  sprites: Sprites;
  debutGenId: number;
  forms: Form[];
}

interface Types {
  slot: number;
  typeId: number;
}

interface Form {
  isDefault: boolean;
  typeId: number;
  name: string;
  id: number;
  sprites: Sprites;
}

interface Sprites {
  backDefault: string;
  backDefaultFemale: string;
  backShiny: string;
  backShinyFemale: string;
  frontDefault: string;
  frontDefaultFemale: string;
  frontShiny: string;
  frontShinyFemale: string;
}
