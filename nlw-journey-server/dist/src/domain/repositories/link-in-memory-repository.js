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
exports.LinkInMemoryRepository = void 0;
var LinkInMemoryRepository = /** @class */ (function () {
    function LinkInMemoryRepository() {
        this.links = [];
        this.tripLinks = new Map();
    }
    LinkInMemoryRepository.prototype.findByUrl = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var foundLink;
            return __generator(this, function (_a) {
                foundLink = this.links.find(function (link) { return link.url === url; });
                if (!foundLink) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, foundLink];
            });
        });
    };
    LinkInMemoryRepository.prototype.findByTitle = function (title) {
        return __awaiter(this, void 0, void 0, function () {
            var foundLink;
            return __generator(this, function (_a) {
                foundLink = this.links.find(function (link) { return link.title === title; });
                if (!foundLink) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, foundLink];
            });
        });
    };
    LinkInMemoryRepository.prototype.createAndTripConnect = function (data, tripId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.links.push(data);
                if (!this.tripLinks.has(tripId)) {
                    this.tripLinks.set(tripId, []);
                }
                this.tripLinks.get(tripId).push(data.id);
                return [2 /*return*/, data];
            });
        });
    };
    LinkInMemoryRepository.prototype.save = function (link) {
        return __awaiter(this, void 0, void 0, function () {
            var tripFoundIndex;
            return __generator(this, function (_a) {
                tripFoundIndex = this.links.findIndex(function (item) { return item.id === link.id; });
                if (tripFoundIndex >= 0) {
                    this.links[tripFoundIndex] = link;
                    return [2 /*return*/, link];
                }
                return [2 /*return*/];
            });
        });
    };
    LinkInMemoryRepository.prototype.create = function (link) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.links.push(link);
                return [2 /*return*/, link];
            });
        });
    };
    LinkInMemoryRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundLink;
            return __generator(this, function (_a) {
                foundLink = this.links.find(function (link) { return link.id === id; });
                if (!foundLink) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, foundLink];
            });
        });
    };
    LinkInMemoryRepository.prototype.find = function (field, value) {
        return __awaiter(this, void 0, void 0, function () {
            var foundLinks;
            return __generator(this, function (_a) {
                foundLinks = this.links.filter(function (link) { return link[field] === value; });
                if (!foundLinks.length) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, foundLinks];
            });
        });
    };
    LinkInMemoryRepository.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.links];
            });
        });
    };
    LinkInMemoryRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var tripFoundIndex;
            return __generator(this, function (_a) {
                tripFoundIndex = this.links.findIndex(function (item) { return item.id === id; });
                if (tripFoundIndex >= 0) {
                    this.links.slice(tripFoundIndex);
                }
                return [2 /*return*/];
            });
        });
    };
    return LinkInMemoryRepository;
}());
exports.LinkInMemoryRepository = LinkInMemoryRepository;
