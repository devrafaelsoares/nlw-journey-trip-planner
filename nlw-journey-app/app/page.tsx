'use client';

import { TravelSchema } from './schema';
import { Logo } from '@/components/Logo';
import { ModeThemeToggle } from '@/components/ModeThemeToggle';
import { FinalStep } from '@components/StepTravel/Steps';
import { RenderStepContent } from '@components/TravelStepForm';
import { Button } from '@components/ui/button';
import { Form } from '@components/ui/form';
import { Step, Stepper, type StepItem } from '@components/ui/stepper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Rocket } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type TravelFormProps = z.infer<typeof TravelSchema>;
export type TravelFormFields = keyof TravelFormProps;

export default function Home() {
    const [showStepper, setShowStepper] = useState(false);

    const steps = [
        { label: 'Informações da viagem' },
        { label: 'Participantes', optional: true },
        { label: 'Confirmação da viagem' },
    ] satisfies StepItem[];

    const form = useForm<TravelFormProps>({
        resolver: zodResolver(TravelSchema),
        defaultValues: {
            destination: '',
            email: '',
            emailsToInvite: [],
            ownerEmail: '',
            ownerName: '',
        },
    });

    const handleShowStepper = () => {
        setShowStepper(true);
    };

    return (
        <div className="h-screen px-4 sm:px-0 bg-zinc-100 dark:bg-zinc-950 flex justify-center items-center ">
            <main className="bg-nlw-journey bg-no-repeat bg-center w-[800px] h-[500px] flex items-center md:relative">
                <ModeThemeToggle className="absolute top-3 right-3 md:top-4 md:right-4" />
                <section>
                    <div className="flex flex-col justify-center items-center gap-4 py-6">
                        <Logo />
                        <span className="dark:text-white text-center">
                            Convide seus amigos e planeje sua próxima viagem
                        </span>
                    </div>
                    {showStepper ? (
                        <div className="flex items-center justify-around bg-zinc-100 dark:bg-zinc-900 py-2 px-4 rounded-md">
                            <div className="flex w-full flex-col gap-4">
                                <Form {...form}>
                                    <form method="POST">
                                        <Stepper orientation="vertical" initialStep={0} steps={steps}>
                                            {steps.map((stepProps, index) => {
                                                return (
                                                    <Step key={stepProps.label} {...stepProps}>
                                                        <RenderStepContent key={index} stepIndex={index} form={form} />
                                                    </Step>
                                                );
                                            })}
                                            <FinalStep form={form} setShowStepper={setShowStepper} />
                                        </Stepper>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-6">
                            <h1 className="text-2xl text-center font-extralight dark:text-white mb-4">
                                Bem-vindo ao Planner, seu planejador de viagens!
                            </h1>
                            <Button
                                variant="default"
                                onClick={handleShowStepper}
                                className="flex items-center gap-3 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                            >
                                <span>Para onde vamos?</span>
                                <Rocket size={22} />
                            </Button>
                        </div>
                    )}
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
