"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityValidatorSimple = void 0;
var ActivityValidatorSimple = /** @class */ (function () {
    function ActivityValidatorSimple() {
        this.errors = [];
    }
    ActivityValidatorSimple.prototype.validate = function (props) {
        this.cleanErrors();
        this.validateOccursAt(props.occursAt);
        this.validateTitle(props.title);
        return this.errors;
    };
    ActivityValidatorSimple.prototype.isEmpty = function (value) {
        var valueSanatize = value.trim();
        return valueSanatize.length === 0;
    };
    ActivityValidatorSimple.prototype.isDateValid = function (value) {
        var currentDate = Date.now();
        return value.getTime() > currentDate;
    };
    ActivityValidatorSimple.prototype.validateOccursAt = function (value) {
        var _this = this;
        var rules = [{ validate: function (val) { return !_this.isDateValid(val); }, message: 'Data informada inválida' }];
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            if (rule.validate(value)) {
                this.errors.push({ path: 'occursAt', message: rule.message });
                break;
            }
        }
    };
    ActivityValidatorSimple.prototype.validateTitle = function (value) {
        var _this = this;
        var rules = [
            { validate: function (val) { return _this.isEmpty(val); }, message: 'O título da atividade é obrigatório' },
        ];
        for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
            var rule = rules_2[_i];
            if (rule.validate(value)) {
                this.errors.push({ path: 'title', message: rule.message });
                break;
            }
        }
    };
    ActivityValidatorSimple.prototype.cleanErrors = function () {
        this.errors = [];
    };
    return ActivityValidatorSimple;
}());
exports.ActivityValidatorSimple = ActivityValidatorSimple;
