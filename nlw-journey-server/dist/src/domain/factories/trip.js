"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTripProps = createTripProps;
exports.createTrip = createTrip;
var entities_1 = require("../entities");
var trip_validator_simple_1 = require("../validators/trip-validator-simple");
var participant_1 = require("./participant");
function createTripProps(overrides) {
    if (overrides === void 0) { overrides = {}; }
    var owner = (0, participant_1.createParticipant)();
    var today = new Date();
    var startsAt = new Date(today);
    var endsAt = new Date(today);
    startsAt.setDate(today.getDate() + 5);
    endsAt.setDate(today.getDate() + 15);
    return __assign({ destination: 'Los Angeles - CA', startsAt: startsAt, endsAt: endsAt, owner: owner }, overrides);
}
function createTrip(overrides) {
    if (overrides === void 0) { overrides = {}; }
    var eventValidator = new trip_validator_simple_1.TripValidatorSimple();
    var eventPropsCreate = createTripProps(overrides);
    var eventResult = entities_1.Trip.create(eventPropsCreate, eventValidator);
    return eventResult.value;
}
