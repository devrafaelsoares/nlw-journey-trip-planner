"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("../validators");
var activity_1 = require("./activity");
describe('Activity', function () {
    it('should be able to create a activity', function () {
        var activityValidator = new validators_1.ActivityValidatorSimple();
        var activityProps = {
            title: 'Activity 01',
            occursAt: new Date('2024-11-02'),
        };
        var activityResult = activity_1.Activity.create(activityProps, activityValidator);
        expect(activityResult.isSuccess()).toBeTruthy();
        expect(activityResult.value).toStrictEqual(expect.any(activity_1.Activity));
    });
    it('should not be possible to create a activity', function () {
        var activityValidator = new validators_1.ActivityValidatorSimple();
        var activityProps = {
            title: '',
            occursAt: new Date('2024-11-02'),
        };
        var activityResult = activity_1.Activity.create(activityProps, activityValidator);
        expect(activityResult.isError()).toBeTruthy();
        expect(activityResult.value).toEqual([{ path: 'title', message: 'O título da atividade é obrigatório' }]);
    });
});
