"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleReaction = exports.getTimeline = exports.createTimelineItem = void 0;
const timeline_model_1 = require("./timeline.model");
const relationship_service_1 = require("../relationship/relationship.service");
const createTimelineItem = async (userId, data, files) => {
    const rel = await (0, relationship_service_1.getRelationshipForUser)(userId);
    if (!rel) {
        throw { status: 403, message: 'You must belong to an active relationship space to post memories.' };
    }
    if (!files || files.length === 0) {
        throw { status: 400, message: 'At least one photo is required to seal a memory.' };
    }
    const images = files.map(file => `/uploads/timeline/${file.filename}`);
    const item = await timeline_model_1.TimelineItem.create({
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
    await (0, relationship_service_1.logActivity)(rel._id, userId, 'timeline_item_created', `Added a new memory: "${data.title}" 📸`);
    return item;
};
exports.createTimelineItem = createTimelineItem;
const getTimeline = async (userId) => {
    const rel = await (0, relationship_service_1.getRelationshipForUser)(userId);
    if (!rel) {
        throw { status: 403, message: 'You must belong to an active relationship space to view the timeline.' };
    }
    return timeline_model_1.TimelineItem.find({ relationshipId: rel._id }).sort({ memoryDate: -1 });
};
exports.getTimeline = getTimeline;
const toggleReaction = async (userId, userName, itemId, emoji) => {
    const item = await timeline_model_1.TimelineItem.findById(itemId);
    if (!item) {
        throw { status: 404, message: 'Memory not found.' };
    }
    const rel = await (0, relationship_service_1.getRelationshipForUser)(userId);
    if (!rel || rel._id.toString() !== item.relationshipId.toString()) {
        throw { status: 403, message: 'Permission denied.' };
    }
    // Check if this user has already reacted with this specific emoji
    const existingIdx = item.reactions.findIndex(r => r.userId === userId && r.emoji === emoji);
    if (existingIdx > -1) {
        // Toggle off: remove reaction
        item.reactions.splice(existingIdx, 1);
    }
    else {
        // Toggle on: add reaction
        item.reactions.push({ userId, userName, emoji });
    }
    await item.save();
    return item;
};
exports.toggleReaction = toggleReaction;
