'use client';

import EditLinkForm from './EditLinkForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LinkResponseProps, TripResponseProps } from '@/services/trip';
import React, { Dispatch, SetStateAction } from 'react';

type EditLinkFormModalProps = {
    link: LinkResponseProps;
    trip: TripResponseProps;
    openLinkEditModal: boolean;
    setOpenLinkEditModal: Dispatch<SetStateAction<boolean>>;
};
export default function EditLinkFormModal({
    link,
    trip,
    openLinkEditModal,
    setOpenLinkEditModal,
}: EditLinkFormModalProps) {
    return (
        <Dialog open={openLinkEditModal} onOpenChange={setOpenLinkEditModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edição do link</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4 w-full">
                    <EditLinkForm link={link} trip={trip} setOpenEditEditModal={setOpenLinkEditModal} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
