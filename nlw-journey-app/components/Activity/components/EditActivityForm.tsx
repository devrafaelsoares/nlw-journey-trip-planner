'use client';

import { CalendarPreview } from '@/components/Calendar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TimeInput } from '@/components/ui/time-input';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { ActivityResponseProps, editActivity } from '@/services/activity';
import { EditActivitySchema } from '@components/Activity/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, LoaderCircle, TagsIcon } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type EditActivityForm = z.infer<typeof EditActivitySchema>;

type EditActivityFormProps = {
    currentDate: Date;
    activity: ActivityResponseProps;
    tripId: string;
    tripStartAt: Date;
    tripEndsAt: Date;
    setOpenActivityEditModal: Dispatch<SetStateAction<boolean>>;
};

export default function EditActivityForm({
    activity: { id, occurs_at, title },
    currentDate,
    tripId,
    tripEndsAt,
    tripStartAt,
    setOpenActivityEditModal,
}: EditActivityFormProps) {
    const activityOccursAt = new Date(occurs_at);
    const currentDateIsBeforeStartAtDate = isBefore(currentDate, tripStartAt);

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<EditActivityForm>({
        resolver: zodResolver(EditActivitySchema),
        defaultValues: {
            title,
            occurs_at: activityOccursAt,
            occurs_at_hours: format(activityOccursAt, 'HH:mm'),
        },
    });

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = form;

    const activityEditConfimation = async ({ title, occurs_at }: EditActivityForm) => {
        setIsLoading(true);
        try {
            await editActivity({ title, occurs_at: occurs_at.toISOString() }, id, tripId);
            setIsLoading(false);
            toast({
                title: 'Atividade editada com sucesso',
                description: 'Sua atividade foi editada com sucesso',
                variant: 'success',
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                if (error.name === 'AbortError' || error.name === 'TypeError') {
                    toast({
                        title: 'Erro no registro da viagem',
                        description: 'Serviço indisponível no momento, tente novamente mais tarde',
                        variant: 'destructive',
                    });
                }
            }
            setIsLoading(false);
            console.error(error);
        } finally {
            setOpenActivityEditModal(false);
        }
    };

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(activityEditConfimation)}>
                <div className="flex w-full items-center text-muted-foreground">
                    <FormField
                        control={control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        startIcon={TagsIcon}
                                        type="text"
                                        placeholder="Qual será sua atividade"
                                        className={cn('dark:bg-zinc-900 dark:text-zinc-100 text-zinc-950', {
                                            'border-red-600 focus:outline-none focus:ring focus:border-red-600':
                                                !!errors.title,
                                        })}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-5 items-center gap-4 w-full">
                    <FormField
                        control={control}
                        name="occurs_at"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="date"
                                                variant={'outline'}
                                                disabled={isLoading}
                                                className={cn(
                                                    'justify-start w-full text-left font-normal',
                                                    !field.value && 'text-muted-foreground',
                                                    !!errors.occurs_at && 'border-red-600'
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                <CalendarPreview locale={ptBR} date={{ from: field.value }} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="center" sideOffset={-300}>
                                            <Calendar
                                                locale={ptBR}
                                                disabled={{
                                                    before: currentDateIsBeforeStartAtDate ? tripStartAt : currentDate,
                                                    after: tripEndsAt,
                                                }}
                                                mode="single"
                                                defaultMonth={field.value}
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                numberOfMonths={2}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <TimeInput disabled={isLoading} form={form} name="occurs_at_hours" placeholder="Horário" />
                </div>
                <DialogFooter className="pt-4">
                    <Button
                        type="submit"
                        className="w-full text-zinc-100 dark:text-lime-950 bg-lime-700 hover:bg-lime-800 dark:bg-lime-400 dark:hover:bg-lime-500 flex items-center gap-1"
                        disabled={isLoading}
                    >
                        <span>{isLoading ? 'Editando...' : 'Editar'} atividade</span>
                        {isLoading && <LoaderCircle className="animate-spin" size={20} />}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
