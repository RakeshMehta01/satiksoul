import { RelationshipInvite } from './invite.model';
import { Relationship } from './relationship.model';
import * as relSvc from './relationship.service';
import { clerkClient } from '@clerk/express';

// Generate a new pairing invitation link/code
export const createInvite = async (relationshipId: string, inviterId: string, inviteeEmail?: string) => {
  // Generate code: e.g. SATIK-4C7B
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const inviteCode = `SATIK-${suffix}`;

  const invite = await RelationshipInvite.create({
    relationshipId,
    inviterId,
    inviteeEmail,
    inviteCode,
    status: 'pending',
  });

  return invite;
};

// Accept an invitation code, linking the invitee to the inviter's relationship space
export const acceptInvite = async (inviteCode: string, inviteeId: string) => {
  // Find pending invite by code
  const invite = await RelationshipInvite.findOne({ inviteCode, status: 'pending' });
  if (!invite) {
    throw { status: 404, message: 'Invalid or expired invitation code' };
  }

  // Find the target relationship
  const rel = await Relationship.findById(invite.relationshipId);
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
  await relSvc.logActivity(rel._id as any, inviteeId, 'partner_joined', `Partner joined the private world! Space is now unlocked 💖`);

  return rel;
};

// Get pending invite for a relationship
export const getInviteForRelationship = async (relationshipId: string) => {
  return RelationshipInvite.findOne({ relationshipId, status: 'pending' });
};

// Get public details of an invite code (unauthenticated)
export const getInviteDetails = async (inviteCode: string) => {
  const invite = await RelationshipInvite.findOne({ inviteCode, status: 'pending' });
  if (!invite) {
    throw { status: 404, message: 'Invalid or expired invitation code' };
  }

  const rel = await Relationship.findById(invite.relationshipId);
  if (!rel) {
    throw { status: 404, message: 'Relationship space not found' };
  }

  // Fetch the inviter's details from Clerk
  let inviterName = 'Someone';
  let inviterImage = '';
  try {
    const inviter = await clerkClient.users.getUser(invite.inviterId);
    inviterName = inviter.firstName || inviter.username || 'Someone';
    inviterImage = inviter.imageUrl || '';
  } catch (error) {
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

