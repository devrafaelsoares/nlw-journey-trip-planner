import { LinkProps } from '@domain/entities';
import { LinkValidatorSimple } from './link-validator-simple';

describe('LinkValidator', () => {
    it('should return an error if title is empty', () => {
        const linkProps: LinkProps = {
            title: '',
            url: 'https://www.airbnb.com.br/',
        };

        const linkValidator = new LinkValidatorSimple();

        const linkValidationResult = linkValidator.validate(linkProps);
        expect(linkValidationResult).toEqual([{ path: 'title', message: 'O título do link é obrigatório' }]);
    });

    it("should return an error if the link's occurrence date is old", () => {
        const linkProps: LinkProps = {
            title: 'Link 01',
            url: 'https://wwwwairbnbco',
        };

        const linkValidator = new LinkValidatorSimple();

        const linkValidationResult = linkValidator.validate(linkProps);
        expect(linkValidationResult).toEqual([{ path: 'url', message: 'URL informada inválida' }]);
    });
});
