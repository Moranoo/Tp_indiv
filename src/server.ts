import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import seanceRoutes from './routes/seanceRoutes';
import filmRoutes from './routes/filmRoutes';
import realisateurRoutes from './routes/realisateurRoutes';

const app: Express = express();
const PORT: number = 3001;
const MONGO_URI: string = 'mongodb+srv://Morano:tYIxN4VVHBlzYfoO@clustercours.1gaktwp.mongodb.net/?retryWrites=true&w=majority';

// Middleware de base pour le parsing JSON
app.use(express.json());

// Configuration des routes
app.use('/api/films', filmRoutes);
app.use('/api/realisateurs', realisateurRoutes);
app.use('/api/seances', seanceRoutes);

// Fonction pour connecter MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connexion à MongoDB réussie !");
    } catch (error) {
        console.error("Erreur de connexion à MongoDB:", error);
    }
}

// Connexion à MongoDB
connectDB();

// Middleware de gestion des erreurs
app.use((err: any, req: Request, res: Response, next: Function) => {
    console.error(err); // Log de l'erreur
    res.status(500).send({ message: "Une erreur interne est survenue" });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});
