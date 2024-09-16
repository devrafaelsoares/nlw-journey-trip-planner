'use client';

import { ParticipantResponseProps } from '@/services/trip';
import { CircleCheck, CircleDashed } from 'lucide-react';
import { Fragment } from 'react';

type ParticipantsProps = {
    participants: ParticipantResponseProps[];
    emailsToInvite: string[];
};

export function Participants({ participants, emailsToInvite }: ParticipantsProps) {
    return (
        <div className="h-[220px] my-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800 scrollbar-track-white dark:scrollbar-track-zinc-950">
            {!!participants.length && (
                <Fragment>
                    {participants
                        .filter(participant => participant.isConfirmed === true)
                        .map(participant => (
                            <div key={participant.id} className="py-5 flex flex-col gap-5 px-1">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <div className="flex flex-col">
                                            <span>{participant.name}</span>
                                            <span>{participant.email}</span>
                                        </div>
                                    </div>
                                    <CircleCheck className="text-lime-800 dark:text-lime-300 size-6" />
                                </div>
                            </div>
                        ))}
                </Fragment>
            )}
            {!!emailsToInvite.length ? (
                emailsToInvite
                    .filter(email =>
                        participants
                            .filter(participant => !participant.isConfirmed)
                            .some(participant => participant.email === email)
                    )
                    .map((email_to_invite, index) => (
                        <div key={index} className="py-5 flex flex-col gap-5">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <div className="flex flex-col">
                                        <span>{email_to_invite}</span>
                                    </div>
                                </div>
                                <CircleDashed className="text-zinc-400 size-6" />
                            </div>
                        </div>
                    ))
            ) : (
                <div className="p-4 rounded-lg text-center md:text-start bg-secondary">
                    <span>Nenhum participante convidado</span>
                </div>
            )}
        </div>
    );
}
