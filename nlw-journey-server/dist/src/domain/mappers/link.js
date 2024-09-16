"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkMapper = void 0;
var entities_1 = require("../entities");
var helpers_1 = require("../../helpers");
var LinkMapper = /** @class */ (function () {
    function LinkMapper() {
    }
    LinkMapper.toDomain = function (createdLink) {
        var id = createdLink.id, title = createdLink.title, url = createdLink.url;
        var linkResult = entities_1.Link.create({
            url: url,
            title: title,
        }, undefined, id);
        var link = linkResult.value;
        return link;
    };
    LinkMapper.toDomainWithValidation = function (requets, linkValidator) {
        var url = requets.url, title = requets.title;
        var linkPropsCreate = {
            url: url,
            title: title,
        };
        var linkResult = entities_1.Link.create(linkPropsCreate, linkValidator);
        if (linkResult.isError()) {
            return (0, helpers_1.error)(linkResult.value);
        }
        var link = linkResult.value;
        return (0, helpers_1.success)(link);
    };
    LinkMapper.toHttpResponse = function (data) {
        return {
            id: data.id,
            title: data.title,
            url: data.url,
        };
    };
    return LinkMapper;
}());
exports.LinkMapper = LinkMapper;
