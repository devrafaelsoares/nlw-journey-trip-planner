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
exports.createParticipantProps = createParticipantProps;
exports.createParticipant = createParticipant;
var entities_1 = require("../entities");
var participant_validator_simple_1 = require("../validators/participant-validator-simple");
function createParticipantProps(overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __assign({ name: 'Anyone', email: 'anyone@email.com' }, overrides);
}
function createParticipant(overrides) {
    if (overrides === void 0) { overrides = {}; }
    var eventValidator = new participant_validator_simple_1.ParticipantValidatorSimple();
    var eventPropsCreate = createParticipantProps(overrides);
    var eventResult = entities_1.Participant.create(eventPropsCreate, eventValidator);
    return eventResult.value;
}
