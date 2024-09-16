"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantValidatorSimple = void 0;
var ParticipantValidatorSimple = /** @class */ (function () {
    function ParticipantValidatorSimple() {
        this.errors = [];
    }
    ParticipantValidatorSimple.prototype.validate = function (props) {
        this.cleanErrors();
        this.validateEmail(props.email);
        return this.errors;
    };
    ParticipantValidatorSimple.prototype.isEmpty = function (value) {
        var valueSanatize = value.trim();
        return valueSanatize.length === 0;
    };
    ParticipantValidatorSimple.prototype.isEmailValid = function (value) {
        return new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(value);
    };
    ParticipantValidatorSimple.prototype.validateEmail = function (value) {
        var _this = this;
        var rules = [
            { validate: function (val) { return _this.isEmpty(val); }, message: 'O email é obrigatório' },
            { validate: function (val) { return !_this.isEmailValid(val); }, message: 'Email inválido' },
        ];
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            if (rule.validate(value)) {
                this.errors.push({ path: 'email', message: rule.message });
                break;
            }
        }
    };
    ParticipantValidatorSimple.prototype.validateName = function (value) {
        var _this = this;
        var rules = [{ validate: function (val) { return _this.isEmpty(val); }, message: 'O nome é obrigatório' }];
        for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
            var rule = rules_2[_i];
            if (rule.validate(value)) {
                this.errors.push({ path: 'name', message: rule.message });
                break;
            }
        }
    };
    ParticipantValidatorSimple.prototype.cleanErrors = function () {
        this.errors = [];
    };
    return ParticipantValidatorSimple;
}());
exports.ParticipantValidatorSimple = ParticipantValidatorSimple;
