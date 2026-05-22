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
const mongoose_1 = __importStar(require("mongoose"));
const FutureMessageSchema = new mongoose_1.Schema({
    relationshipId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Relationship', required: true, index: true },
    userId: { type: String, required: true, index: true },
    recipientId: { type: String },
    title: { type: String, required: true, maxlength: 120 },
    content: { type: String, required: true, maxlength: 5000 },
    unlockDate: { type: Date, required: true },
    emotionalTag: {
        type: String,
        enum: ['Love', 'Anniversary', 'Missing You', 'Apology', 'Motivation', 'Wedding', 'Long Distance', 'Comfort', 'Future Dreams'],
        default: 'Love',
    },
    attachments: [{ url: String, type: { type: String, enum: ['image', 'audio'] }, name: String, _id: false }],
    recipientNote: { type: String, maxlength: 200 },
    musicUrl: String,
}, { timestamps: true });
exports.default = mongoose_1.default.model('FutureMessage', FutureMessageSchema);
