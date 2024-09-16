import { Logo } from '@/components/Logo';
import { ModeThemeToggle } from '@/components/ModeThemeToggle';
import { ConfirmationParticipant } from '@/components/Participants/ConfirmParticipant';
import { findByIdTrip } from '@/services/trip';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

type TripsConfirmationParticipantProps = {
    params: { id: string; participantId: string };
};

export default async function TripsConfirmationParticpant({
    params: { id, participantId },
}: TripsConfirmationParticipantProps) {
    const response = await findByIdTrip(id);

    if (response.statusCode === 404) {
        notFound();
    }

    const {
        data: { trip },
    } = response;

    const participant = trip.participants.find(participant => participant.id === participantId);

    if (participant?.isConfirmed) {
        redirect(`/trips/${id}`);
    }

    return (
        <div className="h-screen px-4 sm:px-0 bg-zinc-100 dark:bg-zinc-950  flex justify-center items-center">
            <main className="bg-nlw-journey bg-no-repeat bg-center w-[800px] h-[500px] flex items-center sm:relative">
                <ModeThemeToggle className="absolute top-3 right-3" />
                <section>
                    <div className="flex flex-col justify-center items-center gap-4 py-6">
                        <Logo />
                    </div>
                    <div className="flex flex-col items-center justify-center py-6">
                        <h1 className="font-extralight text-center text-2xl pb-8">
                            Informe seu nome para confirmar a sua presença na viagem
                        </h1>
                        <ConfirmationParticipant trip={trip} participantId={participantId} />
                    </div>
                    <div className="flex justify-center w-full py-4">
                        <span className="w-full sm:w-[70%] text-center text-sm dark:text-zinc-500">
                            Ao planejar sua viagem pela plann.er você automaticamente concorda com nossos {''}
                            <Link href="/terms-and-privacy#terms-of-use" scroll>
                                <u className="dark:text-zinc-300">termos de uso</u>
                            </Link>{' '}
                            e{' '}
                            <Link href="/terms-and-privacy#privacy-policies">
                                <u className="dark:text-zinc-300">políticas de privacidade</u>.
                            </Link>
                        </span>
                    </div>
                </section>
            </main>
        </div>
    );
}
