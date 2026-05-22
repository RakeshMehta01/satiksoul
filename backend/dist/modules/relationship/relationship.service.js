"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedActivities = exports.logActivity = exports.getPresence = exports.updatePresence = exports.updateRelationship = exports.createRelationship = exports.getRelationshipForUser = void 0;
const relationship_model_1 = require("./relationship.model");
// Fetch the active or pending relationship space that a user belongs to
const getRelationshipForUser = async (userId) => {
    return relationship_model_1.Relationship.findOne({ partnerIds: userId });
};
exports.getRelationshipForUser = getRelationshipForUser;
// Create a new relationship space and generate a unique invite pairing code
const createRelationship = async (userId, name, anniversaryDate) => {
    const existing = await (0, exports.getRelationshipForUser)(userId);
    if (existing) {
        return existing; // Return existing relationship if already paired
    }
    // Generate an alpha-numeric unique pairing code, e.g. LOVE-8C9B
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const code = `LOVE-${randomSuffix}`;
    const rel = await relationship_model_1.Relationship.create({
        relationshipName: name || "Our Little World",
        relationshipCode: code,
        anniversaryDate,
        createdBy: userId,
        partnerIds: [userId],
        relationshipStatus: 'pending',
    });
    // Log activity
    await (0, exports.logActivity)(rel._id, userId, 'space_created', `${userId} created their private relationship world`);
    return rel;
};
exports.createRelationship = createRelationship;
// Update relationship details (such as theme or anniversary date)
const updateRelationship = async (userId, id, data) => {
    const rel = await relationship_model_1.Relationship.findOne({ _id: id, partnerIds: userId });
    if (!rel) {
        throw { status: 404, message: 'Relationship space not found or permission denied' };
    }
    if (data.relationshipName)
        rel.relationshipName = data.relationshipName;
    if (data.anniversaryDate)
        rel.anniversaryDate = data.anniversaryDate;
    if (data.relationshipTheme)
        rel.relationshipTheme = data.relationshipTheme;
    await rel.save();
    return rel;
};
exports.updateRelationship = updateRelationship;
// Update a user's real-time custom status or presence markers
const updatePresence = async (relationshipId, userId, status, customStatus) => {
    const presence = await relationship_model_1.CouplePresence.findOneAndUpdate({ relationshipId, userId }, { status, customStatus, lastActive: new Date() }, { new: true, upsert: true });
    return presence;
};
exports.updatePresence = updatePresence;
// Fetch the presence details of the couple
const getPresence = async (relationshipId) => {
    return relationship_model_1.CouplePresence.find({ relationshipId });
};
exports.getPresence = getPresence;
// Log a shared memory or letter action into the activity stream
const logActivity = async (relationshipId, userId, activityType, description) => {
    return relationship_model_1.SharedActivity.create({
        relationshipId,
        userId,
        activityType,
        description,
    });
};
exports.logActivity = logActivity;
// Fetch recent activity streams
const getSharedActivities = async (relationshipId) => {
    return relationship_model_1.SharedActivity.find({ relationshipId }).sort({ createdAt: -1 }).limit(10);
};
exports.getSharedActivities = getSharedActivities;
