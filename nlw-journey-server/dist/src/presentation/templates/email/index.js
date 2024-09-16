"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripInviteTemplateHtml = exports.tripCreateConfirmationTemplateHtml = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var encoding = 'utf-8';
exports.tripCreateConfirmationTemplateHtml = (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, 'trip-create.html'), {
    encoding: encoding,
});
exports.tripInviteTemplateHtml = (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, 'trip-invite.html'), {
    encoding: encoding,
});
