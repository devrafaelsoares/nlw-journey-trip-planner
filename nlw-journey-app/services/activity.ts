import { baseUrl, fetchApi } from '@/api/config';
import action from '@/app/actions';

type ActivityProps = {
    title: string;
    occurs_at: string;
};

type ActivityCreateProps = ActivityProps;
type ActivityEditProps = ActivityProps;

export type ActivityResponseProps = {
    id: string;
    title: string;
    occurs_at: string;
};

export async function createActivity(data: ActivityCreateProps, tripId: string): Promise<void> {
    const body = JSON.stringify(data);
    const response = await fetchApi<void>(`${baseUrl}/trips/${tripId}/activities`, {
        method: 'POST',
        body,
    });

    action();

    return response;
}

export async function editActivity(data: ActivityEditProps, activityId: string, tripId: string): Promise<void> {
    const body = JSON.stringify(data);
    const response = await fetchApi<void>(`${baseUrl}/trips/${tripId}/activities/${activityId}`, {
        method: 'PUT',
        body,
    });

    action();

    return response;
}

export async function deleteActivity(tripId: string, activityId: string): Promise<void> {
    const response = await fetchApi<void>(`${baseUrl}/trips/${tripId}/activities/${activityId}`, {
        method: 'DELETE',
    });

    action();

    return response;
}
