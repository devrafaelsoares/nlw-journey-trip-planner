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
exports.createActivityProps = createActivityProps;
exports.createActivity = createActivity;
var entities_1 = require("../entities");
var validators_1 = require("../validators");
function createActivityProps(overrides) {
    if (overrides === void 0) { overrides = {}; }
    var today = new Date();
    var occursAt = new Date(today);
    occursAt.setDate(today.getDate() + 15);
    return __assign({ title: 'Teste', occursAt: occursAt }, overrides);
}
function createActivity(overrides) {
    if (overrides === void 0) { overrides = {}; }
    var eventValidator = new validators_1.ActivityValidatorSimple();
    var eventPropsCreate = createActivityProps(overrides);
    var eventResult = entities_1.Activity.create(eventPropsCreate, eventValidator);
    return eventResult.value;
}
