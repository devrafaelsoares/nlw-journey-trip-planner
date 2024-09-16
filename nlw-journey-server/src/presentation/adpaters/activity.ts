export type ActivityResponseProps = {
    id: string;
    title: string;
    occurs_at: Date;
};

export type ActivityIdAndTripIdParamsProps = {
    tripId: string;
    activityId: string;
};

export type ActivityIdParamsProps = {
    id: string;
};

export type UpdateActivityRequestProps = Pick<ActivityResponseProps, 'title' | 'occurs_at'>;

export type CreateActivityRequestProps = Pick<ActivityResponseProps, 'title' | 'occurs_at'>;

export type CreateActivityParamsProps = ActivityIdParamsProps;

export type UpdateActivityParamsProps = ActivityIdAndTripIdParamsProps;

export type DeleteActivityParamsProps = ActivityIdAndTripIdParamsProps;

export type FindAllActivitiesByTripParamsProps = ActivityIdParamsProps;

export type FindByIdActivitysAndTripParamsProps = ActivityIdAndTripIdParamsProps;
