'use client';

import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { parse, format, isValid } from 'date-fns';
import { Clock } from 'lucide-react';
import { useReducer } from 'react';
import { UseFormReturn } from 'react-hook-form';

type TimeInputProps = {
    form: UseFormReturn<any>;
    name: string;
    placeholder: string;
    disabled: boolean;
};

export function TimeInput({ form, name, placeholder, disabled = false }: TimeInputProps) {
    const { errors } = form.formState;

    const initialValue = form.getValues()[name]
        ? isValid(form.getValues()[name])
            ? format(form.getValues()[name], 'HH:mm')
            : format(parse(form.getValues()[name], 'HH:mm', new Date()), 'HH:mm')
        : '';

    const [value, setValue] = useReducer((_: any, next: string) => {
        const cleanValue = next.replace(/\D/g, '');

        if (cleanValue.length <= 2) {
            return cleanValue;
        } else {
            const hours = cleanValue.slice(0, 2);
            const minutes = cleanValue.slice(2, 4);
            return `${hours}:${minutes}`;
        }
    }, initialValue);

    function handleChange(realChangeFn: Function, formattedValue: string) {
        const parsedTime = parse(formattedValue, 'HH:mm', new Date());
        if (formattedValue.length > 5) return;
        if (isValid(parsedTime)) {
            realChangeFn(formattedValue);
        } else {
            realChangeFn(null);
        }
    }

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                field.value = value;

                return (
                    <FormItem className="col-span-2 relative">
                        <FormControl className="bg-zinc-50 dark:bg-zinc-900">
                            <Input
                                disabled={disabled}
                                placeholder={placeholder}
                                type="text"
                                className={cn({
                                    'border-red-600 focus:outline-none focus:ring focus:border-red-600':
                                        !!errors.occurs_at_hours,
                                })}
                                {...field}
                                onChange={ev => {
                                    setValue(ev.target.value);
                                    handleChange(field.onChange, ev.target.value);
                                }}
                                value={value}
                                startIcon={Clock}
                            />
                        </FormControl>
                        {!!errors.occurs_at_hours && (
                            <FormMessage className="absolute top-9">
                                {String(errors.occurs_at_hours?.message)}
                            </FormMessage>
                        )}
                    </FormItem>
                );
            }}
        />
    );
}
