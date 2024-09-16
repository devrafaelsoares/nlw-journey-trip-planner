import { readFileSync } from 'fs';
import { resolve } from 'path';

const encoding = 'utf-8';

export const tripCreateConfirmationTemplateHtml = readFileSync(resolve(__dirname, 'trip-create.html'), {
    encoding,
});

export const tripInviteTemplateHtml = readFileSync(resolve(__dirname, 'trip-invite.html'), {
    encoding,
});
