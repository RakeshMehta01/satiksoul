import mongoose, { Schema, Document } from 'mongoose';

export interface IMemory extends Document {
  userId: string;
  title: string;
  description: string;
  mood?: string;
  voiceTranscription?: string;
  mediaUrl?: string;
  qrCodeUrl?: string;
  sharedWith: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MemorySchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    mood: { type: String },
    voiceTranscription: { type: String },
    mediaUrl: { type: String },
    qrCodeUrl: { type: String },
    sharedWith: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMemory>('Memory', MemorySchema);
