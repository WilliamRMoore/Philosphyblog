import { getElById, getElChildren } from './helpers/htmlFuncs';

export function SetupNav() {
  const els = getElChildren(getElById('main-nav-link-list')!);
  Array.from(els).forEach((x) => {
    x.addEventListener('click', ChangeNavEL);
  });
}

function ChangeNavEL(e: Event) {
  const nav = e.target as HTMLElement;
  if (nav) {
    let children = getElChildren(getElById('main-nav-link-list')!);
    Array.from(children).forEach((x) => {
      x.firstElementChild!.classList.remove('active');
    });
    nav.classList.add('active');
  }
}
