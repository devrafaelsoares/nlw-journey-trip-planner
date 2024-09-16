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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripPrismaRepository = void 0;
var config_1 = require("../../infra/database/prisma/config");
var trip_1 = require("../mappers/trip");
var TripPrismaRepository = /** @class */ (function () {
    function TripPrismaRepository() {
    }
    TripPrismaRepository.prototype.save = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var destination, startsAt, endsAt, isConfirmed, updatedTrip, tripResult, trip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        destination = data.destination, startsAt = data.startsAt, endsAt = data.endsAt, isConfirmed = data.isConfirmed;
                        return [4 /*yield*/, config_1.prisma.trip.update({
                                where: { id: data.id },
                                data: {
                                    destination: destination,
                                    starts_at: startsAt,
                                    ends_at: endsAt,
                                    is_confirmed: isConfirmed,
                                },
                                include: { participants: true, activities: true, links: true },
                            })];
                    case 1:
                        updatedTrip = _a.sent();
                        tripResult = trip_1.TripMapper.toDomain(updatedTrip);
                        trip = tripResult.value;
                        return [2 /*return*/, trip];
                }
            });
        });
    };
    TripPrismaRepository.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var destination, startsAt, endsAt, owner, participants, ownerParticipant, participantsEmail, createdTrip, tripResult, trip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        destination = data.destination, startsAt = data.startsAt, endsAt = data.endsAt, owner = data.owner, participants = data.participants;
                        ownerParticipant = { name: owner.name, email: owner.email, is_confirmed: true, is_owner: true };
                        participantsEmail = participants.length
                            ? __spreadArray(__spreadArray([], participants.map(function (_a) {
                                var email = _a.email;
                                return ({ email: email });
                            }), true), [ownerParticipant], false) : [ownerParticipant];
                        return [4 /*yield*/, config_1.prisma.trip.create({
                                data: {
                                    destination: destination,
                                    starts_at: startsAt,
                                    ends_at: endsAt,
                                    participants: {
                                        createMany: {
                                            data: __spreadArray([], participantsEmail, true),
                                        },
                                    },
                                },
                                include: { participants: true, activities: true, links: true },
                            })];
                    case 1:
                        createdTrip = _a.sent();
                        tripResult = trip_1.TripMapper.toDomain(createdTrip);
                        trip = tripResult.value;
                        return [2 /*return*/, trip];
                }
            });
        });
    };
    TripPrismaRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundTrip, tripResult, trip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, config_1.prisma.trip.findUnique({
                            where: { id: id },
                            include: { participants: true, activities: true, links: true },
                        })];
                    case 1:
                        foundTrip = _a.sent();
                        if (!foundTrip) {
                            return [2 /*return*/, null];
                        }
                        tripResult = trip_1.TripMapper.toDomain(foundTrip);
                        trip = tripResult.value;
                        return [2 /*return*/, trip];
                }
            });
        });
    };
    TripPrismaRepository.prototype.find = function (field, value) {
        return __awaiter(this, void 0, void 0, function () {
            var foundTrips, tripsResult, trips;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, config_1.prisma.trip.findMany({
                            where: (_a = {}, _a[field] = value, _a),
                            include: { participants: true, activities: true, links: true },
                        })];
                    case 1:
                        foundTrips = _b.sent();
                        if (!foundTrips.length) {
                            return [2 /*return*/, null];
                        }
                        tripsResult = foundTrips.map(trip_1.TripMapper.toDomain);
                        trips = tripsResult.map(function (trip) { return trip.value; });
                        return [2 /*return*/, trips];
                }
            });
        });
    };
    TripPrismaRepository.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var foundAllTrips, tripsResult, trips;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, config_1.prisma.trip.findMany({
                            include: { participants: true, activities: true, links: true },
                        })];
                    case 1:
                        foundAllTrips = _a.sent();
                        tripsResult = foundAllTrips.map(trip_1.TripMapper.toDomain);
                        trips = tripsResult.map(function (trip) { return trip.value; });
                        return [2 /*return*/, trips];
                }
            });
        });
    };
    TripPrismaRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, config_1.prisma.trip.delete({ where: { id: id } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TripPrismaRepository;
}());
exports.TripPrismaRepository = TripPrismaRepository;
