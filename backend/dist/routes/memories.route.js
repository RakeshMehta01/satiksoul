"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memories_controller_1 = require("../controllers/memories.controller");
const router = (0, express_1.Router)();
const controller = new memories_controller_1.MemoryController();
// Create memory
router.post('/', (req, res, next) => controller.createMemory(req, res, next));
// Get all memories of user
router.get('/', (req, res, next) => controller.getMemories(req, res, next));
// Get single memory by ID
router.get('/:id', (req, res, next) => controller.getMemory(req, res, next));
// Update memory by ID
router.put('/:id', (req, res, next) => controller.updateMemory(req, res, next));
// Delete memory by ID
router.delete('/:id', (req, res, next) => controller.deleteMemory(req, res, next));
// Generate QR code token portal for a memory
router.post('/:id/qr', (req, res, next) => controller.generateQR(req, res, next));
exports.default = router;
