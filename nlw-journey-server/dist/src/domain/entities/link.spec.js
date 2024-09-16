"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("../validators");
var link_1 = require("./link");
describe('Link', function () {
    it('should be able to create a link', function () {
        var linkValidator = new validators_1.LinkValidatorSimple();
        var linkProps = {
            title: 'airbnb',
            url: 'https://www.airbnb.com.br/',
        };
        var linkResult = link_1.Link.create(linkProps, linkValidator);
        expect(linkResult.isSuccess()).toBeTruthy();
        expect(linkResult.value).toStrictEqual(expect.any(link_1.Link));
    });
    it('should not be possible to create a link', function () {
        var linkValidator = new validators_1.LinkValidatorSimple();
        var linkProps = {
            title: 'trivago',
            url: '://www.trivago.com/pt-BR',
        };
        var linkResult = link_1.Link.create(linkProps, linkValidator);
        expect(linkResult.isError()).toBeTruthy();
        expect(linkResult.value).toEqual([{ path: 'url', message: 'URL informada inválida' }]);
    });
});
