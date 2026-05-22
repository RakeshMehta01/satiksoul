const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003';

async function req<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json.data;
}

export interface Relationship {
  _id: string;
  relationshipName: string;
  relationshipCode: string;
  anniversaryDate?: string;
  createdBy: string;
  partnerIds: string[];
  relationshipTheme?: string;
  relationshipStatus: 'pending' | 'active';
  createdAt: string;
  updatedAt: string;
}

export interface RelationshipInvite {
  _id: string;
  relationshipId: string;
  inviterId: string;
  inviteeEmail?: string;
  inviteCode: string;
  status: 'pending' | 'accepted' | 'expired';
  createdAt: string;
  updatedAt: string;
}

export interface CouplePresence {
  _id: string;
  relationshipId: string;
  userId: string;
  status: 'online' | 'offline';
  customStatus?: string;
  lastActive: string;
}

export interface SharedActivity {
  _id: string;
  relationshipId: string;
  userId: string;
  activityType: string;
  description: string;
  createdAt: string;
}

export const relationshipApi = {
  getMine: (token: string) => req<Relationship | null>('/api/relationship/mine', {}, token),

  create: (name: string, anniversaryDate?: string, token?: string) =>
    req<Relationship>('/api/relationship', {
      method: 'POST',
      body: JSON.stringify({ relationshipName: name, anniversaryDate }),
    }, token),

  update: (id: string, data: { relationshipName?: string; anniversaryDate?: string; relationshipTheme?: string }, token: string) =>
    req<Relationship>(`/api/relationship/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, token),

  getPresence: (id: string, token: string) => req<CouplePresence[]>(`/api/relationship/${id}/presence`, {}, token),

  updatePresence: (id: string, status: 'online' | 'offline', customStatus?: string, token?: string) =>
    req<CouplePresence>(`/api/relationship/${id}/presence`, {
      method: 'POST',
      body: JSON.stringify({ status, customStatus }),
    }, token),

  getActivities: (id: string, token: string) => req<SharedActivity[]>(`/api/relationship/${id}/activities`, {}, token),

  createInvite: (relationshipId: string, inviteeEmail?: string, token?: string) =>
    req<RelationshipInvite>('/api/relationship/invite', {
      method: 'POST',
      body: JSON.stringify({ relationshipId, inviteeEmail }),
    }, token),

  acceptInvite: (inviteCode: string, token: string) =>
    req<Relationship>('/api/relationship/invite/accept', {
      method: 'POST',
      body: JSON.stringify({ inviteCode }),
    }, token),

  getInvite: (relationshipId: string, token: string) =>
    req<RelationshipInvite | null>(`/api/relationship/${relationshipId}/invite`, {}, token),

  getInviteDetails: (code: string) =>
    req<{
      inviteCode: string;
      relationshipName: string;
      anniversaryDate?: string;
      relationshipTheme?: string;
      inviterName: string;
      inviterImage?: string;
      createdAt: string;
    }>(`/api/relationship/invite/details/${code}`),
};

