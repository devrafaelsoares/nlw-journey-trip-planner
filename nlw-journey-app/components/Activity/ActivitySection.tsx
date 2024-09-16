'use client';

import { Activity } from './Activity';
import { cn } from '@/lib/utils';
import { TripResponseProps } from '@/services/trip';
import { getDaysGroupedByMonth } from '@helpers';
import { isSameDay } from 'date-fns';
import { Fragment, useEffect, useRef } from 'react';

type ActvitySectionProps = {
    trip: TripResponseProps;
};

export function ActivitySection({ trip: { id, starts_at, ends_at, activities } }: ActvitySectionProps) {
    const daysGroupedByMonth = getDaysGroupedByMonth(starts_at, ends_at);

    const currentDate = new Date();

    const scrollContainerRef = useRef(null);
    const todayRef = useRef<HTMLDivElement>(null);

    const activitiesSorted = activities.sort(
        (date1, date2) => new Date(date1.occurs_at).getTime() - new Date(date2.occurs_at).getTime()
    );

    useEffect(() => {
        if (todayRef.current && scrollContainerRef.current) {
            const isMobile = window.innerWidth <= 768;
            const offset = isMobile ? 130 : 185;

            scrollContainerRef.current.scrollTo({
                top: todayRef.current.offsetTop - offset,
                behavior: 'smooth',
            });
        }
    }, []);

    return (
        <div
            ref={scrollContainerRef}
            className="flex flex-col gap-5 overflow-y-scroll h-[685px] px-2 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800 scrollbar-track-white dark:scrollbar-track-zinc-950"
        >
            {!!activities.length ? (
                <div className="py-5 flex flex-col gap-5">
                    {daysGroupedByMonth.map((date, index) => (
                        <div className="flex flex-col gap-4" key={index}>
                            <h2 className="text-2xl capitalize text-zinc-400">{date.month}</h2>
                            {date.days.map((dayData, index) => {
                                const isSameActivityDay = isSameDay(dayData.day, currentDate);
                                return (
                                    <Fragment key={index}>
                                        <div
                                            ref={isSameActivityDay ? todayRef : null}
                                            className={cn(
                                                'flex items-center gap-3',
                                                isSameActivityDay ? 'text-zinc-100' : 'text-zinc-500'
                                            )}
                                        >
                                            <span className="font-bold text-lg text-zink-300 stroke-zinc-300">{`Dia ${dayData.day.getDate()}`}</span>
                                            <span className="text-sm text-zinc-500 capitalize">{dayData.weekday}</span>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <Activity
                                                activities={activitiesSorted}
                                                dayMonthInfo={dayData}
                                                currentDate={currentDate}
                                                tripId={id}
                                                tripStatsAt={new Date(starts_at)}
                                                tripEndsAt={new Date(ends_at)}
                                            />
                                            {!activitiesSorted
                                                .map(activity => new Date(activity.occurs_at))
                                                .find(date => date.getDate() === dayData.day.getDate()) && (
                                                <span className="text-sm text-zinc-500">
                                                    Nenhuma atividade cadastrada nessa data.
                                                </span>
                                            )}
                                        </div>
                                    </Fragment>
                                );
                            })}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-6">
                    <div className="p-4 rounded-lg text-center md:text-start bg-secondary">
                        <span>Nenhuma atividade registrada</span>
                    </div>
                </div>
            )}
        </div>
    );
}
