import { baseUrl, fetchApi } from '@/api/config';
import action from '@/app/actions';

type LinkProps = {
    title: string;
    url: string;
};

type LinkCreateProps = LinkProps;
type LinkEditProps = LinkProps;

export async function createLink(data: LinkCreateProps, tripId: string): Promise<void> {
    const body = JSON.stringify(data);
    const response = await fetchApi<void>(`${baseUrl}/trips/${tripId}/links`, {
        method: 'POST',
        body,
    });

    action();

    return response;
}

export async function editLink(data: LinkEditProps, linkId: string, tripId: string): Promise<void> {
    const body = JSON.stringify(data);
    const response = await fetchApi<void>(`${baseUrl}/trips/${tripId}/links/${linkId}`, {
        method: 'PUT',
        body,
    });

    action();

    return response;
}

export async function deleteLink(tripId: string, linkId: string): Promise<void> {
    const response = await fetchApi<void>(`${baseUrl}/trips/${tripId}/links/${linkId}`, {
        method: 'DELETE',
    });

    action();

    return response;
}
