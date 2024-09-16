import { ActivityProps } from '@domain/entities';
import { ActivityValidatorSimple } from './activity-validator-simple';

describe('ActivityValidator', () => {
    it('should return an error if title is empty', () => {
        const activityProps: ActivityProps = {
            title: '',
            occursAt: new Date('2024-11-02'),
        };

        const activityValidator = new ActivityValidatorSimple();

        const activityValidationResult = activityValidator.validate(activityProps);
        expect(activityValidationResult).toEqual([{ path: 'title', message: 'O título da atividade é obrigatório' }]);
    });

    it("should return an error if the activity's occurrence date is old", () => {
        const activityProps: ActivityProps = {
            title: 'Activity 01',
            occursAt: new Date('2022-02-02'),
        };

        const activityValidator = new ActivityValidatorSimple();

        const activityValidationResult = activityValidator.validate(activityProps);
        expect(activityValidationResult).toEqual([{ path: 'occursAt', message: 'Data informada inválida' }]);
    });
});
