import { Separator } from '@components/ui/separator';
import { Skeleton } from '@components/ui/skeleton';

export default function Loading() {
    return (
        <div className="flex justify-center p-5">
            <main className="w-[1000px] grid grid-row-2 justify-between items-center dark:bg-zinc-950">
                <section className="w-full col-span-2 dark:bg-zinc-900 p-3 rounded-md flex flex-col md:flex-row md:justify-between items-center">
                    <div className="w-full flex flex-col md:flex-row md:justify-between px-2 sm:px-0 gap-6 md:items-center">
                        <div className="flex justify-center md:justify-start items-center gap-2">
                            <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-[150px] p-2" />
                        </div>
                        <div className="flex justify-center md:justify-start gap-2 items-center">
                            <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-[180px] p-2" />
                        </div>
                    </div>
                    <Separator orientation="vertical" className="h-10 invisible md:visible md:mx-4" />
                    <div>
                        <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-[180px] py-5" />
                    </div>
                </section>
                <section className="grid col-span-2 py-4 grid-cols-1 md:grid-cols-2">
                    <article className="p-3 col-span-1 self-start">
                        <header>
                            <div className="flex flex-col gap-4 md:flex-row md:gap-0 items-center justify-between">
                                <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-[180px] py-4" />
                                <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-[180px] py-5" />
                            </div>
                        </header>
                        <div className="flex flex-col gap-5">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="py-5 flex flex-col gap-5">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-[100px] py-4" />
                                        <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-[120px] p-2" />
                                    </div>
                                    <div>
                                        <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-full py-5 rounded-xl" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>
                    <aside className="p-3 self-start">
                        <div>
                            <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-[160px] py-3.5" />
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="flex flex-col gap-4 py-6">
                                    <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-[160px] py-2.5" />
                                    <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-full py-2" />
                                </div>
                            ))}
                            <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-full py-6" />
                        </div>
                        <Separator className="my-6" />
                        <div>
                            <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-[160px] py-3.5" />
                            {[...Array(2)].map((_, index) => (
                                <div key={index} className="flex flex-col gap-4 py-6">
                                    <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-[160px] py-2.5" />
                                    <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-[280px] py-2" />
                                </div>
                            ))}
                            <Skeleton className="bg-zinc-400 dark:bg-zinc-100 w-full py-6" />
                        </div>
                    </aside>
                </section>
            </main>
        </div>
    );
}
