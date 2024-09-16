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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var zod_1 = require("zod");
var color_1 = require("../src/helpers/console/color");
var helpers_1 = require("../src/helpers");
dotenv.config();
var EnviromentMode = ['development', 'production', 'test'];
var EnvironmentSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(EnviromentMode, { message: "Modo de ambiente inv\u00E1lido. Esperados ".concat(EnviromentMode.join(' | ')) })
        .optional()
        .default('development'),
    FASTIFY_HOST: zod_1.z.string({ required_error: 'Configuração obrigatória' }).default(helpers_1.MY_IP_ADDRESS),
    FASTIFY_PORT: zod_1.z.string({ required_error: 'Configuração obrigatória' }),
});
var env = EnvironmentSchema.safeParse(process.env);
if (!env.success) {
    console.error("\n".concat(color_1.RED).concat(color_1.BOLD, "* Erro na inicializa\u00E7\u00E3o da aplica\u00E7\u00E3o:").concat(color_1.RESET, "\n"));
    console.error("".concat(color_1.RED, "Foram identificadas inconsist\u00EAncias nas vari\u00E1veis de ambiente necess\u00E1rias para o funcionamento do sistema.").concat(color_1.RESET, "\n"));
    console.error("".concat(color_1.RED).concat(color_1.BOLD, "Vari\u00E1veis: ").concat(color_1.RESET, "\n"));
    env.error.issues.forEach(function (issue) {
        var variable = issue.path.join('.');
        var message = issue.message;
        var value = process.env[variable] !== undefined ? process.env[variable] : 'undefined';
        console.error("".concat(color_1.RED, "- ").concat(color_1.BOLD).concat(variable, ": ").concat(color_1.RESET).concat(color_1.RED).concat(message, " (Valor fornecido: ").concat(value, ")").concat(color_1.RESET));
    });
    process.exit(1);
}
exports.default = env.data;
