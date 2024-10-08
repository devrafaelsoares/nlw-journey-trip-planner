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
var activity_1 = require("../factories/activity");
var activity_in_memory_repository_1 = require("./activity-in-memory-repository");
describe('ActivityInMemoryRepository', function () {
    it('should be able to save an activity', function () { return __awaiter(void 0, void 0, void 0, function () {
        var activityInMemoryRepository, activity, savedActivity, foundActivities;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    activityInMemoryRepository = new activity_in_memory_repository_1.ActivityInMemoryRepository();
                    activity = (0, activity_1.createActivity)();
                    return [4 /*yield*/, activityInMemoryRepository.create(activity)];
                case 1:
                    savedActivity = _a.sent();
                    return [4 /*yield*/, activityInMemoryRepository.findAll()];
                case 2:
                    foundActivities = _a.sent();
                    expect(foundActivities).toHaveLength(1);
                    expect(foundActivities[0]).toEqual(savedActivity);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to search all activitys', function () { return __awaiter(void 0, void 0, void 0, function () {
        var activityInMemoryRepository, activity1, activity2, activity3, foundActivities;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    activityInMemoryRepository = new activity_in_memory_repository_1.ActivityInMemoryRepository();
                    activity1 = (0, activity_1.createActivity)({ title: 'Título 01' });
                    activity2 = (0, activity_1.createActivity)({ title: 'Título 02' });
                    activity3 = (0, activity_1.createActivity)({ title: 'Título 03' });
                    return [4 /*yield*/, activityInMemoryRepository.create(activity1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, activityInMemoryRepository.create(activity2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, activityInMemoryRepository.create(activity3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, activityInMemoryRepository.findAll()];
                case 4:
                    foundActivities = _a.sent();
                    expect(foundActivities).toHaveLength(3);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to search the first 10 items', function () { return __awaiter(void 0, void 0, void 0, function () {
        var activityInMemoryRepository, activities, index, activity, foundActivities;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    activityInMemoryRepository = new activity_in_memory_repository_1.ActivityInMemoryRepository();
                    activities = [];
                    for (index = 0; index <= 49; index++) {
                        activity = (0, activity_1.createActivity)({ title: "T\u00EDtulo ".concat(index + 1) });
                        activities.push(activity);
                    }
                    return [4 /*yield*/, activityInMemoryRepository.createMany(activities)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, activityInMemoryRepository.findWithPagination(10)];
                case 2:
                    foundActivities = _a.sent();
                    expect(foundActivities).toHaveLength(10);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to skip the first 20 items display search the first 20 items', function () { return __awaiter(void 0, void 0, void 0, function () {
        var activityInMemoryRepository, activities, index, activity, foundActivities;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    activityInMemoryRepository = new activity_in_memory_repository_1.ActivityInMemoryRepository();
                    activities = [];
                    for (index = 0; index <= 49; index++) {
                        activity = (0, activity_1.createActivity)({ title: "T\u00EDtulo ".concat(index + 1) });
                        activities.push(activity);
                    }
                    return [4 /*yield*/, activityInMemoryRepository.createMany(activities)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, activityInMemoryRepository.findWithPagination(20, 30)];
                case 2:
                    foundActivities = _a.sent();
                    expect(foundActivities).toHaveLength(20);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to search activity by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var activityInMemoryRepository, activity, savedActivity, id, foundActivity;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    activityInMemoryRepository = new activity_in_memory_repository_1.ActivityInMemoryRepository();
                    activity = (0, activity_1.createActivity)({ title: 'Título 01' });
                    return [4 /*yield*/, activityInMemoryRepository.create(activity)];
                case 1:
                    savedActivity = _a.sent();
                    id = savedActivity.id;
                    return [4 /*yield*/, activityInMemoryRepository.findById(id)];
                case 2:
                    foundActivity = _a.sent();
                    expect(foundActivity).not.toBeNull();
                    expect(foundActivity).toBe(savedActivity);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to search activity by some attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
        var activityInMemoryRepository, activity, savedActivity, foundActivity;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    activityInMemoryRepository = new activity_in_memory_repository_1.ActivityInMemoryRepository();
                    activity = (0, activity_1.createActivity)({ title: 'Título 01' });
                    return [4 /*yield*/, activityInMemoryRepository.create(activity)];
                case 1:
                    savedActivity = _a.sent();
                    return [4 /*yield*/, activityInMemoryRepository.find('title', 'Título 01')];
                case 2:
                    foundActivity = _a.sent();
                    expect(foundActivity).not.toBeNull();
                    expect(foundActivity).toContainEqual(savedActivity);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to update an event', function () { return __awaiter(void 0, void 0, void 0, function () {
        var activityInMemoryRepository, activity, savedActivity, savedUpdatedActivity;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    activityInMemoryRepository = new activity_in_memory_repository_1.ActivityInMemoryRepository();
                    activity = (0, activity_1.createActivity)({ title: 'Título 01' });
                    return [4 /*yield*/, activityInMemoryRepository.create(activity)];
                case 1:
                    savedActivity = _a.sent();
                    savedActivity.title = 'Título 01 (Alterado)';
                    return [4 /*yield*/, activityInMemoryRepository.save(savedActivity)];
                case 2:
                    savedUpdatedActivity = _a.sent();
                    expect(savedUpdatedActivity).toHaveProperty('title', 'Título 01 (Alterado)');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to delete an event', function () { return __awaiter(void 0, void 0, void 0, function () {
        var activityInMemoryRepository, event, savedActivity, foundActivities;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    activityInMemoryRepository = new activity_in_memory_repository_1.ActivityInMemoryRepository();
                    event = (0, activity_1.createActivity)({ title: 'Título 01' });
                    return [4 /*yield*/, activityInMemoryRepository.create(event)];
                case 1:
                    savedActivity = _a.sent();
                    return [4 /*yield*/, activityInMemoryRepository.delete(savedActivity.id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, activityInMemoryRepository.findAll()];
                case 3:
                    foundActivities = _a.sent();
                    expect(foundActivities).not.toContain([]);
                    return [2 /*return*/];
            }
        });
    }); });
});
