"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
var crypto_1 = require("crypto");
var either_1 = require("../../helpers/either");
var Activity = /** @class */ (function () {
    function Activity(props, id) {
        this.props = props;
        this._id = id ? id : (0, crypto_1.randomUUID)();
    }
    Activity.create = function (props, validator, id) {
        if (validator) {
            var validationErrors = validator.validate(props);
            if (validationErrors.length > 0) {
                return (0, either_1.error)(validationErrors);
            }
        }
        return (0, either_1.success)(new Activity(props, id));
    };
    Object.defineProperty(Activity.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "title", {
        get: function () {
            return this.props.title;
        },
        set: function (title) {
            this.props.title = title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "occursAt", {
        get: function () {
            return this.props.occursAt;
        },
        set: function (occursAt) {
            this.props.occursAt = occursAt;
        },
        enumerable: false,
        configurable: true
    });
    return Activity;
}());
exports.Activity = Activity;
