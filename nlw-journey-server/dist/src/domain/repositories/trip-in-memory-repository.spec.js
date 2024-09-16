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
var trip_1 = require("../factories/trip");
var trip_in_memory_repository_1 = require("./trip-in-memory-repository");
describe('TripInMemoryRepository', function () {
    it('should be able to save an trip', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tripInMemoryRepository, trip, savedTrip, foundTrips;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tripInMemoryRepository = new trip_in_memory_repository_1.TripInMemoryRepository();
                    trip = (0, trip_1.createTrip)();
                    return [4 /*yield*/, tripInMemoryRepository.create(trip)];
                case 1:
                    savedTrip = _a.sent();
                    return [4 /*yield*/, tripInMemoryRepository.findAll()];
                case 2:
                    foundTrips = _a.sent();
                    expect(foundTrips).toHaveLength(1);
                    expect(foundTrips[0]).toEqual(savedTrip);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to search all trips', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tripInMemoryRepository, trip1, trip2, trip3, foundTrips;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tripInMemoryRepository = new trip_in_memory_repository_1.TripInMemoryRepository();
                    trip1 = (0, trip_1.createTrip)({ destination: 'Dallas - EUA' });
                    trip2 = (0, trip_1.createTrip)({ destination: 'Cancún - MEX' });
                    trip3 = (0, trip_1.createTrip)({ destination: 'Tokyo - JP' });
                    return [4 /*yield*/, tripInMemoryRepository.create(trip1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, tripInMemoryRepository.create(trip2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, tripInMemoryRepository.create(trip3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, tripInMemoryRepository.findAll()];
                case 4:
                    foundTrips = _a.sent();
                    expect(foundTrips).toHaveLength(3);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to search trip by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tripInMemoryRepository, trip, savedTrip, id, foundTrip;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tripInMemoryRepository = new trip_in_memory_repository_1.TripInMemoryRepository();
                    trip = (0, trip_1.createTrip)({ destination: 'Birmingham - UK' });
                    return [4 /*yield*/, tripInMemoryRepository.create(trip)];
                case 1:
                    savedTrip = _a.sent();
                    id = savedTrip.id;
                    return [4 /*yield*/, tripInMemoryRepository.findById(id)];
                case 2:
                    foundTrip = _a.sent();
                    expect(foundTrip).not.toBeNull();
                    expect(foundTrip).toBe(savedTrip);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to search trip by some attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tripInMemoryRepository, trip, savedTrip, foundTrip;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tripInMemoryRepository = new trip_in_memory_repository_1.TripInMemoryRepository();
                    trip = (0, trip_1.createTrip)({ destination: 'Destino 01' });
                    return [4 /*yield*/, tripInMemoryRepository.create(trip)];
                case 1:
                    savedTrip = _a.sent();
                    return [4 /*yield*/, tripInMemoryRepository.find('destination', 'Destino 01')];
                case 2:
                    foundTrip = _a.sent();
                    expect(foundTrip).not.toBeNull();
                    expect(foundTrip).toContainEqual(savedTrip);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to update an event', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tripInMemoryRepository, trip, savedTrip, savedUpdatedTrip;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tripInMemoryRepository = new trip_in_memory_repository_1.TripInMemoryRepository();
                    trip = (0, trip_1.createTrip)({ destination: 'Destino 01' });
                    return [4 /*yield*/, tripInMemoryRepository.create(trip)];
                case 1:
                    savedTrip = _a.sent();
                    savedTrip.destination = 'Destino 01 (Alterado)';
                    return [4 /*yield*/, tripInMemoryRepository.save(savedTrip)];
                case 2:
                    savedUpdatedTrip = _a.sent();
                    expect(savedUpdatedTrip).toHaveProperty('destination', 'Destino 01 (Alterado)');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to delete an event', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tripInMemoryRepository, event, savedTrip, foundTrips;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tripInMemoryRepository = new trip_in_memory_repository_1.TripInMemoryRepository();
                    event = (0, trip_1.createTrip)({ destination: 'Destino 01' });
                    return [4 /*yield*/, tripInMemoryRepository.create(event)];
                case 1:
                    savedTrip = _a.sent();
                    return [4 /*yield*/, tripInMemoryRepository.delete(savedTrip.id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, tripInMemoryRepository.findAll()];
                case 3:
                    foundTrips = _a.sent();
                    expect(foundTrips).not.toContain([]);
                    return [2 /*return*/];
            }
        });
    }); });
});
