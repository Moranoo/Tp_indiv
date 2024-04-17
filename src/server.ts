import express, {Express} from 'express';

import filmRoutes from './routes/filmRoutes';
import realisateurRoutes from './routes/realisateurRoutes';
const app: Express = express();// initialisation de l'application express
const PORT: number = 3001;

app.use(express.json())
app.use('/api/films', filmRoutes)
app.use('/api/realisateurs', realisateurRoutes)


app.listen(PORT, () => {
  console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});

import mongoose from "mongoose";
const uri = "mongodb+srv://Morano:tYIxN4VVHBlzYfoO@clustercours.1gaktwp.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCours";


async function run() {
try {
  // connexion à la base de données MongoDB
  await mongoose.connect(uri);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Ping réussi ! Connexion établie avec la base de données MongoDB.");
} catch (e) {
  console.error(e);
}
}
// la fonction run est appelée pour établir la connexion avec la base de données
run().catch(console.dir);
