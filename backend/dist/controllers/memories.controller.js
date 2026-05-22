"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryController = void 0;
const memories_service_1 = require("../services/memories.service");
const memoryService = new memories_service_1.MemoryService();
class MemoryController {
    async createMemory(req, res, next) {
        try {
            const { title, description, mood, voiceTranscription, mediaUrl, sharedWith } = req.body;
            // Default mock user ID if not provided by middleware auth yet
            const userId = req.headers['x-user-id'] || 'mock-user-123';
            if (!title || !description) {
                res.status(400).json({ success: false, message: 'Title and description are required' });
                return;
            }
            const newMemory = await memoryService.createMemory({
                userId,
                title,
                description,
                mood: mood || 'Warm Nostalgia',
                voiceTranscription,
                mediaUrl,
                sharedWith: sharedWith || [],
            });
            res.status(201).json({
                success: true,
                data: newMemory,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getMemories(req, res, next) {
        try {
            const userId = req.headers['x-user-id'] || 'mock-user-123';
            const memories = await memoryService.getMemoriesByUser(userId);
            res.status(200).json({
                success: true,
                count: memories.length,
                data: memories,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getMemory(req, res, next) {
        try {
            const { id } = req.params;
            const memory = await memoryService.getMemoryById(id);
            if (!memory) {
                res.status(404).json({ success: false, message: 'Memory not found' });
                return;
            }
            res.status(200).json({
                success: true,
                data: memory,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateMemory(req, res, next) {
        try {
            const { id } = req.params;
            const updated = await memoryService.updateMemory(id, req.body);
            if (!updated) {
                res.status(404).json({ success: false, message: 'Memory not found' });
                return;
            }
            res.status(200).json({
                success: true,
                data: updated,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteMemory(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await memoryService.deleteMemory(id);
            if (!deleted) {
                res.status(404).json({ success: false, message: 'Memory not found' });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Memory deleted successfully',
            });
        }
        catch (error) {
            next(error);
        }
    }
    async generateQR(req, res, next) {
        try {
            const { id } = req.params;
            const memory = await memoryService.getMemoryById(id);
            if (!memory) {
                res.status(404).json({ success: false, message: 'Memory not found' });
                return;
            }
            const qrLink = await memoryService.generateQRLink(id);
            // Update memory with QR URL
            const updated = await memoryService.updateMemory(id, { qrCodeUrl: qrLink });
            res.status(200).json({
                success: true,
                qrCodeUrl: qrLink,
                data: updated,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.MemoryController = MemoryController;
