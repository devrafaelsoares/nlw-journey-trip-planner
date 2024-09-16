import { Logo } from '@/components/Logo';
import { ModeThemeToggle } from '@/components/ModeThemeToggle';
import { ActivitySection } from '@components/Activity';
import { ActivitySectionHeader } from '@components/Activity/ActivitySectionHeader';
import { LinksSection } from '@components/Link';
import { ParticipantsSection } from '@components/Participants';
import EditTripModal from '@components/Trip/EditTripModal';
import { Separator } from '@components/ui/separator';
import { formatDate } from '@helpers';
import { findByIdTrip } from '@services/trip';
import { Calendar, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';

type TripsParamsProps = {
    params: { id: string };
};

export default async function Trips({ params: { id } }: TripsParamsProps) {
    const response = await findByIdTrip(id);
    if (response.statusCode === 400 || response.statusCode === 500) {
        throw new Error(JSON.stringify(response));
    }
    if (response.statusCode === 404) {
        notFound();
    }

    const {
        data: { trip },
    } = response;

    const tripStartsAt = new Date(trip.starts_at);
    const tripEndsAt = new Date(trip.ends_at);

    return (
        <div className="flex justify-center p-5">
            <main className="w-[1000px] grid grid-row-2 justify-between items-center dark:bg-zinc-950">
                <div className="grid col-span-2 justify-center pt-2 pb-6">
                    <Logo />
                </div>
                <section className="w-full col-span-2 dark:bg-zinc-950 md:dark:bg-zinc-900 gap-4 md:gap-0 p-3 rounded-md flex flex-col md:flex-row md:justify-between items-center">
                    <div className="w-60 sm:w-full flex flex-col md:flex-row md:justify-between px-2 sm:px-0 gap-6 md:items-center">
                        <div className="flex justify-center md:justify-start items-center gap-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="size-5" />
                                <span className="text-sm">{trip.destination}</span>
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-start gap-2 items-center">
                            <div className="flex gap-2 items-center">
                                <Calendar />
                                <span className="text-sm">
                                    {formatDate(tripStartsAt)} - {formatDate(tripEndsAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Separator orientation="vertical" className="h-10 hidden md:block md:mx-4" />
                    <div className="flex items-center gap-2">
                        <EditTripModal trip={trip} />
                        <ModeThemeToggle />
                    </div>
                </section>
                <section className="grid col-span-2 py-4 grid-cols-1 md:grid-cols-2">
                    <article className="p-3 col-span-1 self-start">
                        <ActivitySectionHeader startAt={tripStartsAt} endsAt={tripEndsAt} tripId={trip.id} />
                        <ActivitySection trip={trip} />
                    </article>
                    <aside className="p-3 self-start">
                        <LinksSection trip={trip} />
                        <Separator className="my-6" />
                        <ParticipantsSection trip={trip} emailsToInvite={trip.emails_to_invite} />
                    </aside>
                </section>
            </main>
        </div>
    );
}
