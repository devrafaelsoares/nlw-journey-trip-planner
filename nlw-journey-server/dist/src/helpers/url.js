"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUrlBuilderProduction = exports.createFrontUrlBuilderDevelopment = exports.createServerUrlBuilderDevelopment = exports.UrlBuilder = void 0;
var process_1 = require("process");
var network_1 = require("./network");
var UrlBuilder = /** @class */ (function () {
    function UrlBuilder(protocol, host, port) {
        if (protocol === void 0) { protocol = 'https'; }
        this.protocol = protocol;
        this.host = host;
        this.port = port || (this.protocol === 'http' ? 80 : 443);
    }
    UrlBuilder.prototype.buildUrl = function (paths, params) {
        var path = paths.join('/');
        var url = new URL("".concat(this.protocol, "://").concat(this.host, ":").concat(this.port, "/").concat(path));
        if (params) {
            Object.keys(params).forEach(function (key) {
                url.searchParams.append(key, params[key]);
            });
        }
        return url.toString();
    };
    UrlBuilder.prototype.buildTripParticipantConfirmationUrl = function (tripId, participantId) {
        return this.buildUrl(['trips', tripId, 'participants', participantId, 'confirm']);
    };
    UrlBuilder.prototype.buildTripConfirmationUrl = function (id) {
        return this.buildUrl(['trips', id, 'confirm']);
    };
    UrlBuilder.prototype.buildTripInviteRefuseUrl = function (tripId, participantId) {
        return this.buildUrl(['trips', tripId, 'participants', participantId, 'refuse']);
    };
    UrlBuilder.prototype.buildTripRefuseUrl = function (id) {
        return this.buildUrl(['trips', id, 'refuse']);
    };
    return UrlBuilder;
}());
exports.UrlBuilder = UrlBuilder;
var createServerUrlBuilderDevelopment = function () {
    return new UrlBuilder('http', network_1.MY_IP_ADDRESS, process_1.env.FASTIFY_PORT);
};
exports.createServerUrlBuilderDevelopment = createServerUrlBuilderDevelopment;
var createFrontUrlBuilderDevelopment = function () {
    return new UrlBuilder('http', network_1.MY_IP_ADDRESS, 3000);
};
exports.createFrontUrlBuilderDevelopment = createFrontUrlBuilderDevelopment;
var createUrlBuilderProduction = function () {
    return new UrlBuilder('https', '');
};
exports.createUrlBuilderProduction = createUrlBuilderProduction;
