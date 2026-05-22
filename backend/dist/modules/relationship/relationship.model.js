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
exports.SharedActivity = exports.CouplePresence = exports.Relationship = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const RelationshipSchema = new mongoose_1.Schema({
    relationshipName: { type: String, required: true, default: "Our Little World" },
    relationshipCode: { type: String, required: true, unique: true, index: true },
    anniversaryDate: { type: Date },
    createdBy: { type: String, required: true },
    partnerIds: [{ type: String, index: true }], // Clerk User IDs of both partners
    relationshipTheme: { type: String, default: 'classic-blush' },
    relationshipStatus: { type: String, enum: ['pending', 'active', 'archived'], default: 'pending' },
}, { timestamps: true });
const CouplePresenceSchema = new mongoose_1.Schema({
    relationshipId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Relationship', required: true, index: true },
    userId: { type: String, required: true, index: true },
    lastActive: { type: Date, default: Date.now },
    status: { type: String, enum: ['online', 'offline'], default: 'offline' },
    customStatus: { type: String },
}, { timestamps: true });
const SharedActivitySchema = new mongoose_1.Schema({
    relationshipId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Relationship', required: true, index: true },
    userId: { type: String, required: true },
    activityType: { type: String, required: true }, // e.g. 'memory_created', 'letter_sealed', 'presence_check'
    description: { type: String, required: true },
}, { timestamps: true });
exports.Relationship = mongoose_1.default.model('Relationship', RelationshipSchema);
exports.CouplePresence = mongoose_1.default.model('CouplePresence', CouplePresenceSchema);
exports.SharedActivity = mongoose_1.default.model('SharedActivity', SharedActivitySchema);
