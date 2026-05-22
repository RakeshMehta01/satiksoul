import { Relationship, CouplePresence, SharedActivity } from './relationship.model';
import { RelationshipInvite } from './invite.model';

// Fetch the active or pending relationship space that a user belongs to
export const getRelationshipForUser = async (userId: string) => {
  return Relationship.findOne({ partnerIds: userId });
};

// Create a new relationship space and generate a unique invite pairing code
export const createRelationship = async (userId: string, name: string, anniversaryDate?: Date) => {
  const existing = await getRelationshipForUser(userId);
  if (existing) {
    return existing; // Return existing relationship if already paired
  }

  // Generate an alpha-numeric unique pairing code, e.g. LOVE-8C9B
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const code = `LOVE-${randomSuffix}`;

  const rel = await Relationship.create({
    relationshipName: name || "Our Little World",
    relationshipCode: code,
    anniversaryDate,
    createdBy: userId,
    partnerIds: [userId],
    relationshipStatus: 'pending',
  });

  // Log activity
  await logActivity(rel._id as any, userId, 'space_created', `${userId} created their private relationship world`);

  return rel;
};

// Update relationship details (such as theme or anniversary date)
export const updateRelationship = async (userId: string, id: string, data: { relationshipName?: string; anniversaryDate?: Date; relationshipTheme?: string }) => {
  const rel = await Relationship.findOne({ _id: id, partnerIds: userId });
  if (!rel) {
    throw { status: 404, message: 'Relationship space not found or permission denied' };
  }

  if (data.relationshipName) rel.relationshipName = data.relationshipName;
  if (data.anniversaryDate) rel.anniversaryDate = data.anniversaryDate;
  if (data.relationshipTheme) rel.relationshipTheme = data.relationshipTheme;

  await rel.save();
  return rel;
};

// Update a user's real-time custom status or presence markers
export const updatePresence = async (relationshipId: string, userId: string, status: 'online' | 'offline', customStatus?: string) => {
  const presence = await CouplePresence.findOneAndUpdate(
    { relationshipId, userId },
    { status, customStatus, lastActive: new Date() },
    { new: true, upsert: true }
  );
  return presence;
};

// Fetch the presence details of the couple
export const getPresence = async (relationshipId: string) => {
  return CouplePresence.find({ relationshipId });
};

// Log a shared memory or letter action into the activity stream
export const logActivity = async (relationshipId: string, userId: string, activityType: string, description: string) => {
  return SharedActivity.create({
    relationshipId,
    userId,
    activityType,
    description,
  });
};

// Fetch recent activity streams
export const getSharedActivities = async (relationshipId: string) => {
  return SharedActivity.find({ relationshipId }).sort({ createdAt: -1 }).limit(10);
};
