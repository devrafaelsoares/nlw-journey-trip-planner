'use client';

import { CreateLinkSchema } from './schema';
import { Button } from '@components/ui/button';
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
import { toast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@lib/utils';
import { createLink } from '@services/link';
import { TripResponseProps } from '@services/trip';
import { Link, LoaderCircle, Plus, Tag } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateLinkForm = z.infer<typeof CreateLinkSchema>;

type CreateLinkProps = {
    trip: TripResponseProps;
};

export default function CreateLinkModal({ trip }: CreateLinkProps) {
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<CreateLinkForm>({
        resolver: zodResolver(CreateLinkSchema),
        defaultValues: {
            title: '',
            url: '',
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

    async function onSubmit(data: CreateLinkForm) {
        try {
            setIsLoading(true);

            await createLink(data, trip.id);

            setIsLoading(false);
            toast({
                title: 'Link adicionado com sucesso',
                description: 'Seu link foi adicionado com sucesso',
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
    }

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="w-full" onClick={resetForm}>
                    <Plus />
                    <span>Adicionar link</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adicionar novo link</DialogTitle>
                    <DialogDescription>Adicione um link importante para a viagem</DialogDescription>
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
                                                    startIcon={Tag}
                                                    type="text"
                                                    placeholder="Título do link"
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
                            <div className="flex w-full items-center text-muted-foreground">
                                <FormField
                                    control={control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    startIcon={Link}
                                                    type="text"
                                                    placeholder="URL do link"
                                                    className={cn('dark:bg-zinc-900 dark:text-zinc-100 text-zinc-950', {
                                                        'border-red-600 focus:outline-none focus:ring focus:border-red-600':
                                                            !!errors.url,
                                                    })}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full text-zinc-100 dark:text-lime-950 bg-lime-700 hover:bg-lime-800 dark:bg-lime-400 dark:hover:bg-lime-500 flex items-center gap-1"
                                >
                                    <span>{isLoading ? 'Adicionando' : 'Adicionar'} link</span>
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
