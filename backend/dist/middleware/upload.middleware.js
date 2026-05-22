"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dir = path_1.default.join(process.cwd(), 'uploads', 'future-messages');
if (!fs_1.default.existsSync(dir))
    fs_1.default.mkdirSync(dir, { recursive: true });
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, dir),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${path_1.default.extname(file.originalname)}`),
});
const allowed = /jpe?g|png|webp|mp3|wav|ogg|mp4/;
const fileFilter = (_req, file, cb) => {
    allowed.test(path_1.default.extname(file.originalname).toLowerCase()) ? cb(null, true) : cb(new Error('Invalid file type'));
};
exports.upload = (0, multer_1.default)({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
