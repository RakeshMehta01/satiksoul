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
const express_1 = require("express");
const express_2 = require("@clerk/express");
const relController = __importStar(require("./relationship.controller"));
const inviteController = __importStar(require("./invite.controller"));
const router = (0, express_1.Router)();
// Public invitation routes
router.get('/invite/details/:code', inviteController.getInviteDetails);
// Relationship core routes
router.get('/mine', (0, express_2.requireAuth)(), relController.getMine);
router.post('/', (0, express_2.requireAuth)(), relController.create);
router.put('/:id', (0, express_2.requireAuth)(), relController.update);
// Real-time presences and shared timeline activity logging
router.get('/:id/presence', (0, express_2.requireAuth)(), relController.getPresence);
router.post('/:id/presence', (0, express_2.requireAuth)(), relController.updatePresence);
router.get('/:id/activities', (0, express_2.requireAuth)(), relController.getActivities);
// Invitation code pairing routes
router.post('/invite', (0, express_2.requireAuth)(), inviteController.createInvite);
router.post('/invite/accept', (0, express_2.requireAuth)(), inviteController.acceptInvite);
router.get('/:relationshipId/invite', (0, express_2.requireAuth)(), inviteController.getInvite);
exports.default = router;
