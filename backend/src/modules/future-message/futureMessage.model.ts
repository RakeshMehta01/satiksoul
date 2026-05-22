import mongoose, { Schema, Document } from 'mongoose';

export type EmotionalTag = 'Love' | 'Anniversary' | 'Missing You' | 'Apology' | 'Motivation' | 'Wedding' | 'Long Distance' | 'Comfort' | 'Future Dreams';

export interface IAttachment { url: string; type: 'image' | 'audio'; name: string; }

export interface IFutureMessage extends Document {
  relationshipId: mongoose.Types.ObjectId;
  userId: string; // sender
  recipientId?: string; // partner recipient
  title: string;
  content: string;
  unlockDate: Date;
  emotionalTag: EmotionalTag;
  attachments: IAttachment[];
  recipientNote?: string;
  musicUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FutureMessageSchema = new Schema<IFutureMessage>({
  relationshipId: { type: Schema.Types.ObjectId, ref: 'Relationship', required: true, index: true },
  userId: { type: String, required: true, index: true },
  recipientId: { type: String },
  title: { type: String, required: true, maxlength: 120 },
  content: { type: String, required: true, maxlength: 5000 },
  unlockDate: { type: Date, required: true },
  emotionalTag: {
    type: String,
    enum: ['Love','Anniversary','Missing You','Apology','Motivation','Wedding','Long Distance','Comfort','Future Dreams'],
    default: 'Love',
  },
  attachments: [{ url: String, type: { type: String, enum: ['image','audio'] }, name: String, _id: false }],
  recipientNote: { type: String, maxlength: 200 },
  musicUrl: String,
}, { timestamps: true });

export default mongoose.model<IFutureMessage>('FutureMessage', FutureMessageSchema);
