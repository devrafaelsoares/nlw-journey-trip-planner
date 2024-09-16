import { Activity as PrismaActivity } from '@prisma/client';
import { Activity, ActivityProps, ActivityPropsCreate } from '@domain/entities';
import { CreateActivityRequestProps, ActivityResponseProps } from '@presentation/adpaters/activity';
import { ValidationError, Validator } from '@domain/validators/protocols';
import { Either, error, success } from '@/helpers';

export class ActivityMapper {
    static toDomain(createdActivity: PrismaActivity): Activity {
        const { id, occurs_at, title } = createdActivity;
        const activityResult = Activity.create(
            {
                occursAt: occurs_at,
                title,
            },
            undefined,
            id
        );

        const activity = activityResult.value as Activity;

        return activity;
    }

    static toDomainWithValidation(
        requets: CreateActivityRequestProps,
        activityValidator: Validator<ActivityPropsCreate>
    ): Either<ValidationError<ActivityProps>[], Activity> {
        const { occurs_at: occursAt, title } = requets;

        const activiyPropsCreate: ActivityPropsCreate = {
            occursAt: new Date(occursAt),
            title,
        };

        const activityResult = Activity.create(activiyPropsCreate, activityValidator);

        if (activityResult.isError()) {
            return error(activityResult.value);
        }

        const activity = activityResult.value as Activity;

        return success(activity);
    }

    static toHttpResponse(data: Activity): ActivityResponseProps {
        return {
            id: data.id,
            occurs_at: data.occursAt,
            title: data.title,
        };
    }
}
