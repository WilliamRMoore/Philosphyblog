import { getElById, getElChildren, createEl } from './helpers/htmlFuncs';
import { authStore } from './store/auth';

export function SetupNav() {
  const nav = getElById('main-nav-link-list');
  if (!authStore.Getters.loginStatus()) {
    getElById('post')?.remove();
    getElById('app-logout')?.remove();
    const a = createEl('a') as HTMLAnchorElement;
    a.href = '/page/login';
    a.innerText = 'Login / Register';
    a.classList.add('main-nav-link');
    const li = createEl('li');
    li.appendChild(a);
    li.id = 'login';
    nav?.appendChild(li);
  } else {
    const a = createEl('a') as HTMLAnchorElement;
    a.href = '#';
    a.innerText = 'Log Out';
    a.id = 'app-logout';
    a.classList.add('main-nav-link');
    const li = createEl('li');
    li.appendChild(a);
    nav?.removeChild(getElById('login')!);
    nav?.appendChild(li);
    const resources = nav!.firstChild!.nextSibling!.nextSibling!.nextSibling;
    const post = createEl('li');
    const postA = createEl('a') as HTMLAnchorElement;
    post.id = 'post';
    postA.href = '/page/post';
    postA.innerText = 'Post';
    postA.classList.add('main-nav-link');
    post.appendChild(postA);
    nav?.insertBefore(post, resources);
    LogOutListener();
  }
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
      x.firstElementChild?.classList.remove('active');
    });
    nav.classList.add('active');
  }
}

function LogOutListener() {
  getElById('app-logout')?.removeEventListener('click', authStore.LOGOUT);
  getElById('app-logout')?.addEventListener('click', authStore.LOGOUT);
}
