"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatus[HttpStatus["UNATHORIZED"] = 401] = "UNATHORIZED";
    HttpStatus[HttpStatus["FORBIDEN"] = 403] = "FORBIDEN";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpStatus[HttpStatus["CONFLIT"] = 409] = "CONFLIT";
    HttpStatus[HttpStatus["TO_MANY_REQUESTS"] = 429] = "TO_MANY_REQUESTS";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
