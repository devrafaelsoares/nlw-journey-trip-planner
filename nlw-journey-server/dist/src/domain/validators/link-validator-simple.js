"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkValidatorSimple = void 0;
var LinkValidatorSimple = /** @class */ (function () {
    function LinkValidatorSimple() {
        this.errors = [];
    }
    LinkValidatorSimple.prototype.validate = function (props) {
        this.cleanErrors();
        this.validateTitle(props.title);
        this.validateUrl(props.url);
        return this.errors;
    };
    LinkValidatorSimple.prototype.isEmpty = function (value) {
        var valueSanatize = value.trim();
        return valueSanatize.length === 0;
    };
    LinkValidatorSimple.prototype.isUrlValid = function (value) {
        return new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/gi).test(value);
    };
    LinkValidatorSimple.prototype.validateUrl = function (value) {
        var _this = this;
        var rules = [{ validate: function (val) { return !_this.isUrlValid(val); }, message: 'URL informada inválida' }];
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            if (rule.validate(value)) {
                this.errors.push({ path: 'url', message: rule.message });
                break;
            }
        }
    };
    LinkValidatorSimple.prototype.validateTitle = function (value) {
        var _this = this;
        var rules = [{ validate: function (val) { return _this.isEmpty(val); }, message: 'O título do link é obrigatório' }];
        for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
            var rule = rules_2[_i];
            if (rule.validate(value)) {
                this.errors.push({ path: 'title', message: rule.message });
                break;
            }
        }
    };
    LinkValidatorSimple.prototype.cleanErrors = function () {
        this.errors = [];
    };
    return LinkValidatorSimple;
}());
exports.LinkValidatorSimple = LinkValidatorSimple;
