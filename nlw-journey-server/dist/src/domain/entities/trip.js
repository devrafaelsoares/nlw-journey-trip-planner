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
exports.Trip = void 0;
var crypto_1 = require("crypto");
var either_1 = require("../../helpers/either");
var validators_1 = require("../validators");
var Trip = /** @class */ (function () {
    function Trip(props, id, isConfirmed) {
        var _a, _b, _c, _d;
        this._id = id ? id : (0, crypto_1.randomUUID)();
        this._isConfirmed = isConfirmed ? isConfirmed : false;
        this.props = __assign(__assign({}, props), { activities: (_a = props.activities) !== null && _a !== void 0 ? _a : [], participants: (_b = props.participants) !== null && _b !== void 0 ? _b : [], links: (_c = props.links) !== null && _c !== void 0 ? _c : [], createdAt: (_d = props.createdAt) !== null && _d !== void 0 ? _d : new Date() });
    }
    Trip.create = function (props, validator, id, isConfirmed) {
        if (validator) {
            var validationErrors = validator.validate(props);
            if (validationErrors.length > 0) {
                return (0, either_1.error)(validationErrors);
            }
        }
        return (0, either_1.success)(new Trip(props, id, isConfirmed));
    };
    Object.defineProperty(Trip.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "destination", {
        get: function () {
            return this.props.destination;
        },
        set: function (destination) {
            this.props.destination = destination;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "isConfirmed", {
        get: function () {
            return this._isConfirmed;
        },
        enumerable: false,
        configurable: true
    });
    Trip.prototype.confirm = function () {
        this._isConfirmed = true;
    };
    Object.defineProperty(Trip.prototype, "startsAt", {
        get: function () {
            return this.props.startsAt;
        },
        set: function (startsAt) {
            this.props.startsAt = startsAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "endsAt", {
        get: function () {
            return this.props.endsAt;
        },
        set: function (endsAt) {
            this.props.endsAt = endsAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "participants", {
        get: function () {
            return this.props.participants;
        },
        enumerable: false,
        configurable: true
    });
    Trip.prototype.addParticipant = function (participant) {
        this.participants.push(participant);
    };
    Object.defineProperty(Trip.prototype, "activities", {
        get: function () {
            return this.props.activities;
        },
        enumerable: false,
        configurable: true
    });
    Trip.prototype.addActivity = function (activity) {
        var errors = validators_1.TripValidatorSimple.validateActivities(activity, this.startsAt, this.endsAt);
        if (errors.length > 0) {
            return (0, either_1.error)(errors);
        }
        this.activities.push(activity);
        return (0, either_1.success)(undefined);
    };
    Object.defineProperty(Trip.prototype, "links", {
        get: function () {
            return this.props.links;
        },
        enumerable: false,
        configurable: true
    });
    Trip.prototype.addLinks = function (link) {
        var errors = validators_1.TripValidatorSimple.validateLinks(link);
        if (errors.length > 0) {
            return (0, either_1.error)(errors);
        }
        this.links.push(link);
        return (0, either_1.success)(undefined);
    };
    Object.defineProperty(Trip.prototype, "owner", {
        get: function () {
            return this.props.owner;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "createdAt", {
        get: function () {
            return this.props.createdAt;
        },
        enumerable: false,
        configurable: true
    });
    return Trip;
}());
exports.Trip = Trip;
