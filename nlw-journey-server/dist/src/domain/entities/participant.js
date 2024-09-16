"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participant = void 0;
var crypto_1 = require("crypto");
var either_1 = require("../../helpers/either");
var Participant = /** @class */ (function () {
    function Participant(props, id, isConfirmed) {
        this.props = props;
        this._id = id ? id : (0, crypto_1.randomUUID)();
        this._isConfirmed = isConfirmed ? isConfirmed : false;
    }
    Participant.create = function (props, validator, id, isConfirmed) {
        if (validator) {
            var validationErrors = validator.validate(props);
            if (validationErrors.length > 0) {
                return (0, either_1.error)(validationErrors);
            }
        }
        return (0, either_1.success)(new Participant(props, id, isConfirmed));
    };
    Object.defineProperty(Participant.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Participant.prototype, "name", {
        get: function () {
            return this.props.name;
        },
        set: function (name) {
            this.props.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Participant.prototype, "email", {
        get: function () {
            return this.props.email;
        },
        set: function (email) {
            this.props.email = email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Participant.prototype, "isConfirmed", {
        get: function () {
            return this._isConfirmed;
        },
        enumerable: false,
        configurable: true
    });
    Participant.prototype.confirm = function () {
        this._isConfirmed = true;
    };
    return Participant;
}());
exports.Participant = Participant;
