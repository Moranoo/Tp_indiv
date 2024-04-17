import { Router,Request,Response } from "express";
import Seance from "../models/Seance";
import Film from "../models/Film";


const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const seances = await Seance.find();
    res.status(200).json(seances)
})

router.post('/', async (req: Request, res: Response) => {
    const { date, heure, film } = req.body;
    const seance = new Seance({ date, heure, film });
    await seance.save();
    res.status(201).json(seance)
})

router.get('/:id', async (req: Request, res: Response) => {
    const seance = await Seance.findById(req.params.id);
    res.status(200).json(seance)
})

router.put('/:id', async (req: Request, res: Response) => {
    const { date, heure, film } = req.body;
    const seance = await Seance.findByIdAndUpdate(req.params.id, { date, heure, film });
    res.status(200).json(seance)
})

router.delete('/:id', async (req: Request, res: Response) => {
    await Seance.findByIdAndDelete(req.params.id);
    res.status(204).json()
})

router.get('/:id/films', async (req: Request, res: Response) => {
    const films = await Film.find({ seances: req.params.id });
    res.status(200).json(films)
})

export default router;