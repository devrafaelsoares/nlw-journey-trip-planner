import InviteParticipantModal from './InviteParticipantModal';
import { Participants } from './Participants';
import { TripResponseProps } from '@/services/trip';

type ParticipantsSectionProps = {
    trip: TripResponseProps;
    emailsToInvite: string[];
};

export function ParticipantsSection({ emailsToInvite, trip }: ParticipantsSectionProps) {
    const { participants } = trip;
    return (
        <div>
            <h1 className="text-2xl">Convidados</h1>
            <Participants participants={participants} emailsToInvite={emailsToInvite} />
            <InviteParticipantModal trip={trip} />
        </div>
    );
}
