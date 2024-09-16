import { ActivityValidatorSimple } from '@domain/validators';
import { Activity, ActivityProps } from './activity';

describe('Activity', () => {
    it('should be able to create a activity', () => {
        const activityValidator = new ActivityValidatorSimple();
        const activityProps: ActivityProps = {
            title: 'Activity 01',
            occursAt: new Date('2024-11-02'),
        };

        const activityResult = Activity.create(activityProps, activityValidator);

        expect(activityResult.isSuccess()).toBeTruthy();
        expect(activityResult.value).toStrictEqual(expect.any(Activity));
    });

    it('should not be possible to create a activity', () => {
        const activityValidator = new ActivityValidatorSimple();
        const activityProps: ActivityProps = {
            title: '',
            occursAt: new Date('2024-11-02'),
        };
        const activityResult = Activity.create(activityProps, activityValidator);

        expect(activityResult.isError()).toBeTruthy();
        expect(activityResult.value).toEqual([{ path: 'title', message: 'O título da atividade é obrigatório' }]);
    });
});
