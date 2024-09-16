import { baseUrl, fetchApi } from '@/api/config';
import action from '@/app/actions';
import { HttpResponse } from '@/app/helpers';

type InviteParticipantProps = {
    guest_email: string;
};

type InviteParticipantHttpResponse = HttpResponse<string>;

export async function inviteParticipantLink(
    data: InviteParticipantProps,
    tripId: string
): Promise<InviteParticipantHttpResponse> {
    const body = JSON.stringify(data);
    const response = await fetchApi<InviteParticipantHttpResponse>(`${baseUrl}/trips/${tripId}/invites`, {
        method: 'POST',
        body,
    });

    action();

    return response;
}
