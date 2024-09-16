"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var client_1 = require("@prisma/client");
var _env_1 = __importDefault(require("../../../../env"));
var logEnviroment = {
    development: ['error', 'info', 'query', 'warn'],
    production: ['info'],
    test: ['error', 'info', 'query', 'warn'],
};
exports.prisma = new client_1.PrismaClient({
    log: logEnviroment[_env_1.default.NODE_ENV],
});
