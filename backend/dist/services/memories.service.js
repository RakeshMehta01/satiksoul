"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryService = void 0;
const memory_model_1 = __importDefault(require("../models/memory.model"));
class MemoryService {
    async createMemory(data) {
        const memory = new memory_model_1.default(data);
        return await memory.save();
    }
    async getMemoriesByUser(userId) {
        return await memory_model_1.default.find({ userId }).sort({ createdAt: -1 });
    }
    async getMemoryById(id) {
        return await memory_model_1.default.findById(id);
    }
    async updateMemory(id, updates) {
        return await memory_model_1.default.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    }
    async deleteMemory(id) {
        return await memory_model_1.default.findByIdAndDelete(id);
    }
    async generateQRLink(id) {
        // Generate a secure memory anchor portal URL
        return `https://satiksoul.com/portal/memory/${id}`;
    }
}
exports.MemoryService = MemoryService;
