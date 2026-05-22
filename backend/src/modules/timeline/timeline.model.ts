import mongoose, { Schema, Document } from 'mongoose';

export interface ITimelineReaction {
  userId: string;
  userName: string;
  emoji: string;
}

export interface ITimelineItem extends Document {
  relationshipId: mongoose.Types.ObjectId;
  createdBy: string;
  title: string;
  caption: string;
  images: string[];
  emotionalTag: 'Happy' | 'Romantic' | 'Missing You' | 'Milestone' | 'Adventure' | 'Anniversary';
  memoryDate: Date;
  reactions: ITimelineReaction[];
  createdAt: Date;
  updatedAt: Date;
}

const TimelineReactionSchema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  emoji: { type: String, required: true },
}, { _id: false });

const TimelineSchema = new Schema(
  {
    relationshipId: { type: Schema.Types.ObjectId, ref: 'Relationship', required: true, index: true },
    createdBy: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    caption: { type: String, required: true, trim: true },
    images: [{ type: String, required: true }],
    emotionalTag: {
      type: String,
      enum: ['Happy', 'Romantic', 'Missing You', 'Milestone', 'Adventure', 'Anniversary'],
      required: true,
    },
    memoryDate: { type: Date, required: true },
    reactions: [TimelineReactionSchema],
  },
  {
    timestamps: true,
  }
);

export const TimelineItem = mongoose.model<ITimelineItem>('TimelineItem', TimelineSchema);
