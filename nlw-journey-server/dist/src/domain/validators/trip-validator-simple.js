"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripValidatorSimple = void 0;
var TripValidatorSimple = /** @class */ (function () {
    function TripValidatorSimple() {
        this.errors = [];
    }
    TripValidatorSimple.prototype.validate = function (props) {
        this.cleanErrors();
        this.validateDestination(props.destination);
        this.validateStatsAt(props.startsAt);
        this.validateEndsAt(props.startsAt, props.endsAt);
        return this.errors;
    };
    TripValidatorSimple.isEmpty = function (value) {
        var valueSanatize = value.trim();
        return valueSanatize.length === 0;
    };
    TripValidatorSimple.prototype.isDateValid = function (value) {
        var currentDate = Date.now();
        return value.getTime() > currentDate;
    };
    TripValidatorSimple.isUrlValid = function (value) {
        return new RegExp(/\[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/).test(value);
    };
    TripValidatorSimple.prototype.isEndsDateValid = function (statsAtValue, endsAtValue) {
        return endsAtValue.getTime() > statsAtValue.getTime();
    };
    TripValidatorSimple.isAcitivityDateValid = function (activity, statsAtValue, endsAtValue) {
        return (activity.occursAt.getTime() >= statsAtValue.getTime() &&
            activity.occursAt.getTime() <= endsAtValue.getTime());
    };
    TripValidatorSimple.prototype.validateDestination = function (value) {
        var rules = [
            {
                validate: function (val) { return TripValidatorSimple.isEmpty(val); },
                message: 'O destino da viagem é obrigatório',
            },
        ];
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            if (rule.validate(value)) {
                this.errors.push({ path: 'destination', message: rule.message });
                break;
            }
        }
    };
    TripValidatorSimple.prototype.validateStatsAt = function (value) {
        var _this = this;
        var rules = [{ validate: function (val) { return !_this.isDateValid(val); }, message: 'Data informada inválida' }];
        for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
            var rule = rules_2[_i];
            if (rule.validate(value)) {
                this.errors.push({ path: 'startsAt', message: rule.message });
                break;
            }
        }
    };
    TripValidatorSimple.prototype.validateEndsAt = function (statsAtValue, endsAtValue) {
        var _this = this;
        var rules = [
            {
                validate: function (statsAtVal, endsAtVal) { return !_this.isEndsDateValid(statsAtVal, endsAtVal); },
                message: 'Data de início da viagem é posterior a data data de fim',
            },
        ];
        for (var _i = 0, rules_3 = rules; _i < rules_3.length; _i++) {
            var rule = rules_3[_i];
            if (rule.validate(statsAtValue, endsAtValue)) {
                this.errors.push({ path: 'endsAt', message: rule.message });
                break;
            }
        }
    };
    TripValidatorSimple.validateActivities = function (value, statsAtValue, endsAtValue) {
        var _this = this;
        var activiesErrors = [];
        var rules = [
            {
                validate: function (activity, statsAtVal, endsAtVal) {
                    return !_this.isAcitivityDateValid(activity, statsAtVal, endsAtVal);
                },
                message: 'A data da atividade não está no intervalo de tempo da viagem',
            },
        ];
        for (var _i = 0, rules_4 = rules; _i < rules_4.length; _i++) {
            var rule = rules_4[_i];
            if (rule.validate(value, statsAtValue, endsAtValue)) {
                activiesErrors.push({ path: 'activities', message: rule.message });
                break;
            }
        }
        return activiesErrors;
    };
    TripValidatorSimple.validateLinks = function (value) {
        var _this = this;
        var linkErrors = [];
        var rules = [
            {
                validate: function (link) { return _this.isUrlValid(link.url); },
                message: 'A url do link não é válida',
            },
            { validate: function (link) { return TripValidatorSimple.isEmpty(link.title); }, message: 'A url é obrigatória' },
        ];
        for (var _i = 0, rules_5 = rules; _i < rules_5.length; _i++) {
            var rule = rules_5[_i];
            if (rule.validate(value)) {
                linkErrors.push({ path: 'links', message: rule.message });
                break;
            }
        }
        return linkErrors;
    };
    TripValidatorSimple.prototype.cleanErrors = function () {
        this.errors = [];
    };
    return TripValidatorSimple;
}());
exports.TripValidatorSimple = TripValidatorSimple;
