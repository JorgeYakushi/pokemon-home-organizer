import { Response, Request } from "express";
import { IUserBoxes, IBox, IBoxItem } from "@/types/box-items.interface";
import { IPokemonData } from "@/types/pokemon.interface";
import UserBoxes from "@/models/box-item.model";
import PokemonData from "@/models/pokemon.model";
import { v1 as uuidv1 } from "uuid";

const getBoxData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query;
    const boxData: IUserBoxes | null = await UserBoxes.findOne(userId);
    const pokemonData: IPokemonData[] = await PokemonData.find(userId);
    res.status(200).json({ ...userId, boxData, pokemonData });
  } catch (error) {
    throw error;
  }
};
const createBoxes = async (userId: string): Promise<void> => {
  try {
    let boxes: IBox[] = [];
    for (let i = 0; i < 200; i++) {
      let boxName: string = `Box ${i + 1}`;
      let boxItems: IBoxItem[] = [];
      for (let j = 0; j < 30; j++) {
        let boxItem: IBoxItem = {
          pokemonGuid: uuidv1(),
          boxPosition: j + 1,
        };
        boxItems.push(boxItem);
      }
      let box: IBox = {
        boxName,
        boxItems,
      };
      boxes.push(box);
    }

    const body = {
      userId,
      boxes,
    };

    await UserBoxes.create(body);
  } catch (error) {
    throw error;
  }
};

const upsertPokemon = async (req: Request, res: Response): Promise<void> => {
  try {
    let pokemonData: IPokemonData[] = req.body.pokemonData;

    let bulkData = pokemonData.map(function (data) {
      return {
        updateOne: {
          filter: { pokemonGuid: data.pokemonGuid },
          update: { $set: data },
          upsert: true,
        },
      };
    });

    await PokemonData.bulkWrite(bulkData);
    res.status(200).json({
      message: "updated boxes",
    });
  } catch (error) {
    throw error;
  }
};

export { getBoxData, createBoxes, upsertPokemon };
