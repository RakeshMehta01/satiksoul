"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInviteDetails = exports.getInviteForRelationship = exports.acceptInvite = exports.createInvite = void 0;
const invite_model_1 = require("./invite.model");
const relationship_model_1 = require("./relationship.model");
const relSvc = __importStar(require("./relationship.service"));
const express_1 = require("@clerk/express");
// Generate a new pairing invitation link/code
const createInvite = async (relationshipId, inviterId, inviteeEmail) => {
    // Generate code: e.g. SATIK-4C7B
    const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const inviteCode = `SATIK-${suffix}`;
    const invite = await invite_model_1.RelationshipInvite.create({
        relationshipId,
        inviterId,
        inviteeEmail,
        inviteCode,
        status: 'pending',
    });
    return invite;
};
exports.createInvite = createInvite;
// Accept an invitation code, linking the invitee to the inviter's relationship space
const acceptInvite = async (inviteCode, inviteeId) => {
    // Find pending invite by code
    const invite = await invite_model_1.RelationshipInvite.findOne({ inviteCode, status: 'pending' });
    if (!invite) {
        throw { status: 404, message: 'Invalid or expired invitation code' };
    }
    // Find the target relationship
    const rel = await relationship_model_1.Relationship.findById(invite.relationshipId);
    if (!rel) {
        throw { status: 404, message: 'Relationship space not found' };
    }
    // Check if already paired
    if (rel.partnerIds.includes(inviteeId)) {
        invite.status = 'accepted';
        await invite.save();
        return rel;
    }
    // Add invitee to relationship partnerIds
    rel.partnerIds.push(inviteeId);
    rel.relationshipStatus = 'active';
    await rel.save();
    // Mark invite as accepted
    invite.status = 'accepted';
    await invite.save();
    // Log activity
    await relSvc.logActivity(rel._id, inviteeId, 'partner_joined', `Partner joined the private world! Space is now unlocked 💖`);
    return rel;
};
exports.acceptInvite = acceptInvite;
// Get pending invite for a relationship
const getInviteForRelationship = async (relationshipId) => {
    return invite_model_1.RelationshipInvite.findOne({ relationshipId, status: 'pending' });
};
exports.getInviteForRelationship = getInviteForRelationship;
// Get public details of an invite code (unauthenticated)
const getInviteDetails = async (inviteCode) => {
    const invite = await invite_model_1.RelationshipInvite.findOne({ inviteCode, status: 'pending' });
    if (!invite) {
        throw { status: 404, message: 'Invalid or expired invitation code' };
    }
    const rel = await relationship_model_1.Relationship.findById(invite.relationshipId);
    if (!rel) {
        throw { status: 404, message: 'Relationship space not found' };
    }
    // Fetch the inviter's details from Clerk
    let inviterName = 'Someone';
    let inviterImage = '';
    try {
        const inviter = await express_1.clerkClient.users.getUser(invite.inviterId);
        inviterName = inviter.firstName || inviter.username || 'Someone';
        inviterImage = inviter.imageUrl || '';
    }
    catch (error) {
        console.error('Failed to fetch inviter details from Clerk:', error);
    }
    return {
        inviteCode: invite.inviteCode,
        relationshipName: rel.relationshipName,
        anniversaryDate: rel.anniversaryDate,
        relationshipTheme: rel.relationshipTheme,
        inviterName,
        inviterImage,
        createdAt: invite.createdAt,
    };
};
exports.getInviteDetails = getInviteDetails;
