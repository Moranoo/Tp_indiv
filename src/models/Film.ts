import mongoose, { Schema, Document } from "mongoose";
import { IRealisateur } from "./Realisateur";

export interface IFilm extends Document {
    title: string; 
    releaseYear: number; 
    genre: string; 
    directors: IRealisateur[];
}

const FilmSchema = new Schema({
    title: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    genre: { type: String, required: true },
    directors: [{ type: Schema.Types.ObjectId, ref: "Realisateur" }],
});

const Film = mongoose.model<IFilm>("Film", FilmSchema, "films");

export default Film;