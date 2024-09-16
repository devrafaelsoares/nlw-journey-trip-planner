import CreateLinkModal from './CreateLinkModal';
import { Links } from './Links';
import { TripResponseProps } from '@/services/trip';

type LinksSectionProps = {
    trip: TripResponseProps;
};

export function LinksSection({ trip }: LinksSectionProps) {
    const { links } = trip;
    return (
        <div className="pt-6">
            <h1 className="text-2xl">Links importantes</h1>
            <div className="h-[280px] overflow-y-scroll no-scrollbar my-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800 scrollbar-track-white dark:scrollbar-track-zinc-950 px-1">
                {!!links.length ? (
                    <Links links={links} trip={trip} />
                ) : (
                    <div className="py-6">
                        <div className="p-4 rounded-lg text-center md:text-start bg-secondary">
                            <span>Nenhum link registrado</span>
                        </div>
                    </div>
                )}
            </div>
            <CreateLinkModal trip={trip} />
        </div>
    );
}
