"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityMapper = void 0;
var entities_1 = require("../entities");
var helpers_1 = require("../../helpers");
var ActivityMapper = /** @class */ (function () {
    function ActivityMapper() {
    }
    ActivityMapper.toDomain = function (createdActivity) {
        var id = createdActivity.id, occurs_at = createdActivity.occurs_at, title = createdActivity.title;
        var activityResult = entities_1.Activity.create({
            occursAt: occurs_at,
            title: title,
        }, undefined, id);
        var activity = activityResult.value;
        return activity;
    };
    ActivityMapper.toDomainWithValidation = function (requets, activityValidator) {
        var occursAt = requets.occurs_at, title = requets.title;
        var activiyPropsCreate = {
            occursAt: new Date(occursAt),
            title: title,
        };
        var activityResult = entities_1.Activity.create(activiyPropsCreate, activityValidator);
        if (activityResult.isError()) {
            return (0, helpers_1.error)(activityResult.value);
        }
        var activity = activityResult.value;
        return (0, helpers_1.success)(activity);
    };
    ActivityMapper.toHttpResponse = function (data) {
        return {
            id: data.id,
            occurs_at: data.occursAt,
            title: data.title,
        };
    };
    return ActivityMapper;
}());
exports.ActivityMapper = ActivityMapper;
