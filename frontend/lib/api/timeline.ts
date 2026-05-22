const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003';

export interface TimelineReaction {
  userId: string;
  userName: string;
  emoji: string;
}

export interface TimelineItem {
  _id: string;
  relationshipId: string;
  createdBy: string;
  title: string;
  caption: string;
  images: string[];
  emotionalTag: 'Happy' | 'Romantic' | 'Missing You' | 'Milestone' | 'Adventure' | 'Anniversary';
  memoryDate: string;
  reactions: TimelineReaction[];
  createdAt: string;
  updatedAt: string;
}

export const timelineApi = {
  getAll: async (token: string): Promise<TimelineItem[]> => {
    const res = await fetch(`${API}/api/timeline`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch timeline');
    return json.data;
  },

  create: async (formData: FormData, token: string): Promise<TimelineItem> => {
    const res = await fetch(`${API}/api/timeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create memory');
    return json.data;
  },

  toggleReaction: async (itemId: string, emoji: string, token: string): Promise<TimelineItem> => {
    const res = await fetch(`${API}/api/timeline/${itemId}/react`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ emoji }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to react');
    return json.data;
  },
};
