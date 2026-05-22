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
exports.react = exports.list = exports.create = void 0;
const express_1 = require("@clerk/express");
const svc = __importStar(require("./timeline.service"));
const wrap = (fn) => async (req, res) => {
    try {
        res.json({ success: true, data: await fn(req, res) });
    }
    catch (e) {
        console.error('Timeline Controller Error:', e);
        res.status(e.status || 500).json({ success: false, message: e.message || 'Internal Server Error' });
    }
};
exports.create = wrap(async (req) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId)
        throw { status: 401, message: 'Unauthorized' };
    return svc.createTimelineItem(userId, req.body, req.files || []);
});
exports.list = wrap(async (req) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId)
        throw { status: 401, message: 'Unauthorized' };
    return svc.getTimeline(userId);
});
exports.react = wrap(async (req) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId)
        throw { status: 401, message: 'Unauthorized' };
    // Fetch user profile from Clerk to get their premium display name
    const user = await express_1.clerkClient.users.getUser(userId);
    const userName = user.firstName
        ? `${user.firstName} ${user.lastName || ''}`.trim()
        : (user.username || 'Partner');
    const { emoji } = req.body;
    if (!emoji)
        throw { status: 400, message: 'Emoji is required to react.' };
    return svc.toggleReaction(userId, userName, req.params.id, emoji);
});
