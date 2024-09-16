"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripMapper = void 0;
var either_1 = require("../../helpers/either");
var entities_1 = require("../entities");
var TripMapper = /** @class */ (function () {
    function TripMapper() {
    }
    TripMapper.toDomain = function (createdTrip) {
        var id = createdTrip.id, destination = createdTrip.destination, starts_at = createdTrip.starts_at, ends_at = createdTrip.ends_at, activities = createdTrip.activities, created_at = createdTrip.created_at, is_confirmed = createdTrip.is_confirmed, links = createdTrip.links, participants = createdTrip.participants;
        var ownerRegistered = createdTrip.participants.find(function (participant) { return participant.is_owner; });
        var tripResult = entities_1.Trip.create({
            destination: destination,
            startsAt: starts_at,
            endsAt: ends_at,
            owner: entities_1.Participant.create({
                email: ownerRegistered.email,
                name: ownerRegistered.name,
            }, undefined, ownerRegistered === null || ownerRegistered === void 0 ? void 0 : ownerRegistered.id, ownerRegistered === null || ownerRegistered === void 0 ? void 0 : ownerRegistered.is_confirmed).value,
            activities: activities.map(function (activity) {
                return entities_1.Activity.create({
                    occursAt: activity.occurs_at,
                    title: activity.title,
                }, undefined, activity.id).value;
            }),
            links: links.map(function (link) {
                return entities_1.Link.create({
                    title: link.title,
                    url: link.url,
                }, undefined, link.id).value;
            }),
            participants: participants.map(function (participant) {
                return entities_1.Participant.create({
                    email: participant.email,
                    name: participant.name,
                }, undefined, participant.id, participant.is_confirmed).value;
            }),
            createdAt: created_at,
        }, undefined, id, is_confirmed);
        if (tripResult.isError()) {
            return (0, either_1.error)(tripResult.value);
        }
        var trip = tripResult.value;
        return (0, either_1.success)(trip);
    };
    TripMapper.toDomainWithValidation = function (request, participantValidator, tripValidator) {
        var ownerResult = entities_1.Participant.create({ name: request.owner_name, email: request.owner_email }, participantValidator);
        if (ownerResult.isError()) {
            return (0, either_1.error)(ownerResult.value);
        }
        var owner = ownerResult.value;
        var participants = [];
        if (request.emails_to_invite) {
            for (var _i = 0, _a = request.emails_to_invite; _i < _a.length; _i++) {
                var email = _a[_i];
                var participantResult = entities_1.Participant.create({ email: email }, participantValidator);
                if (participantResult.isError()) {
                    return (0, either_1.error)(participantResult.value);
                }
                participants.push(participantResult.value);
            }
        }
        var tripPropsCreate = {
            destination: request.destination,
            startsAt: new Date(request.starts_at),
            endsAt: new Date(request.ends_at),
            owner: owner,
            participants: participants,
            activities: [],
            links: [],
            createdAt: new Date(),
        };
        var tripResult = entities_1.Trip.create(tripPropsCreate, tripValidator);
        if (tripResult.isError()) {
            return (0, either_1.error)(tripResult.value);
        }
        var trip = tripResult.value;
        return (0, either_1.success)(trip);
    };
    TripMapper.toPrisma = function (trip) {
        return {
            id: trip.id,
            destination: trip.destination,
            starts_at: trip.startsAt,
            ends_at: trip.endsAt,
            is_confirmed: trip.isConfirmed,
            created_at: trip.createdAt,
        };
    };
    TripMapper.toHttpResponse = function (trip) {
        var id = trip.id, destination = trip.destination, startsAt = trip.startsAt, endsAt = trip.endsAt, owner = trip.owner, activities = trip.activities, links = trip.links, participants = trip.participants;
        return {
            id: id,
            destination: destination,
            starts_at: startsAt,
            ends_at: endsAt,
            owner: { id: owner.id, email: owner.email, name: owner.name },
            activities: activities.map(function (_a) {
                var id = _a.id, title = _a.title, occursAt = _a.occursAt;
                return ({ id: id, title: title, occurs_at: occursAt });
            }),
            links: links.map(function (_a) {
                var id = _a.id, title = _a.title, url = _a.url;
                return ({ id: id, title: title, url: url });
            }),
            participants: participants.map(function (_a) {
                var id = _a.id, name = _a.name, email = _a.email, isConfirmed = _a.isConfirmed;
                return ({ id: id, name: name, email: email, isConfirmed: isConfirmed });
            }),
            emails_to_invite: participants
                .filter(function (participant) { return participant.email !== owner.email; })
                .map(function (participant) { return participant.email; }),
        };
    };
    return TripMapper;
}());
exports.TripMapper = TripMapper;
