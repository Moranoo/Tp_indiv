import { Router, Request, Response } from "express";
import Seance from "../models/Seance";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const seances = await Seance.find().populate('film');
    if (!seances.length) {
        return res.status(404).json({ message: 'No seances found' });
    }
    res.status(200).json(seances);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { film, date, time, availableSeats } = req.body;
        const seance = new Seance({ film, date, time, availableSeats });
        await seance.save();
        res.status(201).json(seance);
    } catch (error) {
        res.status(400).json({ message: 'Error creating seance', error:( error as Error).message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const seance = await Seance.findById(req.params.id).populate('film');
    if (!seance) {
        return res.status(404).json({ message: 'Seance not found' });
    }
    res.status(200).json(seance);
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { film, date, time, availableSeats } = req.body;
        const seance = await Seance.findByIdAndUpdate(req.params.id, { film, date, time, availableSeats }, { new: true }).populate('film');
        if (!seance) {
            return res.status(404).json({ message: 'Seance not found' });
        }
        res.status(200).json(seance);
    } catch (error) {
        res.status(400).json({ message: 'Error updating seance', error:( error as Error).message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const deleted = await Seance.findByIdAndDelete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'Seance not found' });
    }
    res.status(204).send();
});

export default router;