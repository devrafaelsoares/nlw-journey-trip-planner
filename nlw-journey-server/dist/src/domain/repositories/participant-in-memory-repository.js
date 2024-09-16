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
exports.ParticipantInMemoryRepository = void 0;
var ParticipantInMemoryRepository = /** @class */ (function () {
    function ParticipantInMemoryRepository() {
        this.participants = [];
        this.tripParticipants = new Map(); // Map de tripId para uma lista de participantIds
    }
    ParticipantInMemoryRepository.prototype.createAndTripConnect = function (data, tripId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.participants.push(data);
                if (!this.tripParticipants.has(tripId)) {
                    this.tripParticipants.set(tripId, []);
                }
                this.tripParticipants.get(tripId).push(data.id);
                return [2 /*return*/, data];
            });
        });
    };
    ParticipantInMemoryRepository.prototype.findAllByTrip = function (tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var participantIds;
            return __generator(this, function (_a) {
                participantIds = this.tripParticipants.get(tripId) || [];
                return [2 /*return*/, this.participants.filter(function (participant) { return participantIds.includes(participant.id); })];
            });
        });
    };
    ParticipantInMemoryRepository.prototype.save = function (participant) {
        return __awaiter(this, void 0, void 0, function () {
            var tripFoundIndex;
            return __generator(this, function (_a) {
                tripFoundIndex = this.participants.findIndex(function (item) { return item.id === participant.id; });
                if (tripFoundIndex >= 0) {
                    this.participants[tripFoundIndex] = participant;
                    return [2 /*return*/, participant];
                }
                return [2 /*return*/];
            });
        });
    };
    ParticipantInMemoryRepository.prototype.create = function (participant) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.participants.push(participant);
                return [2 /*return*/, participant];
            });
        });
    };
    ParticipantInMemoryRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundParticipant;
            return __generator(this, function (_a) {
                foundParticipant = this.participants.find(function (participant) { return participant.id === id; });
                if (!foundParticipant) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, foundParticipant];
            });
        });
    };
    ParticipantInMemoryRepository.prototype.find = function (field, value) {
        return __awaiter(this, void 0, void 0, function () {
            var foundParticipants;
            return __generator(this, function (_a) {
                foundParticipants = this.participants.filter(function (participant) { return participant[field] === value; });
                if (!foundParticipants.length) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, foundParticipants];
            });
        });
    };
    ParticipantInMemoryRepository.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.participants];
            });
        });
    };
    ParticipantInMemoryRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var tripFoundIndex;
            return __generator(this, function (_a) {
                tripFoundIndex = this.participants.findIndex(function (item) { return item.id === id; });
                if (tripFoundIndex >= 0) {
                    this.participants.slice(tripFoundIndex);
                }
                return [2 /*return*/];
            });
        });
    };
    return ParticipantInMemoryRepository;
}());
exports.ParticipantInMemoryRepository = ParticipantInMemoryRepository;
