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
exports.createLinkProps = createLinkProps;
exports.createLink = createLink;
var entities_1 = require("../entities");
var validators_1 = require("../validators");
function createLinkProps(overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __assign({ url: 'https://teste.com.br', title: 'Teste' }, overrides);
}
function createLink(overrides) {
    if (overrides === void 0) { overrides = {}; }
    var eventValidator = new validators_1.LinkValidatorSimple();
    var eventPropsCreate = createLinkProps(overrides);
    var eventResult = entities_1.Link.create(eventPropsCreate, eventValidator);
    return eventResult.value;
}
