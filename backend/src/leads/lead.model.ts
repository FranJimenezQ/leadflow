import mongoose, {Schema, Document} from "mongoose";

export interface ILead extends Document {
    name: string;
    email: string;
    company: string;
    status: 'new' | 'contacted' | 'proposal' | 'closet' | 'lost';
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}

export const LeadSchema = new Schema<ILead>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    status: { type: String, enum: ['new', 'contacted', 'proposal', 'closet', 'lost'], default: 'new' },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Lead = mongoose.model<ILead>('Lead', LeadSchema)