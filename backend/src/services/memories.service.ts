import Memory, { IMemory } from '../models/memory.model';

export class MemoryService {
  async createMemory(data: Partial<IMemory>): Promise<IMemory> {
    const memory = new Memory(data);
    return await memory.save();
  }

  async getMemoriesByUser(userId: string): Promise<IMemory[]> {
    return await Memory.find({ userId }).sort({ createdAt: -1 });
  }

  async getMemoryById(id: string): Promise<IMemory | null> {
    return await Memory.findById(id);
  }

  async updateMemory(id: string, updates: Partial<IMemory>): Promise<IMemory | null> {
    return await Memory.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  }

  async deleteMemory(id: string): Promise<IMemory | null> {
    return await Memory.findByIdAndDelete(id);
  }

  async generateQRLink(id: string): Promise<string> {
    // Generate a secure memory anchor portal URL
    return `https://satiksoul.com/portal/memory/${id}`;
  }
}
