"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseCookies(cookieHeader) {
    if (!cookieHeader)
        return {};
    return cookieHeader.split(';').reduce((acc, curr) => {
        const [name, value] = curr.split('=').map((part) => part.trim());
        acc[name] = value;
        return acc;
    }, {});
}
exports.default = parseCookies;
