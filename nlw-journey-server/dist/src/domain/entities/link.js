"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
var crypto_1 = require("crypto");
var either_1 = require("../../helpers/either");
var Link = /** @class */ (function () {
    function Link(props, id) {
        this.props = props;
        this._id = id ? id : (0, crypto_1.randomUUID)();
    }
    Link.create = function (props, validator, id) {
        if (validator) {
            var validationErrors = validator.validate(props);
            if (validationErrors.length > 0) {
                return (0, either_1.error)(validationErrors);
            }
        }
        return (0, either_1.success)(new Link(props, id));
    };
    Object.defineProperty(Link.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "title", {
        get: function () {
            return this.props.title;
        },
        set: function (title) {
            this.props.title = title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "url", {
        get: function () {
            return this.props.url;
        },
        set: function (url) {
            this.props.url = url;
        },
        enumerable: false,
        configurable: true
    });
    return Link;
}());
exports.Link = Link;
