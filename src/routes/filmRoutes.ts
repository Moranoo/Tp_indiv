import { Router, Request, Response } from "express";
import Film from "../models/Film";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const films = await Film.find().populate('directors');
    if (!films.length) {
        return res.status(404).json({ message: 'No films found' });
    }
    res.status(200).json(films);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, releaseYear, genre, directors } = req.body;
        const film = new Film({ title, releaseYear, genre, directors });
        await film.save();
        res.status(201).json(film);
    } catch (error) {
        res.status(400).json({ message: 'Error creating film', error:( error as Error).message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const film = await Film.findById(req.params.id).populate('directors');
    if (!film) {
        return res.status(404).json({ message: 'Film not found' });
    }
    res.status(200).json(film);
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { title, releaseYear, genre, directors } = req.body;
        const film = await Film.findByIdAndUpdate(req.params.id, { title, releaseYear, genre, directors }, { new: true }).populate('directors');
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json(film);
    } catch (error) {
        res.status(400).json({ message: 'Error updating film', error:( error as Error).message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const deleted = await Film.findByIdAndDelete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'Film not found' });
    }
    res.status(204).send();
});

export default router;
