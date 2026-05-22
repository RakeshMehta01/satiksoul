import mongoose, { Schema, Document } from 'mongoose';

export interface IRelationship extends Document {
  relationshipName: string;
  relationshipCode: string;
  anniversaryDate?: Date;
  createdBy: string;
  partnerIds: string[]; // Clerk User IDs of the couple
  relationshipTheme: string;
  relationshipStatus: 'pending' | 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const RelationshipSchema = new Schema<IRelationship>({
  relationshipName: { type: String, required: true, default: "Our Little World" },
  relationshipCode: { type: String, required: true, unique: true, index: true },
  anniversaryDate: { type: Date },
  createdBy: { type: String, required: true },
  partnerIds: [{ type: String, index: true }], // Clerk User IDs of both partners
  relationshipTheme: { type: String, default: 'classic-blush' },
  relationshipStatus: { type: String, enum: ['pending', 'active', 'archived'], default: 'pending' },
}, { timestamps: true });

// Presence Model Schema
export interface ICouplePresence extends Document {
  relationshipId: mongoose.Types.ObjectId;
  userId: string;
  lastActive: Date;
  status: 'online' | 'offline';
  customStatus?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CouplePresenceSchema = new Schema<ICouplePresence>({
  relationshipId: { type: Schema.Types.ObjectId, ref: 'Relationship', required: true, index: true },
  userId: { type: String, required: true, index: true },
  lastActive: { type: Date, default: Date.now },
  status: { type: String, enum: ['online', 'offline'], default: 'offline' },
  customStatus: { type: String },
}, { timestamps: true });

// Shared Activity Model Schema
export interface ISharedActivity extends Document {
  relationshipId: mongoose.Types.ObjectId;
  userId: string;
  activityType: string;
  description: string;
  createdAt: Date;
}

const SharedActivitySchema = new Schema<ISharedActivity>({
  relationshipId: { type: Schema.Types.ObjectId, ref: 'Relationship', required: true, index: true },
  userId: { type: String, required: true },
  activityType: { type: String, required: true }, // e.g. 'memory_created', 'letter_sealed', 'presence_check'
  description: { type: String, required: true },
}, { timestamps: true });

export const Relationship = mongoose.model<IRelationship>('Relationship', RelationshipSchema);
export const CouplePresence = mongoose.model<ICouplePresence>('CouplePresence', CouplePresenceSchema);
export const SharedActivity = mongoose.model<ISharedActivity>('SharedActivity', SharedActivitySchema);
