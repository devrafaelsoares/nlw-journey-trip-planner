"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidator = void 0;
var helpers_1 = require("../../helpers");
var ZodValidator = /** @class */ (function () {
    function ZodValidator(schema) {
        this.schema = schema;
    }
    ZodValidator.prototype.validate = function (data) {
        var schemaResult = this.schema.safeParse(data);
        if (schemaResult.error) {
            var errorsZod = schemaResult.error.errors.map(function (_a) {
                var path = _a.path, message = _a.message;
                return ({ path: path[0], message: message });
            });
            return (0, helpers_1.error)(errorsZod);
        }
        return (0, helpers_1.success)(schemaResult.data);
    };
    return ZodValidator;
}());
exports.ZodValidator = ZodValidator;
