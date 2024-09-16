import { z } from 'zod';

const LinkSchema = z.object({
    title: z.string().min(1, 'O título do link é obrgatório'),
    url: z.string().url('Url inválida').min(1, 'A url do link é obrigatória'),
});

export const CreateLinkSchema = LinkSchema;
export const UpdateLinkSchema = LinkSchema;
