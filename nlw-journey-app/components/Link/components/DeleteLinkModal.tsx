import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { deleteLink } from '@/services/link';
import { LinkResponseProps, TripResponseProps } from '@/services/trip';
import { LoaderCircle } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';

type DeleteLinkModalProps = {
    link: LinkResponseProps;
    trip: TripResponseProps;
    openLinkDeleteModal: boolean;
    setOpenLinkDeleteModal: Dispatch<SetStateAction<boolean>>;
};
export default function DeleteLinkModal({
    link,
    trip: { id: tripId },
    openLinkDeleteModal,
    setOpenLinkDeleteModal,
}: DeleteLinkModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const linkDeleteConfimation = async (selectedLink: LinkResponseProps) => {
        setIsLoading(true);
        try {
            await deleteLink(tripId, selectedLink.id);
            setIsLoading(false);
            toast({
                title: 'Link deletado com sucesso',
                description: 'Seu link foi deletado com sucesso',
                variant: 'success',
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                if (error.name === 'AbortError' || error.name === 'TypeError') {
                    toast({
                        title: 'Erro na exclusão do link',
                        description: 'Serviço indisponível no momento, tente novamente mais tarde',
                        variant: 'destructive',
                    });
                }
            }
            setIsLoading(false);
            console.error(error);
        } finally {
            setOpenLinkDeleteModal(false);
        }
    };

    return (
        <Dialog open={openLinkDeleteModal} onOpenChange={setOpenLinkDeleteModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmação de exclusão</DialogTitle>
                    <DialogDescription>Você deseja mesmo excluir esse link?</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        disabled={isLoading}
                        onClick={() => linkDeleteConfimation(link)}
                        className="flex items-center gap-1"
                        variant="destructive"
                    >
                        {isLoading && <LoaderCircle className="animate-spin" size={20} />}
                        <span>{isLoading ? 'Excluindo...' : 'Sim, desejo excluir'}</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
