"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityPrismaRepository = void 0;
var config_1 = require("../../infra/database/prisma/config");
var activity_1 = require("../mappers/activity");
var ActivityPrismaRepository = /** @class */ (function () {
    function ActivityPrismaRepository() {
    }
    ActivityPrismaRepository.prototype.createAndTripConnect = function (data, tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var occursAt, title, createdActivity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        occursAt = data.occursAt, title = data.title;
                        return [4 /*yield*/, config_1.prisma.activity.create({
                                data: {
                                    occurs_at: occursAt,
                                    title: title,
                                    trip: { connect: { id: tripId } },
                                },
                            })];
                    case 1:
                        createdActivity = _a.sent();
                        return [2 /*return*/, activity_1.ActivityMapper.toDomain(createdActivity)];
                }
            });
        });
    };
    ActivityPrismaRepository.prototype.findByTitleAndOccursAt = function (title, occursAt) {
        return __awaiter(this, void 0, void 0, function () {
            var foundActivity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, config_1.prisma.activity.findFirst({
                            where: {
                                title: title,
                                occurs_at: new Date(occursAt),
                            },
                        })];
                    case 1:
                        foundActivity = _a.sent();
                        if (!foundActivity) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, activity_1.ActivityMapper.toDomain(foundActivity)];
                }
            });
        });
    };
    ActivityPrismaRepository.prototype.save = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var occursAt, title, id, updatedActivity, activity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        occursAt = data.occursAt, title = data.title, id = data.id;
                        return [4 /*yield*/, config_1.prisma.activity.update({
                                where: { id: id },
                                data: {
                                    title: title,
                                    occurs_at: occursAt,
                                },
                            })];
                    case 1:
                        updatedActivity = _a.sent();
                        activity = activity_1.ActivityMapper.toDomain(updatedActivity);
                        return [2 /*return*/, activity];
                }
            });
        });
    };
    ActivityPrismaRepository.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    ActivityPrismaRepository.prototype.createMany = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    ActivityPrismaRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundActivity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, config_1.prisma.activity.findUnique({
                            where: { id: id },
                        })];
                    case 1:
                        foundActivity = _a.sent();
                        if (!foundActivity) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, activity_1.ActivityMapper.toDomain(foundActivity)];
                }
            });
        });
    };
    ActivityPrismaRepository.prototype.find = function (field, value) {
        return __awaiter(this, void 0, void 0, function () {
            var foundActivity;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, config_1.prisma.activity.findMany({
                            where: (_a = {},
                                _a[field] = value,
                                _a),
                        })];
                    case 1:
                        foundActivity = _b.sent();
                        if (!foundActivity.length) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, foundActivity.map(activity_1.ActivityMapper.toDomain)];
                }
            });
        });
    };
    ActivityPrismaRepository.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var foundAllActivies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, config_1.prisma.activity.findMany()];
                    case 1:
                        foundAllActivies = _a.sent();
                        return [2 /*return*/, foundAllActivies.map(activity_1.ActivityMapper.toDomain)];
                }
            });
        });
    };
    ActivityPrismaRepository.prototype.findWithPagination = function (take_1) {
        return __awaiter(this, arguments, void 0, function (take, skip) {
            var foundAllActivies;
            if (skip === void 0) { skip = 0; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, config_1.prisma.activity.findMany({
                            take: take,
                            skip: skip,
                        })];
                    case 1:
                        foundAllActivies = _a.sent();
                        return [2 /*return*/, foundAllActivies.map(activity_1.ActivityMapper.toDomain)];
                }
            });
        });
    };
    ActivityPrismaRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, config_1.prisma.activity.delete({
                            where: { id: id },
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ActivityPrismaRepository;
}());
exports.ActivityPrismaRepository = ActivityPrismaRepository;
