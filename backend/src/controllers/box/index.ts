import { Response, Request } from "express";
import { IBoxItems } from "@/types/box-items.interface";
import { IPokemonData } from "@/types/pokemon.interface";
import BoxItems from "@/models/box-item.model";
import PokemonData from "@/models/pokemon.model";
const getBoxData = async (req: Request, res: Response): Promise<void> => {
  try {
    const boxes: IBoxItems | null = await BoxItems.findOne(req.query);
    const pokemonData: IPokemonData[] = await PokemonData.find();
    res.status(200).json({ boxes, pokemonData });
  } catch (error) {
    throw error;
  }
};

const upsertBoxes = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryBoxes = { userGuid: req.body.userGuid };
    const updateBoxes = {
      $set: { boxItems: req.body.boxItems, userGuid: req.body.userGuid },
    };
    const options = { upsert: true };
    await BoxItems.updateOne(queryBoxes, updateBoxes, options);

    let bulkData = req.body.pokemonData.map(function (pokemon) {
      return {
        updateOne: {
          filter: { pokemonGuid: pokemon.pokemonGuid },
          update: { $set: pokemon },
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

export { getBoxData, upsertBoxes };
