"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantMapper = void 0;
var entities_1 = require("../entities");
var ParticipantMapper = /** @class */ (function () {
    function ParticipantMapper() {
    }
    ParticipantMapper.toDomain = function (createdParticipant) {
        var id = createdParticipant.id, email = createdParticipant.email, name = createdParticipant.name;
        var participantResult = entities_1.Participant.create({
            name: name,
            email: email,
        }, undefined, id);
        var participant = participantResult.value;
        return participant;
    };
    ParticipantMapper.toHttpResponse = function (trip) {
        var id = trip.id, name = trip.name, email = trip.email;
        return {
            id: id,
            name: name,
            email: email,
        };
    };
    return ParticipantMapper;
}());
exports.ParticipantMapper = ParticipantMapper;
