const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003';

async function req<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      ...(!(options.body instanceof FormData) && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json.data;
}

export interface FutureMessage {
  _id: string;
  title: string;
  unlockDate: string;
  emotionalTag: string;
  recipientNote?: string;
  attachmentCount: number;
  attachments: { url: string; type: 'image' | 'audio'; name: string }[];
  isUnlocked: boolean;
  content: string | null;
  musicUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessageDto {
  title: string;
  content: string;
  unlockDate: string;
  emotionalTag: string;
  recipientNote?: string;
}

export const futureMessageApi = {
  getAll: (token: string) => req<FutureMessage[]>('/api/future-messages', {}, token),

  getOne: (id: string, token: string) => req<FutureMessage>(`/api/future-messages/${id}`, {}, token),

  create: async (data: CreateMessageDto, files: File[], token: string): Promise<FutureMessage> => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => v && form.append(k, v));
    files.forEach(f => form.append('files', f));
    return req<FutureMessage>('/api/future-messages', { method: 'POST', body: form }, token);
  },

  update: (id: string, data: Partial<CreateMessageDto>, token: string) =>
    req<FutureMessage>(`/api/future-messages/${id}`, { method: 'PUT', body: JSON.stringify(data) }, token),

  delete: (id: string, token: string) =>
    req<{ deleted: boolean }>(`/api/future-messages/${id}`, { method: 'DELETE' }, token),
};
