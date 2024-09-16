'use client';

import { Logo } from '@/components/Logo';
import { toast } from '@/components/ui/use-toast';
import { refuseTrip } from '@/services/trip';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type TripRefuseParamsProps = {
    params: { id: string };
};

export default function TripRefuse({ params: { id } }: TripRefuseParamsProps) {
    const router = useRouter();
    const [refused, setRefused] = useState(false);
    const [isRefused, setIsRefused] = useState(false);

    useEffect(() => {
        if (!id) {
            toast({ description: 'ID não fornecido', variant: 'destructive' });
            return;
        }

        const confirm = async () => {
            try {
                const response = await refuseTrip(id);
                if (response.statusCode === 404) {
                    setIsRefused(true);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    router.push('/');
                } else {
                    setRefused(true);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    toast({ description: 'Viagem cancelada com sucesso', variant: 'success' });
                }
            } catch (error) {
                await new Promise(resolve => setTimeout(resolve, 3000));
                console.error('Erro ao confirmar:', { error });
            } finally {
                setIsRefused(false);
            }
        };

        confirm();
    }, [id, router]);

    return (
        <div className="h-screen px-4 sm:px-0 bg-zinc-100 dark:bg-zinc-950  flex justify-center items-center">
            <main className="bg-nlw-journey bg-no-repeat bg-center w-[800px] h-[500px] flex items-center">
                <section>
                    <div className="flex flex-col justify-center items-center gap-4 py-6">
                        <Logo />
                    </div>
                    <div className="flex items-center justify-center py-6 gap-3">
                        <h1 className="font-extralight text-2xl">
                            {refused ? 'Processando operação...' : isRefused ? 'Redirecionando...' : ''}
                        </h1>
                        <LoaderCircle className="animate-spin" size={24} />
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
