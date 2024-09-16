'use client';

import { CreateActivitySchema } from './schema';
import { createActivity } from '@/services/activity';
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
import { TimeInput } from '@components/ui/time-input';
import { toast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@lib/utils';
import { isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, LoaderCircle, Plus, TagIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ActivitySectionHeaderProps = {
    startAt: Date;
    endsAt: Date;
    tripId: string;
};

type CreateActivityForm = z.infer<typeof CreateActivitySchema>;

export function ActivitySectionHeader({ startAt, endsAt, tripId }: ActivitySectionHeaderProps) {
    const currentDate = new Date();
    const currentDateIsBeforeStartAtDate = isBefore(currentDate, startAt);
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const form = useForm<CreateActivityForm>({
        resolver: zodResolver(CreateActivitySchema),
        defaultValues: {
            title: '',
            occurs_at: currentDateIsBeforeStartAtDate ? startAt : currentDate,
        },
    });

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = form;

    const resetForm = () => {
        form.reset();
    };

    const onSubmit = async (data: CreateActivityForm) => {
        const { title, occurs_at } = data;

        try {
            setIsLoading(true);

            await createActivity({ title, occurs_at: occurs_at.toISOString() }, tripId);

            setIsLoading(false);
            toast({
                title: 'Atividade registrada com sucesso',
                description: 'Sua atividade foi registrada com sucesso',
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
            setOpenModal(false);
            console.error(error);
        } finally {
            setOpenModal(false);
        }
    };

    return (
        <header>
            <div className="flex flex-col gap-4 py-2 md:flex-row md:gap-0 items-center justify-between">
                <h1 className="text-3xl">Atividades</h1>
                <Dialog open={openModal} onOpenChange={setOpenModal}>
                    <DialogTrigger asChild>
                        <Button
                            className="bg-lime-700 hover:bg-lime-800 dark:bg-lime-400 dark:hover:bg-lime-500"
                            onClick={resetForm}
                        >
                            <Plus />
                            <span>Adicionar atividade</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Adicionar nova atividade</DialogTitle>
                            <DialogDescription>Todos convidados podem visualizar as atividades.</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4 py-4 w-full">
                            <Form {...form}>
                                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex w-full items-center text-muted-foreground">
                                        <FormField
                                            control={control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormControl>
                                                        <Input
                                                            disabled={isLoading}
                                                            startIcon={TagIcon}
                                                            type="text"
                                                            placeholder="Qual será sua atividade"
                                                            className={cn(
                                                                'dark:bg-zinc-900 dark:text-zinc-100 text-zinc-950',
                                                                {
                                                                    'border-red-600 focus:outline-none focus:ring focus:border-red-600':
                                                                        !!errors.title,
                                                                }
                                                            )}
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
                                                            <PopoverTrigger
                                                                asChild
                                                                className="dark:bg-zinc-900 dark:text-zinc-100 text-zinc-950"
                                                            >
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
                                                                    <CalendarPreview
                                                                        locale={ptBR}
                                                                        date={{ from: field.value }}
                                                                    />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent
                                                                className="w-auto p-0"
                                                                align="center"
                                                                sideOffset={-300}
                                                            >
                                                                <Calendar
                                                                    locale={ptBR}
                                                                    disabled={{
                                                                        before: currentDateIsBeforeStartAtDate
                                                                            ? startAt
                                                                            : currentDate,
                                                                        after: endsAt,
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
                                        <TimeInput
                                            disabled={isLoading}
                                            form={form}
                                            name="occurs_at_hours"
                                            placeholder="Horário"
                                        />
                                    </div>
                                    <DialogFooter className="pt-4">
                                        <Button
                                            type="submit"
                                            className="w-full text-zinc-100 dark:text-lime-950 bg-lime-700 hover:bg-lime-800 dark:bg-lime-400 dark:hover:bg-lime-500 flex items-center gap-1"
                                            disabled={isLoading}
                                        >
                                            <span>{isLoading ? 'Criando...' : 'Criar'} atividade</span>
                                            {isLoading && <LoaderCircle className="animate-spin" size={20} />}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    );
}
