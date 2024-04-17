import { Router, Request, Response } from "express";
import Realisateur from "../models/Realisateur";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const realisateurs = await Realisateur.find();
    if (!realisateurs.length) {
        return res.status(404).json({ message: 'No realisateurs found' });
    }
    res.status(200).json(realisateurs);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nom, prenom, dateNaissance } = req.body;
        const realisateur = new Realisateur({ nom, prenom, dateNaissance });
        await realisateur.save();
        res.status(201).json(realisateur);
    } catch (error) {
        res.status(400).json({ message: 'Error creating realisateur', error:( error as Error).message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const realisateur = await Realisateur.findById(req.params.id);
    if (!realisateur) {
        return res.status(404).json({ message: 'Realisateur not found' });
    }
    res.status(200).json(realisateur);
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { nom, prenom, dateNaissance } = req.body;
        const realisateur = await Realisateur.findByIdAndUpdate(req.params.id, { nom, prenom, dateNaissance }, { new: true });
        if (!realisateur) {
            return res.status(404).json({ message: 'Realisateur not found' });
        }
        res.status(200).json(realisateur);
    } catch (error) {
        res.status(400).json({ message: 'Error updating realisateur', error:( error as Error).message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const deleted = await Realisateur.findByIdAndDelete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'Realisateur not found' });
    }
    res.status(204).send();
});

export default router;
