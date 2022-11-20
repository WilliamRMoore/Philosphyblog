"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElChildren = exports.getElById = void 0;
function getElById(id) {
    return document.getElementById(id);
}
exports.getElById = getElById;
function getElChildren(el) {
    return el.children;
}
exports.getElChildren = getElChildren;
exports.default = { getElById, getElChildren };
