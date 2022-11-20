//dT3TZFPXFuCmjASC
import { getElById, getElChildren } from './helpers/htmlFuncs';
import { locationHandler } from './router';

function loadPage(page: string) {
  let el = getElById(page);
  console.log(page);
  changeActiveLink(el);

  //locationHandler();
}

function changeActiveLink(el: HTMLElement | null) {
  if (el) {
    let children = getElChildren(getElById('main-nav-link-list')!);

    Array.from(children).forEach((x) => {
      x.classList.remove('active');
    });

    el.classList.add('active');
  }
}

function SetupNav() {
  const els = getElChildren(getElById('main-nav-link-list')!);
  Array.from(els).forEach((x) => {
    //alert('hello');
    x.addEventListener('click', (e) => {
      const r = e.target as HTMLElement;
      loadPage(r.id);
    });
  });
}

SetupNav();
locationHandler();
