import { addHours, eachDayOfInterval, format, isAfter, isBefore, setHours, setMinutes, setSeconds } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface DayInfo {
    day: Date;
    weekday: string;
}

interface MonthInfo {
    month: string;
    days: DayInfo[];
}

export function getDaysGroupedByMonth(startDate: string | Date, endDate: string | Date): MonthInfo[] {
    const daysArray = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate),
    });
    const groupedByMonth: Record<string, DayInfo[]> = {};

    daysArray.forEach(day => {
        const month = format(day, 'MMMM', { locale: ptBR });
        const dayOfWeek = format(day, 'EEEE', { locale: ptBR });

        if (!groupedByMonth[month]) {
            groupedByMonth[month] = [];
        }

        groupedByMonth[month].push({ day, weekday: dayOfWeek });
    });

    return Object.entries(groupedByMonth).map(([month, days]) => ({
        month,
        days,
    }));
}

export function isAfterHour(date: number, hour: number) {
    const targetDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
    return isAfter(date, targetDate);
}

export function isBeforeHour(date: number, hour: number) {
    const targetDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
    return isBefore(date, targetDate);
}

export function formatDate(date: Date): string {
    return format(date, 'dd/MM/yyyy');
}
