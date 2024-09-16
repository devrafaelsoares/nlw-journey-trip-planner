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
var participant_1 = require("../factories/participant");
var participant_in_memory_repository_1 = require("./participant-in-memory-repository");
describe('ParticipantInMemoryRepository', function () {
    it('should be able to save an participant', function () { return __awaiter(void 0, void 0, void 0, function () {
        var participantInMemoryRepository, participant, savedParticipant, foundParticipants;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    participantInMemoryRepository = new participant_in_memory_repository_1.ParticipantInMemoryRepository();
                    participant = (0, participant_1.createParticipant)();
                    return [4 /*yield*/, participantInMemoryRepository.create(participant)];
                case 1:
                    savedParticipant = _a.sent();
                    return [4 /*yield*/, participantInMemoryRepository.findAll()];
                case 2:
                    foundParticipants = _a.sent();
                    expect(foundParticipants).toHaveLength(1);
                    expect(foundParticipants[0]).toEqual(savedParticipant);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to search all participants', function () { return __awaiter(void 0, void 0, void 0, function () {
        var participantInMemoryRepository, participant1, participant2, participant3, foundParticipants;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    participantInMemoryRepository = new participant_in_memory_repository_1.ParticipantInMemoryRepository();
                    participant1 = (0, participant_1.createParticipant)({ name: 'Nome 01' });
                    participant2 = (0, participant_1.createParticipant)({ name: 'Nome 02' });
                    participant3 = (0, participant_1.createParticipant)({ name: 'Nome 03' });
                    return [4 /*yield*/, participantInMemoryRepository.create(participant1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, participantInMemoryRepository.create(participant2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, participantInMemoryRepository.create(participant3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, participantInMemoryRepository.findAll()];
                case 4:
                    foundParticipants = _a.sent();
                    expect(foundParticipants).toHaveLength(3);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to search participant by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var participantInMemoryRepository, participant, savedParticipant, id, foundParticipant;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    participantInMemoryRepository = new participant_in_memory_repository_1.ParticipantInMemoryRepository();
                    participant = (0, participant_1.createParticipant)({ name: 'Nome 01' });
                    return [4 /*yield*/, participantInMemoryRepository.create(participant)];
                case 1:
                    savedParticipant = _a.sent();
                    id = savedParticipant.id;
                    return [4 /*yield*/, participantInMemoryRepository.findById(id)];
                case 2:
                    foundParticipant = _a.sent();
                    expect(foundParticipant).not.toBeNull();
                    expect(foundParticipant).toBe(savedParticipant);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to search participant by some attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
        var participantInMemoryRepository, participant, savedParticipant, foundParticipant;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    participantInMemoryRepository = new participant_in_memory_repository_1.ParticipantInMemoryRepository();
                    participant = (0, participant_1.createParticipant)({ name: 'Nome 01' });
                    return [4 /*yield*/, participantInMemoryRepository.create(participant)];
                case 1:
                    savedParticipant = _a.sent();
                    return [4 /*yield*/, participantInMemoryRepository.find('name', 'Nome 01')];
                case 2:
                    foundParticipant = _a.sent();
                    expect(foundParticipant).not.toBeNull();
                    expect(foundParticipant).toContainEqual(savedParticipant);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to update an event', function () { return __awaiter(void 0, void 0, void 0, function () {
        var participantInMemoryRepository, participant, savedParticipant, savedUpdatedParticipant;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    participantInMemoryRepository = new participant_in_memory_repository_1.ParticipantInMemoryRepository();
                    participant = (0, participant_1.createParticipant)({ name: 'Nome 01' });
                    return [4 /*yield*/, participantInMemoryRepository.create(participant)];
                case 1:
                    savedParticipant = _a.sent();
                    savedParticipant.name = 'Nome 01 (Alterado)';
                    return [4 /*yield*/, participantInMemoryRepository.save(savedParticipant)];
                case 2:
                    savedUpdatedParticipant = _a.sent();
                    expect(savedUpdatedParticipant).toHaveProperty('name', 'Nome 01 (Alterado)');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to delete an event', function () { return __awaiter(void 0, void 0, void 0, function () {
        var participantInMemoryRepository, event, savedParticipant, foundParticipants;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    participantInMemoryRepository = new participant_in_memory_repository_1.ParticipantInMemoryRepository();
                    event = (0, participant_1.createParticipant)({ name: 'Nome 01' });
                    return [4 /*yield*/, participantInMemoryRepository.create(event)];
                case 1:
                    savedParticipant = _a.sent();
                    return [4 /*yield*/, participantInMemoryRepository.delete(savedParticipant.id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, participantInMemoryRepository.findAll()];
                case 3:
                    foundParticipants = _a.sent();
                    expect(foundParticipants).not.toContain([]);
                    return [2 /*return*/];
            }
        });
    }); });
});
