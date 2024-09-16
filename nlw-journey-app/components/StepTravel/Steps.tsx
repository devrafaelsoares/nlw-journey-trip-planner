import { StepActions } from './StepActions';
import { TravelFormProps } from '@/app/page';
import { CalendarPreview } from '@/components/Calendar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PopoverContent } from '@/components/ui/popover';
import { useStepper } from '@/components/ui/stepper';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { createTrip } from '@/services/trip';
import { Dialog } from '@radix-ui/react-dialog';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { add, sub } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AtSign, CalendarIcon, LoaderCircle, Mail, MapIcon, Plus, User, UserRoundPlus, XIcon } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

type TravelInformationStepProps = {
    form: UseFormReturn<TravelFormProps>;
};

export function TravelInformationStep({ form }: TravelInformationStepProps) {
    const {
        control,
        formState: { errors },
    } = form;

    return (
        <React.Fragment>
            <div className="flex flex-col gap-4 sm:flex-row items-start justify-around bg-zinc-100 dark:bg-zinc-900 py-2 px-4 rounded-md">
                <div className="flex w-full items-center text-muted-foreground">
                    <FormField
                        control={control}
                        name="destination"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        startIcon={MapIcon}
                                        type="text"
                                        placeholder="Para onde você vai?"
                                        className={cn('dark:bg-zinc-900 dark:text-zinc-100', {
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
                <div className={cn('grid gap-2 w-full sm:w-[300px]')}>
                    <FormField
                        control={control}
                        name="travelDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild className="dark:bg-zinc-900 dark:text-white">
                                            <Button
                                                id="date"
                                                variant={'outline'}
                                                className={cn(
                                                    'w-full sm:w-[300px] justify-start text-left font-normal',
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
                                        <PopoverContent className="w-auto p-0" align="center" sideOffset={-300}>
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
            </div>
            <StepActions form={form} fields={['destination', 'travelDate']} />
        </React.Fragment>
    );
}

type TravelParticipantsStepProps = {
    form: UseFormReturn<TravelFormProps>;
};

export function TravelParticipantsStep({ form }: TravelParticipantsStepProps) {
    const {
        fields = [],
        append,
        remove,
    } = useFieldArray<TravelFormProps>({
        control: form.control,
        name: 'emailsToInvite',
    });

    const addParticipant = async () => {
        const isValid = await form.trigger(['email', 'emailsToInvite']);

        if (!isValid) return;

        append({ id: String(fields.length), email: form.getValues('email') });
        form.setValue('email', '');
    };

    return (
        <div className="p-2">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default" className="items-center gap-2">
                        <UserRoundPlus size="18" />
                        <span>Quem participará da viagem?</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Selecione os participantes da viagem</DialogTitle>
                        <DialogDescription>
                            Os convidados irão receber e-mails para confirmar a participação na viagem.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="gap-4 py-4 flex flex-wrap">
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-sm w-auto px-2"
                            >
                                <span className="text-sm text-zinc-950 dark:text-zinc-100">{field.email}</span>
                                <Button variant="secondary" className="h-1 px-0" onClick={() => remove(index)}>
                                    <XIcon size={16} />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email do participante</FormLabel>
                                    <FormControl>
                                        <div className="flex flex-col gap-3 sm:flex-row">
                                            <Input
                                                startIcon={AtSign}
                                                placeholder="Informe o email do participante"
                                                {...field}
                                            />
                                            <Button
                                                type="submit"
                                                className="bg-green-600 hover:bg-green-700 text-white gap-2"
                                                onClick={addParticipant}
                                            >
                                                <span>Convidar</span>
                                                <Plus size="18" />
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <StepActions condition={!fields.length} form={form} />
        </div>
    );
}

type TravelOwnerStepProps = {
    form: UseFormReturn<TravelFormProps>;
};

export function TravelOwnerStep({ form }: TravelOwnerStepProps) {
    const {
        formState: { errors },
    } = form;
    return (
        <React.Fragment>
            <div className="flex flex-col sm:flex-row p-2 gap-4 w-full items-center text-muted-foreground">
                <FormField
                    control={form.control}
                    name="ownerName"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    startIcon={User}
                                    type="text"
                                    placeholder="Nome completo"
                                    className={cn(
                                        'dark:bg-zinc-900 dark:text-zinc-100',
                                        !!errors.ownerName && 'border-red-600'
                                    )}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ownerEmail"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    startIcon={Mail}
                                    type="text"
                                    placeholder="Email"
                                    className={cn(
                                        'dark:bg-zinc-900 dark:text-zinc-100',
                                        !!errors.ownerEmail && 'border-red-600'
                                    )}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <StepActions form={form} fields={['ownerEmail', 'ownerName']} />
        </React.Fragment>
    );
}

type FinalStepProps = {
    form: UseFormReturn<TravelFormProps>;
    setShowStepper: Dispatch<SetStateAction<boolean>>;
};

export function FinalStep({ form, setShowStepper }: FinalStepProps) {
    const { hasCompletedAllSteps, resetSteps } = useStepper();
    const [isLoading, setIsLoading] = useState(false);
    const travel = form.getValues();
    const { toast } = useToast();

    if (!hasCompletedAllSteps) {
        return null;
    }

    async function registerTrip() {
        try {
            setIsLoading(true);

            const { destination, ownerEmail, ownerName, travelDate, emailsToInvite } = travel;

            await createTrip({
                destination,
                ends_at: travelDate.to?.toISOString(),
                owner_email: ownerEmail,
                owner_name: ownerName,
                starts_at: travelDate.from?.toISOString(),
                emails_to_invite: emailsToInvite?.map(emailInvite => emailInvite.email),
            });

            form.reset();
            resetSteps();
            setIsLoading(false);
            setShowStepper(false);

            toast({
                title: 'Viagem registrada com sucesso',
                description: 'Sua viagem foi registrada com sucesso',
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
        }
    }

    return (
        <React.Fragment>
            <div className="mt-3 p-4 bg-secondary rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Informações sobre a viagem ✈️</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="dark:bg-zinc-900 p-4 row-start-1 sm:col-start-1 rounded-md shadow-sm">
                        <h2 className="text-lg font-semibold mb-2 text-center sm:text-left">Detalhes do Organizador</h2>
                        <p className="text-sm">
                            <strong>Nome do Organizador:</strong> {travel.ownerName}
                        </p>
                        <p className="text-sm">
                            <strong>Email do Organizador:</strong> {travel.ownerEmail}
                        </p>
                    </div>
                    <div className="dark:bg-zinc-900 row-start-2 sm:row-start-1 sm:col-start-2 p-4 rounded-md shadow-sm">
                        <h2 className="text-lg font-semibold mb-2 text-center sm:text-left">Detalhes da Viagem</h2>
                        <p className="text-sm">
                            <strong>Local:</strong> {travel.destination}
                        </p>
                        <p className="text-sm">
                            <strong>Data:</strong>{' '}
                            {travel.travelDate
                                ? `${travel.travelDate.from?.toLocaleDateString()} - ${travel.travelDate.to?.toLocaleDateString()}`
                                : 'Não especificada'}
                        </p>
                    </div>
                    {!!travel.emailsToInvite?.length && (
                        <div className="dark:bg-zinc-900 row-start-3 sm:row-start-2 sm:col-span-2 p-4 rounded-md shadow-sm">
                            <h2 className="text-lg font-semibold mb-2 text-center sm:text-left">Participantes</h2>
                            <ul className="list-disc list-inside">
                                {travel.emailsToInvite?.map((participant: { email: string }, index: number) => (
                                    <li key={index} className="text-sm">
                                        {participant.email}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="w-full flex justify-end gap-2 mt-4">
                    <Button
                        disabled={isLoading}
                        size="sm"
                        type="button"
                        className="flex items-center gap-2"
                        onClick={registerTrip}
                    >
                        <span>{isLoading ? 'Registrando' : 'Registrar'}</span>
                        {isLoading && <LoaderCircle className="animate-spin" size={20} />}
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
}
