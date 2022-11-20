"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationHandler = void 0;
const htmlFuncs_1 = require("./helpers/htmlFuncs");
const locationHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    let location = window.location.hash.replace('#', '');
    if (location.length == 0) {
        location = '/';
    }
    const route = getRoute(location);
    const html = yield fetch(route.template).then((response) => response.text());
    (0, htmlFuncs_1.getElById)('content').innerHTML = html;
});
exports.locationHandler = locationHandler;
const routes = [];
routes[1] = {
    location: '404',
    template: '/templates/404.html',
    title: '404',
    description: 'Page Not Found',
};
routes[2] = {
    location: 'blog',
    template: '/templates/blog.html',
    title: 'blog',
    description: 'Musings of a black pilled Pyrhonist',
};
routes[3] = {
    location: 'resources',
    template: '/templates/resources.html',
    title: 'resources',
    description: "Like you'll read them anyway",
};
routes[4] = {
    location: 'login',
    template: '/templates/login.html',
    title: 'login',
    description: 'Login or register',
};
function getRoute(location) {
    routes.forEach((x) => {
        if (x.location == location) {
            return x;
        }
    });
    return routes[1];
}
