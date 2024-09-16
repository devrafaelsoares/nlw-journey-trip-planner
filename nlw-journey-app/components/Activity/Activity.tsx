'use client';

import { toast } from '../ui/use-toast';
import EditActivityFormModal from './components/EditActivityFormModal';
import { cn } from '@/lib/utils';
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
import { DayInfo, isAfterHour } from '@helpers';
import { ActivityResponseProps, deleteActivity } from '@services/activity';
import { format, isBefore, isSameDay } from 'date-fns';
import { CircleCheck, CircleDashed, LoaderCircle } from 'lucide-react';
import { Fragment, useState } from 'react';

type ActivityProps = {
    activities: ActivityResponseProps[];
    dayMonthInfo: DayInfo;
    currentDate: Date;
    tripStatsAt: Date;
    tripEndsAt: Date;
    tripId: string;
};

export function Activity({ activities, dayMonthInfo, currentDate, tripId, tripEndsAt, tripStatsAt }: ActivityProps) {
    const [openActivityDeleteModal, setOpenActivityDeleteModal] = useState(false);
    const [openActivityEditModal, setOpenActivityEditModal] = useState(false);
    const [openActivityActionsModal, setOpenActivityActionsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<ActivityResponseProps | null>(null);

    const activeActivityDeleteConfirmationModal = () => {
        setOpenActivityActionsModal(false);
        setOpenActivityDeleteModal(true);
    };

    const activeActivityEditModal = () => {
        setOpenActivityActionsModal(false);
        setOpenActivityEditModal(true);
    };

    const activityDeleteConfimation = async (selectedActivity: ActivityResponseProps) => {
        setIsLoading(true);
        try {
            await deleteActivity(tripId, selectedActivity.id);
            setIsLoading(false);
            toast({
                title: 'Atividade cancelada com sucesso',
                description: 'Sua atividade foi cancelada com sucesso',
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
            setOpenActivityDeleteModal(false);
            setSelectedActivity(null);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {activities.map(activity => {
                const occursAt = new Date(activity.occurs_at);
                const currentTimeIsAfterActivityTime = isAfterHour(currentDate.getHours(), occursAt.getHours());
                const activityDateIsBeforeCurrentDate = isBefore(occursAt, currentDate);
                const activityDateIsSameDayCurrentDate = isSameDay(occursAt, currentDate);
                const activityAlreadyBeenCarriedOut =
                    (currentTimeIsAfterActivityTime && activityDateIsBeforeCurrentDate) ||
                    (activityDateIsBeforeCurrentDate && activityDateIsSameDayCurrentDate);

                const activityDateIsSameCurrentDate = occursAt.getDate() === dayMonthInfo.day.getDate();

                const dayMonthIsBeforeCurrentDay = isBefore(dayMonthInfo.day, currentDate);

                if (activityDateIsSameCurrentDate) {
                    return (
                        <Fragment key={activity.id}>
                            <Dialog modal={openActivityActionsModal} onOpenChange={setOpenActivityActionsModal}>
                                <DialogTrigger asChild>
                                    <Button
                                        disabled={activityAlreadyBeenCarriedOut}
                                        onClick={() => setSelectedActivity(activity)}
                                        className={cn(
                                            'flex justify-between items-center p-3 py-5 rounded-2xl',
                                            dayMonthIsBeforeCurrentDay ? 'text-zinc-500' : 'text-zinc-100'
                                        )}
                                        variant="outline"
                                    >
                                        <div
                                            className={cn(
                                                'flex items-center gap-2 text-zinc-100',
                                                activityDateIsBeforeCurrentDate && !activityDateIsSameDayCurrentDate
                                                    ? 'opacity-45'
                                                    : 'opacity-100'
                                            )}
                                        >
                                            {activityAlreadyBeenCarriedOut ? (
                                                <CircleCheck className="text-lime-700 dark:text-lime-300 size-5" />
                                            ) : (
                                                <CircleDashed className="text-zinc-950 dark:text-zinc-100" />
                                            )}
                                            <span className="text-zinc-950 dark:text-zinc-100">{activity.title}</span>
                                        </div>
                                        <span className="text-zinc-600 dark:text-zinc-400 text-xs">
                                            {format(occursAt, "HH:mm'h'")}
                                        </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Informações da atividade</DialogTitle>
                                    </DialogHeader>
                                    <div className="pt-3">
                                        <DialogDescription>
                                            Atividade: <b>{activity.title}</b>
                                        </DialogDescription>
                                        <DialogDescription>
                                            Data: <b>{format(occursAt, "dd/MM/yyyy 'às' HH:mm")}</b>
                                        </DialogDescription>
                                    </div>
                                    <DialogFooter className="gap-3 flex-col">
                                        <Button onClick={activeActivityEditModal} variant="secondary" type="submit">
                                            Editar Ativiadade
                                        </Button>
                                        <Button onClick={activeActivityDeleteConfirmationModal} variant="destructive">
                                            Cancelar atividade
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <EditActivityFormModal
                                activity={selectedActivity!}
                                currentDate={currentDate}
                                tripId={tripId}
                                tripStartAt={tripStatsAt}
                                openActivityEditModal={openActivityEditModal}
                                tripEndsAt={tripEndsAt}
                                setOpenActivityEditModal={setOpenActivityEditModal}
                            />

                            <Dialog open={openActivityDeleteModal} onOpenChange={setOpenActivityDeleteModal}>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Confirmação do cancelamento</DialogTitle>
                                        <DialogDescription>
                                            Você deseja mesmo cancelar essa atividade?
                                        </DialogDescription>
                                    </DialogHeader>

                                    <DialogFooter>
                                        <Button
                                            disabled={isLoading}
                                            onClick={() => activityDeleteConfimation(selectedActivity!)}
                                            className="flex items-center gap-1"
                                            variant="destructive"
                                        >
                                            {isLoading && <LoaderCircle className="animate-spin" size={20} />}
                                            <span>{isLoading ? 'Cancelando...' : 'Sim, desejo cancelar'}</span>
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </Fragment>
                    );
                }
            })}
        </div>
    );
}
