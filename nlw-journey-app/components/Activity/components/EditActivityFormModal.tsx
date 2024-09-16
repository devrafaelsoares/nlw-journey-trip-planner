'use client';

import EditActivityForm from './EditActivityForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ActivityResponseProps } from '@/services/activity';
import React, { Dispatch, SetStateAction } from 'react';

type EditActivityFormModalProps = {
    currentDate: Date;
    activity: ActivityResponseProps;
    tripId: string;
    tripStartAt: Date;
    tripEndsAt: Date;
    openActivityEditModal: boolean;
    setOpenActivityEditModal: Dispatch<SetStateAction<boolean>>;
};
export default function EditActivityFormModal({
    activity,
    currentDate,
    openActivityEditModal,
    setOpenActivityEditModal,
    tripEndsAt,
    tripId,
    tripStartAt,
}: EditActivityFormModalProps) {
    return (
        <Dialog open={openActivityEditModal} onOpenChange={setOpenActivityEditModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edição da atividade</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4 w-full">
                    <EditActivityForm
                        activity={activity}
                        currentDate={currentDate}
                        tripId={tripId}
                        tripStartAt={tripStartAt}
                        tripEndsAt={tripEndsAt}
                        setOpenActivityEditModal={setOpenActivityEditModal}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
