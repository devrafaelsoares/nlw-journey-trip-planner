import { ActivityResponseProps } from './activity';
import { LinkResponseProps } from './link';
import { ParticipantResponseProps } from './participant';

export type TripResponseProps = {
    id: string;
    destination: string;
    starts_at: Date;
    ends_at: Date;
    owner: ParticipantResponseProps;
    activities: ActivityResponseProps[];
    links: LinkResponseProps[];
    participants: ParticipantResponseProps[];
    emails_to_invite: string[];
};

export type SendTripInviteRequestProps = {
    guest_email: string;
};

export type CreateTripRequestProps = Pick<TripResponseProps, 'destination' | 'starts_at' | 'ends_at'> & {
    owner_name: string;
    owner_email: string;
    emails_to_invite?: string[] | null;
};

export type ConfirmParticipantTrip = {
    participant_name: string;
};

export type UpdateTripRequestProps = Pick<TripResponseProps, 'destination' | 'starts_at' | 'ends_at'>;

export type TripIdParamsProps = {
    id: string;
};

export type TripIdAndParticipantIdParamsProps = {
    tripId: string;
    participantId: string;
};

export type ConfirmTripInviteParamsProps = TripIdAndParticipantIdParamsProps;

export type RefuseTripInviteParamsProps = TripIdAndParticipantIdParamsProps;

export type RefuseTripParamsProps = TripIdParamsProps;

export type ConfirmTripParamsProps = TripIdParamsProps;

export type UpdateTripParamsProps = TripIdParamsProps;

export type FindByIdTripParamsProps = TripIdParamsProps;

export type SendTripInviteParamsProps = TripIdParamsProps;
