import mongoose, { Schema, Document } from "mongoose";

export interface IRealisateur extends Document {
    id: string;
    nom: string;
    prenom: string;
    dateNaissance: Date;
}


const RealisateurSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
});

export default mongoose.model<IRealisateur>("Realisateur", RealisateurSchema, "realisateurs");
