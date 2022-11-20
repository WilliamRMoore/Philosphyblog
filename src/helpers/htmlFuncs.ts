export function getElById(id: string) {
  return document.getElementById(id);
}

export function getElChildren(el: HTMLElement) {
  return el.children;
}

export default { getElById, getElChildren };
