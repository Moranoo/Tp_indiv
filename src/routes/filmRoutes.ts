import { Router,Request,Response } from "express";
import Film from "../models/Film";
import Realisateur from "../models/Realisateur";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const realisateurs = await Realisateur.find();
    res.status(200).json(realisateurs)
})

router.post('/', async (req: Request, res: Response) => {
    const { nom, prenom, dateNaissance } = req.body;
    const realisateur = new Realisateur({ nom, prenom, dateNaissance });
    await realisateur.save();
    res.status(201).json(realisateur)
})

router.get('/:id', async (req: Request, res: Response) => {
    const realisateur = await Realisateur.findById(req.params.id);
    res.status(200).json(realisateur)
})

router.put('/:id', async (req: Request, res: Response) => {
    const { nom, prenom, dateNaissance } = req.body;
    const realisateur = await Realisateur.findByIdAndUpdate(req.params.id, { nom, prenom, dateNaissance });
    res.status(200).json(realisateur)
})

router.delete('/:id', async (req: Request, res: Response) => {
    await Realisateur.findByIdAndDelete(req.params.id);
    res.status(204).json()
})

router.get('/:id/films', async (req: Request, res: Response) => {
    const films = await Film.find({ directors: req.params.id });
    res.status(200).json(films)
})

export default router;