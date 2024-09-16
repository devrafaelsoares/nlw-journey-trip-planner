import { format, Locale } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react';
import { DateRange } from 'react-day-picker';

type DatePickerPreviewOptions = {
    date?: DateRange;
    locale?: Locale;
};

export function CalendarPreview({ date, locale = ptBR }: DatePickerPreviewOptions) {
    return (
        <React.Fragment>
            {date?.from ? (
                date.to ? (
                    <React.Fragment>
                        {format(date.from, 'LLL dd, y', { locale })} - {format(date.to, 'LLL dd, y', { locale })}
                    </React.Fragment>
                ) : (
                    format(date.from, 'LLL dd, y', { locale })
                )
            ) : (
                <span>Quando?</span>
            )}
        </React.Fragment>
    );
}
