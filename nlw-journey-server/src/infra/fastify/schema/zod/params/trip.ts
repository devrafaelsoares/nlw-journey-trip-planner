import { z } from 'zod';

const TripIdParamSchema = z.object({
    id: z.string().describe('Identificador único da viagem'),
});

const TripParticipantIdParamSchema = z.object({
    tripId: z.string().uuid().describe('Identificador único da viagem'),
    participantId: z.string().uuid().describe('Identificador único do usuário'),
});

export const UpdateTripParamsSchema = TripIdParamSchema;

export const FindByIdTripParamsSchema = TripIdParamSchema;

export const SendInviteTripParamsSchema = TripIdParamSchema;

export const AttendanceConfirmationTripParamsSchema = TripParticipantIdParamSchema;

export const InviteRefuseTripParamsSchema = TripParticipantIdParamSchema;

export const ConfirmationTripParamsSchema = TripIdParamSchema;

export const RefuseTripParamsSchema = TripIdParamSchema;
