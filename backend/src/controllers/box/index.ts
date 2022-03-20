import { Response, Request } from "express";
import { IBoxItems } from "@/types/box-items.interface";
import BoxItems from "@/models/box-item.model";

// const getBoxes = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const boxes: IBox[] = await Box.find();
//     res.status(200).json({ boxes });
//   } catch (error) {
//     throw error;
//   }
// };

// const addBox = async (req: Request, res: Response): Promise<void> => {
//   try {
//     console.log(req.body);
//     const body = req.body as Pick<IBox, "name" | "number">;
//     const box: IBox = new Box({
//       name: body.name,
//       number: body.number,
//     });
//     const newBox: IBox = await box.save();
//     const allBoxes: IBox[] = await Box.find();

//     res
//       .status(201)
//       .json({ message: "Box added", box: newBox, boxes: allBoxes });
//   } catch (error) {
//     throw error;
//   }
// };

const upsertBoxes = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = { userGuid: req.body.userGuid };
    const update = { $set: req.body };
    const options = { upsert: true };
    await BoxItems.updateOne(query, update, options);
    res.status(200).json({
      message: "updated boxes",
    });
  } catch (error) {
    throw error;
  }
};
export { upsertBoxes };
