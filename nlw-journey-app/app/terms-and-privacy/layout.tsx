import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NLW Journey - Termos e serviços',
    description: 'Termos e serviços',
};

type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;
export default function RootLayout({ children }: RootLayoutProps) {
    return <main>{children}</main>;
}
