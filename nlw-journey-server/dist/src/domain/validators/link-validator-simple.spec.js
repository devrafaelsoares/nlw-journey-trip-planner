"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var link_validator_simple_1 = require("./link-validator-simple");
describe('LinkValidator', function () {
    it('should return an error if title is empty', function () {
        var linkProps = {
            title: '',
            url: 'https://www.airbnb.com.br/',
        };
        var linkValidator = new link_validator_simple_1.LinkValidatorSimple();
        var linkValidationResult = linkValidator.validate(linkProps);
        expect(linkValidationResult).toEqual([{ path: 'title', message: 'O título do link é obrigatório' }]);
    });
    it("should return an error if the link's occurrence date is old", function () {
        var linkProps = {
            title: 'Link 01',
            url: 'https://wwwwairbnbco',
        };
        var linkValidator = new link_validator_simple_1.LinkValidatorSimple();
        var linkValidationResult = linkValidator.validate(linkProps);
        expect(linkValidationResult).toEqual([{ path: 'url', message: 'URL informada inválida' }]);
    });
});
