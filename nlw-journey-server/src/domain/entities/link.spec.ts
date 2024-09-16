import { LinkValidatorSimple } from '@domain/validators';
import { Link, LinkProps } from './link';

describe('Link', () => {
    it('should be able to create a link', () => {
        const linkValidator = new LinkValidatorSimple();
        const linkProps: LinkProps = {
            title: 'airbnb',
            url: 'https://www.airbnb.com.br/',
        };

        const linkResult = Link.create(linkProps, linkValidator);

        expect(linkResult.isSuccess()).toBeTruthy();
        expect(linkResult.value).toStrictEqual(expect.any(Link));
    });

    it('should not be possible to create a link', () => {
        const linkValidator = new LinkValidatorSimple();
        const linkProps: LinkProps = {
            title: 'trivago',
            url: '://www.trivago.com/pt-BR',
        };
        const linkResult = Link.create(linkProps, linkValidator);

        expect(linkResult.isError()).toBeTruthy();
        expect(linkResult.value).toEqual([{ path: 'url', message: 'URL informada inválida' }]);
    });
});
