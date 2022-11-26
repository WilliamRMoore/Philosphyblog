export function getElById(id: string) {
  return document.getElementById(id);
}

export function getElChildren(el: HTMLElement) {
  return el.children;
}

export function getElsWithClass(className: string) {
  return document.getElementsByClassName(className);
}

export function createEl(
  tagName: string,
  options: ElementCreationOptions | null = null
) {
  return options
    ? document.createElement(tagName, options)
    : document.createElement(tagName);
}

export default { getElById, getElChildren };
