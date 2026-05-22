import mongoose, { Schema, Document } from 'mongoose';

export interface IRelationshipInvite extends Document {
  relationshipId: mongoose.Types.ObjectId;
  inviterId: string;
  inviteeEmail?: string;
  inviteCode: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: Date;
  updatedAt: Date;
}

const RelationshipInviteSchema = new Schema<IRelationshipInvite>({
  relationshipId: { type: Schema.Types.ObjectId, ref: 'Relationship', required: true, index: true },
  inviterId: { type: String, required: true },
  inviteeEmail: { type: String },
  inviteCode: { type: String, required: true, unique: true, index: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined', 'expired'], default: 'pending' },
}, { timestamps: true });

export const RelationshipInvite = mongoose.model<IRelationshipInvite>('RelationshipInvite', RelationshipInviteSchema);
