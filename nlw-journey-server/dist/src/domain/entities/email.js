"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
var Email = /** @class */ (function () {
    function Email(props) {
        this.props = props;
    }
    Email.create = function (props) {
        return new Email(props);
    };
    Object.defineProperty(Email.prototype, "from", {
        get: function () {
            return this.props.from;
        },
        set: function (from) {
            this.props.from = from;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Email.prototype, "to", {
        get: function () {
            return this.props.to;
        },
        set: function (to) {
            this.props.to = to;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Email.prototype, "subject", {
        get: function () {
            return this.props.subject;
        },
        set: function (subject) {
            this.props.subject = subject;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Email.prototype, "text", {
        get: function () {
            return this.props.text;
        },
        set: function (text) {
            this.props.text = text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Email.prototype, "html", {
        get: function () {
            return this.props.html;
        },
        set: function (html) {
            this.props.html = html;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Email.prototype, "attachments", {
        get: function () {
            return this.props.attachments;
        },
        set: function (attachments) {
            this.props.attachments = attachments;
        },
        enumerable: false,
        configurable: true
    });
    return Email;
}());
exports.Email = Email;
