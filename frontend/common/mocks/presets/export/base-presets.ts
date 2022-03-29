import { IPreset } from "@/interfaces/presets.interface";
import nationalDex from "../normaldex.json";
import gender from "../gender.json";
import pikachu from "../pikachu.json";
import unown from "../unown.json";
import vivillon from "../vivillon.json";
import alcremie from "../alcremie.json";
import regional from "../regional.json";
import variants from "../variant.json";

export const basePresets: IPreset[] = [
  { name: "national dex", data: nationalDex },
  { name: "gender differences", data: gender },
  { name: "pikachu forms", data: pikachu },
  { name: "unowns", data: unown },
  { name: "vivillon forms", data: vivillon },
  { name: "alcremie forms", data: alcremie },
  { name: "regional forms", data: regional },
  { name: "other variants", data: variants },
];
