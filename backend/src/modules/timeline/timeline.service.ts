import { TimelineItem, ITimelineItem } from './timeline.model';
import { getRelationshipForUser, logActivity } from '../relationship/relationship.service';

export const createTimelineItem = async (
  userId: string,
  data: { title: string; caption: string; emotionalTag: string; memoryDate: string },
  files: Express.Multer.File[]
) => {
  const rel = await getRelationshipForUser(userId);
  if (!rel) {
    throw { status: 403, message: 'You must belong to an active relationship space to post memories.' };
  }

  if (!files || files.length === 0) {
    throw { status: 400, message: 'At least one photo is required to seal a memory.' };
  }

  const images = files.map(file => `/uploads/timeline/${file.filename}`);

  const item = await TimelineItem.create({
    relationshipId: rel._id,
    createdBy: userId,
    title: data.title,
    caption: data.caption,
    images,
    emotionalTag: data.emotionalTag,
    memoryDate: new Date(data.memoryDate),
    reactions: [],
  });

  // Log activity in the shared feed
  await logActivity(
    rel._id as any,
    userId,
    'timeline_item_created',
    `Added a new memory: "${data.title}" 📸`
  );

  return item;
};

export const getTimeline = async (userId: string) => {
  const rel = await getRelationshipForUser(userId);
  if (!rel) {
    throw { status: 403, message: 'You must belong to an active relationship space to view the timeline.' };
  }

  return TimelineItem.find({ relationshipId: rel._id }).sort({ memoryDate: -1 });
};

export const toggleReaction = async (
  userId: string,
  userName: string,
  itemId: string,
  emoji: string
) => {
  const item = await TimelineItem.findById(itemId);
  if (!item) {
    throw { status: 404, message: 'Memory not found.' };
  }

  const rel = await getRelationshipForUser(userId);
  if (!rel || rel._id.toString() !== item.relationshipId.toString()) {
    throw { status: 403, message: 'Permission denied.' };
  }

  // Check if this user has already reacted with this specific emoji
  const existingIdx = item.reactions.findIndex(
    r => r.userId === userId && r.emoji === emoji
  );

  if (existingIdx > -1) {
    // Toggle off: remove reaction
    item.reactions.splice(existingIdx, 1);
  } else {
    // Toggle on: add reaction
    item.reactions.push({ userId, userName, emoji });
  }

  await item.save();
  return item;
};
