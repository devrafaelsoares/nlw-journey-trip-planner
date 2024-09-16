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
exports.SendingEmailTripInvite = void 0;
var helpers_1 = require("../../../helpers");
var errors_1 = require("../../../presentation/errors");
var protocols_1 = require("../../../presentation/protocols");
var entities_1 = require("../../entities");
var email_1 = require("../../../presentation/templates/email");
var SendingEmailTripInvite = /** @class */ (function () {
    function SendingEmailTripInvite(emailService) {
        this.emailService = emailService;
        this.urlBuilder = (0, helpers_1.createFrontUrlBuilderDevelopment)();
    }
    SendingEmailTripInvite.prototype.send = function (trip, participant) {
        return __awaiter(this, void 0, void 0, function () {
            var destination, startsAt, endsAt, formattedDates, htmlContent, sendEmailInfo, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        destination = trip.destination, startsAt = trip.startsAt, endsAt = trip.endsAt;
                        formattedDates = this.formatTripDates(startsAt, endsAt);
                        htmlContent = email_1.tripInviteTemplateHtml
                            .replace('[TRIP_DESTINATION]', destination)
                            .replace('[TRIP_DATES]', formattedDates)
                            .replace('[TRIP_OWNER]', trip.owner.name || trip.owner.email)
                            .replace('[TRIP_PRESENCE_CONFIRMATION_URL]', this.urlBuilder.buildTripParticipantConfirmationUrl(trip.id, participant.id))
                            .replace('[TRIP_INITE_REFUSE_URL]', this.urlBuilder.buildTripInviteRefuseUrl(trip.id, participant.id));
                        return [4 /*yield*/, this.emailService.send(entities_1.Email.create({
                                from: 'rafael.soares.developer@gmail.com',
                                to: participant.email,
                                subject: 'Convite para Participar de uma Viagem',
                                html: htmlContent,
                            }))];
                    case 1:
                        sendEmailInfo = _a.sent();
                        if (sendEmailInfo.isError()) {
                            message = sendEmailInfo.value.message;
                            return [2 /*return*/, (0, helpers_1.error)(new errors_1.NotFoundEntityError(message, protocols_1.HttpStatus.INTERNAL_SERVER_ERROR))];
                        }
                        return [2 /*return*/, (0, helpers_1.success)(undefined)];
                }
            });
        });
    };
    SendingEmailTripInvite.prototype.sendMany = function (trip) {
        return __awaiter(this, void 0, void 0, function () {
            var destination, startsAt, endsAt, formattedDates, htmlContent, participants, _i, participants_1, participant, htmlContentParticipant, sendEmailInfo, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        destination = trip.destination, startsAt = trip.startsAt, endsAt = trip.endsAt;
                        formattedDates = this.formatTripDates(startsAt, endsAt);
                        htmlContent = email_1.tripInviteTemplateHtml
                            .replace('[TRIP_DESTINATION]', destination)
                            .replace('[TRIP_DATES]', formattedDates)
                            .replace('[TRIP_OWNER]', trip.owner.name || trip.owner.email);
                        participants = trip.participants.filter(function (participant) { return participant.isConfirmed === false; });
                        _i = 0, participants_1 = participants;
                        _a.label = 1;
                    case 1:
                        if (!(_i < participants_1.length)) return [3 /*break*/, 4];
                        participant = participants_1[_i];
                        htmlContentParticipant = htmlContent.replace('[TRIP_PRESENCE_CONFIRMATION_URL]', this.urlBuilder.buildTripParticipantConfirmationUrl(trip.id, participant.id));
                        return [4 /*yield*/, this.emailService.send(entities_1.Email.create({
                                from: 'rafael.soares.developer@gmail.com',
                                to: participant.email,
                                subject: 'Convite para Participar de uma Viagem',
                                html: htmlContentParticipant,
                            }))];
                    case 2:
                        sendEmailInfo = _a.sent();
                        if (sendEmailInfo.isError()) {
                            message = sendEmailInfo.value.message;
                            return [2 /*return*/, (0, helpers_1.error)(new errors_1.NotFoundEntityError(message, protocols_1.HttpStatus.INTERNAL_SERVER_ERROR))];
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, (0, helpers_1.success)(undefined)];
                }
            });
        });
    };
    SendingEmailTripInvite.prototype.formatTripDates = function (startsAt, endsAt) {
        var startDay = startsAt.getDate();
        var startMonth = startsAt.toLocaleString('default', { month: 'long' });
        var startYear = startsAt.getFullYear();
        var endDay = endsAt.getDate();
        var endMonth = endsAt.toLocaleString('default', { month: 'long' });
        var endYear = endsAt.getFullYear();
        if (startYear === endYear) {
            if (startMonth === endMonth) {
                return "".concat(startDay, " a ").concat(endDay, " de ").concat(startMonth, " de ").concat(startYear);
            }
            else {
                return "".concat(startDay, " de ").concat(startMonth, " a ").concat(endDay, " de ").concat(endMonth, " de ").concat(startYear);
            }
        }
        else {
            return "".concat(startDay, " de ").concat(startMonth, " de ").concat(startYear, " a ").concat(endDay, " de ").concat(endMonth, " de ").concat(endYear);
        }
    };
    return SendingEmailTripInvite;
}());
exports.SendingEmailTripInvite = SendingEmailTripInvite;
