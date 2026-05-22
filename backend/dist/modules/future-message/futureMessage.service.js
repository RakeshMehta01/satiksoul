"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.updateMessage = exports.getMessage = exports.getAllMessages = exports.createMessage = void 0;
const futureMessage_model_1 = __importDefault(require("./futureMessage.model"));
const relationship_service_1 = require("../relationship/relationship.service");
const unlocked = (d) => new Date() >= new Date(d);
const sanitize = (m, currentUserId) => {
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
const createMessage = async (userId, data, files) => {
    let rel = await (0, relationship_service_1.getRelationshipForUser)(userId);
    if (!rel) {
        // Fallback: Create a default workspace if they write a letter first
        rel = await (0, relationship_service_1.createRelationship)(userId, "Our Little World");
    }
    const recipientId = rel.partnerIds.find(id => id !== userId);
    const attachments = files.map(f => ({
        url: `/uploads/future-messages/${f.filename}`,
        type: f.mimetype.startsWith('image') ? 'image' : 'audio',
        name: f.originalname,
    }));
    const msg = await futureMessage_model_1.default.create({
        ...data,
        relationshipId: rel._id,
        userId,
        recipientId,
        attachments,
    });
    // Log activity in the shared timeline
    await (0, relationship_service_1.logActivity)(rel._id, userId, 'letter_sealed', `Sealed a future letter: "${msg.title}" set to unlock on ${new Date(msg.unlockDate).toLocaleDateString()}`);
    return sanitize(msg, userId);
};
exports.createMessage = createMessage;
const getAllMessages = async (userId) => {
    const rel = await (0, relationship_service_1.getRelationshipForUser)(userId);
    if (!rel)
        return [];
    const msgs = await futureMessage_model_1.default.find({ relationshipId: rel._id }).sort({ unlockDate: 1 });
    return msgs.map(m => sanitize(m, userId));
};
exports.getAllMessages = getAllMessages;
const getMessage = async (userId, id) => {
    const rel = await (0, relationship_service_1.getRelationshipForUser)(userId);
    if (!rel)
        throw { status: 404, message: 'Relationship space not found' };
    const msg = await futureMessage_model_1.default.findOne({ _id: id, relationshipId: rel._id });
    if (!msg)
        throw { status: 404, message: 'Message not found' };
    return sanitize(msg, userId);
};
exports.getMessage = getMessage;
const updateMessage = async (userId, id, data) => {
    const rel = await (0, relationship_service_1.getRelationshipForUser)(userId);
    if (!rel)
        throw { status: 404, message: 'Relationship space not found' };
    const msg = await futureMessage_model_1.default.findOne({ _id: id, relationshipId: rel._id, userId });
    if (!msg)
        throw { status: 404, message: 'Message not found or edit unauthorized' };
    if (unlocked(msg.unlockDate))
        throw { status: 403, message: 'Cannot edit an unlocked message' };
    Object.assign(msg, data);
    await msg.save();
    return sanitize(msg, userId);
};
exports.updateMessage = updateMessage;
const deleteMessage = async (userId, id) => {
    const rel = await (0, relationship_service_1.getRelationshipForUser)(userId);
    if (!rel)
        throw { status: 404, message: 'Relationship space not found' };
    const msg = await futureMessage_model_1.default.findOneAndDelete({ _id: id, relationshipId: rel._id, userId });
    if (!msg)
        throw { status: 404, message: 'Message not found or delete unauthorized' };
    return { deleted: true };
};
exports.deleteMessage = deleteMessage;
