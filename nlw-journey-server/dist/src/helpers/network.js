"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MY_IP_ADDRESS = void 0;
var os_1 = require("os");
function getIPAddress() {
    var interfaces = (0, os_1.networkInterfaces)();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        if (!iface)
            break;
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '0.0.0.0';
}
exports.MY_IP_ADDRESS = getIPAddress();
