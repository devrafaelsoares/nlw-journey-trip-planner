import { z } from 'zod';

export const InviteParticipantSchema = z.object({
    emainInvite: z.string().email('Email inválido').min(1, 'O email do participante é obrgatório'),
});
