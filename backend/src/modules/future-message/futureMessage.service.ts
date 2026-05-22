import FutureMessage, { IFutureMessage } from './futureMessage.model';
import { getRelationshipForUser, createRelationship, logActivity } from '../relationship/relationship.service';

const unlocked = (d: Date) => new Date() >= new Date(d);

const sanitize = (m: IFutureMessage, currentUserId: string) => {
  const open = unlocked(m.unlockDate);
  const isSender = m.userId === currentUserId;

  if (!open && !isSender) {
    // Teaser view for partner (the recipient)
    return {
      _id: m._id,
      userId: m.userId, // sender ID
      unlockDate: m.unlockDate,
      emotionalTag: m.emotionalTag,
      isUnlocked: false,
      isSender: false,
      teaser: true,
      title: "A message is waiting for you 💌",
      recipientNote: m.recipientNote || "A private love capsule is waiting to be opened...",
      attachmentCount: m.attachments.length,
      content: null,
      attachments: [],
    };
  }

  // Full view for sender or when unlocked for both partners
  return {
    _id: m._id,
    userId: m.userId,
    recipientId: m.recipientId,
    title: m.title,
    unlockDate: m.unlockDate,
    emotionalTag: m.emotionalTag,
    recipientNote: m.recipientNote,
    attachmentCount: m.attachments.length,
    attachments: (open || isSender) ? m.attachments : [],
    isUnlocked: open,
    isSender,
    content: (open || isSender) ? m.content : null,
    musicUrl: (open || isSender) ? m.musicUrl : null,
    createdAt: m.createdAt,
    updatedAt: m.updatedAt,
  };
};

export const createMessage = async (userId: string, data: Partial<IFutureMessage>, files: Express.Multer.File[]) => {
  let rel = await getRelationshipForUser(userId);
  if (!rel) {
    // Fallback: Create a default workspace if they write a letter first
    rel = await createRelationship(userId, "Our Little World");
  }

  const recipientId = rel.partnerIds.find(id => id !== userId);
  const attachments = files.map(f => ({
    url: `/uploads/future-messages/${f.filename}`,
    type: f.mimetype.startsWith('image') ? 'image' : 'audio' as 'image' | 'audio',
    name: f.originalname,
  }));

  const msg = await FutureMessage.create({
    ...data,
    relationshipId: rel._id,
    userId,
    recipientId,
    attachments,
  });

  // Log activity in the shared timeline
  await logActivity(
    rel._id as any,
    userId,
    'letter_sealed',
    `Sealed a future letter: "${msg.title}" set to unlock on ${new Date(msg.unlockDate).toLocaleDateString()}`
  );

  return sanitize(msg, userId);
};

export const getAllMessages = async (userId: string) => {
  const rel = await getRelationshipForUser(userId);
  if (!rel) return [];

  const msgs = await FutureMessage.find({ relationshipId: rel._id }).sort({ unlockDate: 1 });
  return msgs.map(m => sanitize(m, userId));
};

export const getMessage = async (userId: string, id: string) => {
  const rel = await getRelationshipForUser(userId);
  if (!rel) throw { status: 404, message: 'Relationship space not found' };

  const msg = await FutureMessage.findOne({ _id: id, relationshipId: rel._id });
  if (!msg) throw { status: 404, message: 'Message not found' };

  return sanitize(msg, userId);
};

export const updateMessage = async (userId: string, id: string, data: Partial<IFutureMessage>) => {
  const rel = await getRelationshipForUser(userId);
  if (!rel) throw { status: 404, message: 'Relationship space not found' };

  const msg = await FutureMessage.findOne({ _id: id, relationshipId: rel._id, userId });
  if (!msg) throw { status: 404, message: 'Message not found or edit unauthorized' };

  if (unlocked(msg.unlockDate)) throw { status: 403, message: 'Cannot edit an unlocked message' };
  Object.assign(msg, data);
  await msg.save();
  return sanitize(msg, userId);
};

export const deleteMessage = async (userId: string, id: string) => {
  const rel = await getRelationshipForUser(userId);
  if (!rel) throw { status: 404, message: 'Relationship space not found' };

  const msg = await FutureMessage.findOneAndDelete({ _id: id, relationshipId: rel._id, userId });
  if (!msg) throw { status: 404, message: 'Message not found or delete unauthorized' };

  return { deleted: true };
};
