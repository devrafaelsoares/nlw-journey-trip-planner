'use client';

import { toast } from './ui/use-toast';

export async function ClipBoardButton(url: string) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(url);
            toast({ variant: 'success', description: 'Link copiado com sucesso' });
        } catch (error) {
            toast({ variant: 'destructive', description: 'Falha ao copiar o link' });
        }
    } else {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            document.execCommand('copy');
            document.body.removeChild(textArea);
            toast({ variant: 'success', description: 'Link copiado com sucesso' });
        } catch (error) {
            toast({ variant: 'destructive', description: 'Falha ao copiar o link' });
        }
    }
}
