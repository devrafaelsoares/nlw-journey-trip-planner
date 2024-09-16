import { isAfter, isBefore, isDate, isSameDay } from 'date-fns';
import { z } from 'zod';

const ActivitySchema = z
    .object({
        title: z.string().min(1, 'Título obrigatório'),
        occurs_at: z.date(),
        occurs_at_hours: z
            .string({ required_error: 'Horário obrigatório' })
            .nullable()
            .refine(data => data !== null, 'Horário inválido'),
    })

    .transform(data => {
        const [hours, minutes] = data.occurs_at_hours.split(':').map(Number);
        const currentTime = new Date();
        currentTime.setHours(hours);
        currentTime.setMinutes(minutes);
        currentTime.setSeconds(0);

        data.occurs_at.setDate(data.occurs_at.getDate());
        data.occurs_at.setHours(currentTime.getHours());
        data.occurs_at.setMinutes(currentTime.getMinutes());
        data.occurs_at.setSeconds(0);
        return data;
    })
    .refine(
        data => {
            if (!data) return;
            if (!data.occurs_at_hours) return;

            const [hours, minutes] = data.occurs_at_hours.split(':').map(Number);
            const currentTime = new Date();
            currentTime.setHours(hours);
            currentTime.setMinutes(minutes);
            currentTime.setSeconds(0);

            const currentDate = new Date();
            return isDate(currentTime) && isSameDay(currentDate, data.occurs_at)
                ? !isBefore(currentTime.getTime(), currentDate.getTime())
                : isAfter(currentTime, currentDate) || isBefore(currentTime, currentDate);
        },
        { path: ['occurs_at_hours'], message: 'Horário passado' }
    );

export const CreateActivitySchema = ActivitySchema;
export const EditActivitySchema = ActivitySchema;
