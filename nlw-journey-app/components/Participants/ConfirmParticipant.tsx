'use client';

import { toast } from '../ui/use-toast';
import { TripConfirmationParticipantSchema } from '@/app/trips/[id]/participants/[participantId]/confirm/schema';
import { cn } from '@/lib/utils';
import { confirmParticipant, TripResponseProps } from '@/services/trip';
import { Button } from '@components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TripConfirmationParticipantForm = z.infer<typeof TripConfirmationParticipantSchema>;

type ConfirmationParticipantProps = {
    trip: TripResponseProps;
    participantId: string;
};
export function ConfirmationParticipant({ trip, participantId }: ConfirmationParticipantProps) {
    const participant = trip.participants.find(participant => participant.id === participantId);
    const router = useRouter();
    const form = useForm<TripConfirmationParticipantForm>({
        resolver: zodResolver(TripConfirmationParticipantSchema),
        defaultValues: {
            email: participant?.email,
            name: '',
        },
    });
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = form;

    const onSubmit = async (data: TripConfirmationParticipantForm) => {
        try {
            setIsLoading(true);
            await confirmParticipant(trip.id, participantId, data.name);
            setIsLoading(false);
            toast({
                title: 'Presença confirmada na viagem',
                description: 'Você confirmou a sua presença na viajem com sucesso',
                variant: 'success',
            });
            router.push(`/trips/${trip.id}`);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                if (error.name === 'AbortError' || error.name === 'TypeError') {
                    toast({
                        title: 'Erro no envio do convite',
                        description: 'Serviço indisponível no momento, tente novamente mais tarde',
                        variant: 'destructive',
                    });
                }
            }
            setIsLoading(false);
            console.error(error);
        }
    };
    return (
        <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row w-full gap-8 md:gap-4 items-center mb-3 text-muted-foreground">
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full relative">
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        startIcon={Mail}
                                        type="text"
                                        placeholder="Nome"
                                        className={cn('dark:bg-zinc-900 dark:text-zinc-100', {
                                            'border-red-600 focus:outline-none focus:ring focus:border-red-600':
                                                !!errors.name,
                                        })}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="absolute top-9" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full opacity-75">
                                <FormControl>
                                    <Input
                                        disabled={true}
                                        startIcon={Mail}
                                        type="text"
                                        placeholder="Email"
                                        className={cn('dark:bg-zinc-900 dark:text-zinc-100', {
                                            'border-red-600 focus:outline-none focus:ring focus:border-red-600':
                                                !!errors.email,
                                        })}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-zinc-100 dark:text-lime-950 bg-lime-600 hover:bg-lime-700 dark:bg-lime-400 dark:hover:bg-lime-500 flex items-center gap-1"
                >
                    <span>{isLoading ? 'Confirmando' : 'Confirmar'} participação</span>
                    {isLoading && <LoaderCircle className="animate-spin" size={20} />}
                </Button>
            </form>
        </Form>
    );
}
