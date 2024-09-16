"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var activity_validator_simple_1 = require("./activity-validator-simple");
describe('ActivityValidator', function () {
    it('should return an error if title is empty', function () {
        var activityProps = {
            title: '',
            occursAt: new Date('2024-11-02'),
        };
        var activityValidator = new activity_validator_simple_1.ActivityValidatorSimple();
        var activityValidationResult = activityValidator.validate(activityProps);
        expect(activityValidationResult).toEqual([{ path: 'title', message: 'O título da atividade é obrigatório' }]);
    });
    it("should return an error if the activity's occurrence date is old", function () {
        var activityProps = {
            title: 'Activity 01',
            occursAt: new Date('2022-02-02'),
        };
        var activityValidator = new activity_validator_simple_1.ActivityValidatorSimple();
        var activityValidationResult = activityValidator.validate(activityProps);
        expect(activityValidationResult).toEqual([{ path: 'occursAt', message: 'Data informada inválida' }]);
    });
});
