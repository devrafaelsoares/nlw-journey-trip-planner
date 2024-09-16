"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.error = exports.Success = exports.Error = void 0;
var Error = /** @class */ (function () {
    function Error(value) {
        this.value = value;
    }
    Error.prototype.isError = function () {
        return true;
    };
    Error.prototype.isSuccess = function () {
        return false;
    };
    return Error;
}());
exports.Error = Error;
var Success = /** @class */ (function () {
    function Success(value) {
        this.value = value;
    }
    Success.prototype.isError = function () {
        return false;
    };
    Success.prototype.isSuccess = function () {
        return true;
    };
    return Success;
}());
exports.Success = Success;
var error = function (l) {
    return new Error(l);
};
exports.error = error;
var success = function (a) {
    return new Success(a);
};
exports.success = success;
