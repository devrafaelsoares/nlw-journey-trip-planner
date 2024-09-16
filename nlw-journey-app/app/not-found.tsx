import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="h-screen px-4 sm:px-0 bg-zinc-950  flex justify-center items-center">
            <main className="bg-nlw-journey bg-no-repeat bg-center w-[800px] h-[500px] flex items-center">
                <section>
                    <div className="flex flex-col justify-center items-center gap-4 py-6">
                        <Image
                            alt="Logo Panner"
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="w-36 h-auto"
                            src="/panner-primary-logo.png"
                        />
                    </div>
                    <div className="flex items-center justify-center py-6 gap-3">
                        <h1 className="font-extralight text-3xl">Página não encontrada</h1>
                    </div>
                    <div className="flex justify-center w-full py-4">
                        <span className="w-full sm:w-[70%] text-center text-sm text-zinc-500">
                            Ao planejar sua viagem pela plann.er você automaticamente concorda com nossos {''}
                            <Link href="/terms-and-privacy#terms-of-use" scroll>
                                <u className="text-zinc-300">termos de uso</u>
                            </Link>{' '}
                            e{' '}
                            <Link href="/terms-and-privacy#privacy-policies">
                                <u className="text-zinc-300">políticas de privacidade</u>.
                            </Link>
                        </span>
                    </div>
                </section>
            </main>
        </div>
    );
}
