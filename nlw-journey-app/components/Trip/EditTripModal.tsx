'use client';

import { EditTripSchema } from './schema';
import { CalendarPreview } from '@components/Calendar';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { toast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@lib/utils';
import { TripResponseProps, updateTrip } from '@services/trip';
import { add, isAfter, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, LoaderCircle, MapIcon, Settings2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type EditTripModalProps = {
    trip: TripResponseProps;
};

type EditTripForm = z.infer<typeof EditTripSchema>;

export default function EditTripModal({ trip }: EditTripModalProps) {
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const currentDate = new Date();
    const form = useForm<EditTripForm>({
        resolver: zodResolver(EditTripSchema),
        defaultValues: {
            destination: trip.destination,
            travelDate: {
                from: new Date(trip.starts_at),
                to: new Date(trip.ends_at),
            },
        },
    });

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = form;

    const resetForm = () => {
        form.reset();
    };

    async function onSubmit(data: EditTripForm) {
        if (
            data.destination === trip.destination &&
            isSameDay(data.travelDate.from!, new Date(trip.starts_at)) &&
            isSameDay(data.travelDate.to!, new Date(trip.ends_at))
        ) {
            toast({
                description: 'Nenhuma alteração realizada',
                variant: 'default',
            });
            setOpenModal(false);
            return;
        }

        try {
            setIsLoading(true);

            await updateTrip(
                {
                    destination: data.destination,
                    ends_at: data.travelDate.to?.toISOString(),
                    starts_at: data.travelDate.from?.toISOString(),
                },
                trip.id
            );

            form.reset();
            setIsLoading(false);

            toast({
                title: 'Viagem atualizada com sucesso',
                description: 'Sua viagem foi atualizada com sucesso',
                variant: 'success',
            });
        } catch (error) {
            if (error instanceof Error) {
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
            setOpenModal(false);
        }
    }

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button
                    disabled={isAfter(currentDate, new Date(trip.starts_at))}
                    variant="secondary"
                    className="flex gap-2 items-center"
                    onClick={resetForm}
                >
                    <span>Alterar local/data</span>
                    <Settings2 size={18} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar local/data da viagem</DialogTitle>
                    <DialogDescription>Edite o local ou a data da viagem</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4 w-full">
                    <Form {...form}>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex w-full items-center text-muted-foreground">
                                <FormField
                                    control={control}
                                    name="destination"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    startIcon={MapIcon}
                                                    type="text"
                                                    placeholder="Para onde você vai?"
                                                    className={cn('dark:bg-zinc-900 dark:text-zinc-100 text-zinc-950', {
                                                        'border-red-600 focus:outline-none focus:ring focus:border-red-600':
                                                            !!errors.destination,
                                                    })}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="items-center gap-4 w-full">
                                <FormField
                                    control={control}
                                    name="travelDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild className="dark:bg-zinc-900">
                                                        <Button
                                                            id="date"
                                                            variant={'outline'}
                                                            disabled={isLoading}
                                                            className={cn(
                                                                'w-full justify-start text-left font-normal',
                                                                !field.value?.to && 'text-muted-foreground',
                                                                !!errors.travelDate && 'border-red-600'
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            <CalendarPreview
                                                                date={{ from: field.value?.from, to: field.value?.to }}
                                                            />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className="w-auto p-0"
                                                        align="center"
                                                        sideOffset={-300}
                                                    >
                                                        <Calendar
                                                            disabled={{ before: add(new Date(), { days: 1 }) }}
                                                            locale={ptBR}
                                                            mode="range"
                                                            defaultMonth={field.value?.from}
                                                            selected={{ from: field.value?.from, to: field.value?.to }}
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
                            </div>
                            <DialogFooter className="pt-4">
                                <Button
                                    type="submit"
                                    className="w-full text-zinc-100 dark:text-lime-950 bg-lime-700 hover:bg-lime-800 dark:bg-lime-400 dark:hover:bg-lime-500 flex items-center gap-1"
                                >
                                    <span>{isLoading ? 'Editando' : 'Editar'} viagem</span>
                                    {isLoading && <LoaderCircle className="animate-spin" size={20} />}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
