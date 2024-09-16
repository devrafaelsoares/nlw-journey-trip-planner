'use client';

import { UpdateLinkSchema } from '../schema';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { editLink } from '@/services/link';
import { LinkResponseProps, TripResponseProps } from '@/services/trip';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, LoaderCircle, Tag } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type UpdateLinkForm = z.infer<typeof UpdateLinkSchema>;

type EditLinkFormProps = {
    link: LinkResponseProps;
    trip: TripResponseProps;
    setOpenEditEditModal: Dispatch<SetStateAction<boolean>>;
};

export default function EditLinkForm({
    link: { id, title, url },
    trip: { id: tripId },
    setOpenEditEditModal,
}: EditLinkFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<UpdateLinkForm>({
        resolver: zodResolver(UpdateLinkSchema),
        defaultValues: {
            title,
            url,
        },
    });

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = form;

    const linkEditConfimation = async ({ title, url }: UpdateLinkForm) => {
        setIsLoading(true);
        editLink({ title, url }, id, tripId);
        try {
            setIsLoading(false);
            toast({
                title: 'Link editado com sucesso',
                description: 'Seu link foi editado com sucesso',
                variant: 'success',
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                if (error.name === 'AbortError' || error.name === 'TypeError') {
                    toast({
                        title: 'Erro na edição do link',
                        description: 'Serviço indisponível no momento, tente novamente mais tarde',
                        variant: 'destructive',
                    });
                }
            }
            setIsLoading(false);
            console.error(error);
        } finally {
            setOpenEditEditModal(false);
        }
    };

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(linkEditConfimation)}>
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
                        <span>{isLoading ? 'Editando' : 'Editar'} link</span>
                        {isLoading && <LoaderCircle className="animate-spin" size={20} />}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
