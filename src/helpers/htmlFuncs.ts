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

export function createAnchorLink(
  id: string,
  href: string,
  classList: string[] | null = null
) {
  const a = createEl('a') as HTMLAnchorElement;
  a.href = href;
  a.id = id;
  if (classList && classList.length > 0) {
    classList.forEach((x) => a.classList.add(x));
  }
  return a;
}

export function createUnOrderedList(
  id: string | null,
  classList: string[] | null,
  List: ulListItem[]
) {
  const ul = createEl('ul');
  if (id) ul.id = id;
  if (classList && classList.length > 0) {
    classList.forEach((x) => {
      ul.classList.add(x);
    });
  }
  const liArr = [] as HTMLLIElement[];
  List.forEach((x) => {
    const li = createEl('li') as HTMLLIElement;
    if (x.id) li.id = x.id;
    if (x.classList && x.classList.length > 0) {
      x.classList.forEach((y) => li.classList.add(y));
    }
    li.innerHTML = x.innerHtml;
    liArr.push(li);
  });
  liArr.forEach((x) => {
    ul.appendChild(x);
  });
  return ul as HTMLUListElement;
}

export default { getElById, getElChildren };
