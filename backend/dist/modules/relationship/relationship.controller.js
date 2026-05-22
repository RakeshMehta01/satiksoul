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
exports.getActivities = exports.updatePresence = exports.getPresence = exports.update = exports.create = exports.getMine = void 0;
const express_1 = require("@clerk/express");
const svc = __importStar(require("./relationship.service"));
const wrap = (fn) => async (req, res) => {
    try {
        res.json({ success: true, data: await fn(req, res) });
    }
    catch (e) {
        res.status(e.status || 500).json({ success: false, message: e.message });
    }
};
// Fetch current user's active relationship
exports.getMine = wrap(async (req) => {
    const { userId } = (0, express_1.getAuth)(req);
    return svc.getRelationshipForUser(userId || '');
});
// Create relationship space
exports.create = wrap(async (req) => {
    const { userId } = (0, express_1.getAuth)(req);
    const { relationshipName, anniversaryDate } = req.body;
    return svc.createRelationship(userId || '', relationshipName, anniversaryDate);
});
// Update relationship settings
exports.update = wrap(async (req) => {
    const { userId } = (0, express_1.getAuth)(req);
    return svc.updateRelationship(userId || '', req.params.id, req.body);
});
// Fetch presence stats of relationship partners
exports.getPresence = wrap(async (req) => {
    return svc.getPresence(req.params.id);
});
// Update current user's presence status in the relationship
exports.updatePresence = wrap(async (req) => {
    const { userId } = (0, express_1.getAuth)(req);
    const { status, customStatus } = req.body;
    return svc.updatePresence(req.params.id, userId || '', status, customStatus);
});
// Fetch activity feed logs for workspace home
exports.getActivities = wrap(async (req) => {
    return svc.getSharedActivities(req.params.id);
});
