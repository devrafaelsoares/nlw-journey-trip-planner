"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var email_1 = require("./email");
describe('Email', function () {
    it('should be able to create a email', function () {
        var emailProps = {
            from: 'from@email.com',
            subject: 'Subject',
            to: 'to@email.com',
            text: 'Text example',
        };
        var emailResult = email_1.Email.create(emailProps);
        expect(emailResult).toBeTruthy();
        expect(emailResult).toStrictEqual(expect.any(email_1.Email));
    });
});
