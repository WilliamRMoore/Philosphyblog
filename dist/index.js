"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//dT3TZFPXFuCmjASC
const htmlFuncs_1 = require("./helpers/htmlFuncs");
const router_1 = require("./router");
function loadPage(page) {
    let el = (0, htmlFuncs_1.getElById)(page);
    changeActiveLink(el);
    (0, router_1.locationHandler)();
}
function changeActiveLink(el) {
    if (el) {
        let children = (0, htmlFuncs_1.getElChildren)((0, htmlFuncs_1.getElById)('main-nav-link-list'));
        Array.from(children).forEach((x) => {
            x.classList.remove('active');
        });
        el.classList.add('active');
    }
}
function SetupNav() {
    const els = (0, htmlFuncs_1.getElChildren)((0, htmlFuncs_1.getElById)('main-nav-link-list'));
    Array.from(els).forEach((x) => {
        x.addEventListener('onclick', (e) => {
            const r = e.target;
            changeActiveLink(r);
        });
    });
}
SetupNav();
