import { Response, Request } from "express";
import { IBox } from "@/types/box.interface";
import Box from "@/models/box.model";

const getBoxes = async (req: Request, res: Response): Promise<void> => {
  try {
    const boxes: IBox[] = await Box.find();
    res.status(200).json({ boxes });
  } catch (error) {
    throw error;
  }
};

const addBox = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IBox, "name" | "number">;
    const box: IBox = new Box({
      name: body.name,
      number: body.number,
    });
    const newBox: IBox = await box.save();
    const allBoxes: IBox[] = await Box.find();

    res
      .status(201)
      .json({ message: "Box added", box: newBox, boxes: allBoxes });
  } catch (error) {
    throw error;
  }
};
export { getBoxes, addBox };
