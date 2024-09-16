import { z } from 'zod';

export const EditTripSchema = z
    .object({
        travelDate: z.object(
            {
                from: z.date().optional(),
                to: z.date().optional(),
            },
            { required_error: 'Data da viagem é obrigatória' }
        ),
        destination: z.string().min(1, 'O local da viagem é obrigatório'),
    })
    .refine(data => !!data.travelDate.to, {
        path: ['travelDate'],
        message: 'Data de término é obrigatória',
    });
