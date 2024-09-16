import { Validator } from '@domain/validators/protocols';
import { Either, error, success } from '@helpers/either';
import { ValidationError } from '@domain/validators/protocols';
import { CreateTripRequestProps, TripResponseProps } from '@presentation/adpaters/trip';
import {
    Trip as PrismaTrip,
    Participant as PrismaParticipant,
    Activity as PrimsaActivity,
    Link as PrismaLink,
} from '@prisma/client';
import {
    Activity,
    Link,
    Participant,
    ParticipantProps,
    ParticipantPropsCreate,
    Trip,
    TripPropsCreate,
} from '@domain/entities';

export class TripMapper {
    static toDomain(
        createdTrip: PrismaTrip & {
            participants: PrismaParticipant[];
            activities: PrimsaActivity[];
            links: PrismaLink[];
        }
    ): Either<ValidationError<ParticipantProps>[] | ValidationError<TripPropsCreate>[], Trip> {
        const { id, destination, starts_at, ends_at, activities, created_at, is_confirmed, links, participants } =
            createdTrip;

        const ownerRegistered = createdTrip.participants.find(participant => participant.is_owner);

        const tripResult = Trip.create(
            {
                destination,
                startsAt: starts_at,
                endsAt: ends_at,
                owner: Participant.create(
                    {
                        email: ownerRegistered!!.email,
                        name: ownerRegistered!!.name,
                    },
                    undefined,
                    ownerRegistered?.id,
                    ownerRegistered?.is_confirmed
                ).value as Participant,
                activities: activities.map(
                    activity =>
                        Activity.create(
                            {
                                occursAt: activity.occurs_at,
                                title: activity.title,
                            },
                            undefined,
                            activity.id
                        ).value as Activity
                ),
                links: links.map(
                    link =>
                        Link.create(
                            {
                                title: link.title,
                                url: link.url,
                            },
                            undefined,
                            link.id
                        ).value as Link
                ),
                participants: participants.map(
                    participant =>
                        Participant.create(
                            {
                                email: participant.email,
                                name: participant.name,
                            },
                            undefined,
                            participant.id,
                            participant.is_confirmed
                        ).value as Participant
                ),
                createdAt: created_at,
            },
            undefined,
            id,
            is_confirmed
        );

        if (tripResult.isError()) {
            return error(tripResult.value);
        }

        const trip = tripResult.value;

        return success(trip);
    }

    static toDomainWithValidation(
        request: CreateTripRequestProps,
        participantValidator: Validator<ParticipantPropsCreate>,
        tripValidator: Validator<TripPropsCreate>
    ): Either<ValidationError<ParticipantProps>[] | ValidationError<TripPropsCreate>[], Trip> {
        const ownerResult = Participant.create(
            { name: request.owner_name, email: request.owner_email },
            participantValidator
        );

        if (ownerResult.isError()) {
            return error(ownerResult.value);
        }

        const owner = ownerResult.value;
        const participants: Participant[] = [];

        if (request.emails_to_invite) {
            for (const email of request.emails_to_invite) {
                const participantResult = Participant.create({ email }, participantValidator);
                if (participantResult.isError()) {
                    return error(participantResult.value);
                }
                participants.push(participantResult.value);
            }
        }

        const tripPropsCreate: TripPropsCreate = {
            destination: request.destination,
            startsAt: new Date(request.starts_at),
            endsAt: new Date(request.ends_at),
            owner: owner,
            participants: participants,
            activities: [],
            links: [],
            createdAt: new Date(),
        };

        const tripResult = Trip.create(tripPropsCreate, tripValidator);

        if (tripResult.isError()) {
            return error(tripResult.value);
        }

        const trip = tripResult.value;

        return success(trip);
    }

    static toPrisma(trip: Trip): PrismaTrip {
        return {
            id: trip.id,
            destination: trip.destination,
            starts_at: trip.startsAt,
            ends_at: trip.endsAt,
            is_confirmed: trip.isConfirmed,
            created_at: trip.createdAt,
        };
    }

    static toHttpResponse(trip: Trip): TripResponseProps {
        const { id, destination, startsAt, endsAt, owner, activities, links, participants } = trip;
        return {
            id,
            destination,
            starts_at: startsAt,
            ends_at: endsAt,
            owner: { id: owner.id, email: owner.email, name: owner.name },
            activities: activities.map(({ id, title, occursAt }) => ({ id, title, occurs_at: occursAt })),
            links: links.map(({ id, title, url }) => ({ id, title, url })),
            participants: participants.map(({ id, name, email, isConfirmed }) => ({ id, name, email, isConfirmed })),
            emails_to_invite: participants
                .filter(participant => participant.email !== owner.email)
                .map(participant => participant.email),
        };
    }
}
