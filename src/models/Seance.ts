import mongoose, { Schema, Document } from "mongoose";
import { IFilm } from "./Film";


export interface ISeance extends Document {
    film: IFilm; 
    date: Date; 
    time: string; 
    availableSeats: number;
}

const SeanceSchema = new Schema({
    film: { type: Schema.Types.ObjectId, ref: "Film", required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    availableSeats: { type: Number, required: true },
});

export default mongoose.model<ISeance>("Seance", SeanceSchema);