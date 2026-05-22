"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_2 = require("@clerk/express");
const db_1 = require("./config/db");
const memories_route_1 = __importDefault(require("./routes/memories.route"));
const futureMessage_routes_1 = __importDefault(require("./modules/future-message/futureMessage.routes"));
const relationship_routes_1 = __importDefault(require("./modules/relationship/relationship.routes"));
const timeline_routes_1 = __importDefault(require("./modules/timeline/timeline.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5003;
(0, db_1.connectDB)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_2.clerkMiddleware)());
app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'uploads')));
app.get('/api/health', (_req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});
app.use('/api/memories', memories_route_1.default);
app.use('/api/future-messages', futureMessage_routes_1.default);
app.use('/api/relationship', relationship_routes_1.default);
app.use('/api/timeline', timeline_routes_1.default);
app.use('/api/assistant', (_req, res) => {
    res.json({ message: 'AI Curator Assistant endpoint scaffold' });
});
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong' });
});
app.listen(PORT, () => console.log(`SatikSoul Server running on port ${PORT}`));
