import { getElById, getElsWithClass } from './helpers/htmlFuncs';
import initRegister from './forms/register';
import initPost from './forms/post';
import initLogin from './forms/login';

export function SetUpRouting() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!(target as HTMLElement).classList.contains('main-nav-link')) {
      return;
    }
    e.preventDefault();
    route(target);
    window.onpopstate = locationHandler;
  });
}

const route = (target: HTMLElement) => {
  let event = window.event!; // get window.event if event argument not provided
  event.preventDefault();
  window.history.pushState({}, '', (event.target as HTMLLinkElement).href!);
  locationHandler();
};

export const locationHandler = async () => {
  let location = window.location.pathname.replace('/page/', '');

  if (location.length === 0) {
    location = '/';
  }
  const route = getRoute(location);

  const html = await fetch(route.template).then((response) => response.text());

  getElById('content')!.innerHTML = html;
  document.title = route.title;
  activatePageListeners(location);
};

//main-nav-link

const routes = [
  {
    location: '404',
    template: '/dist/templates/404.html',
    title: '404',
    description: 'Page Not Found',
  },
  {
    location: '/',
    template: '/dist/templates/home.html',
    description: 'Home',
  },
  {
    location: 'blog',
    template: '/dist/templates/blog.html',
    title: 'blog',
    description: 'Musings of a black pilled Pyrhonist',
  },
  {
    location: 'resources',
    template: '/dist/templates/resources.html',
    title: 'resources',
    description: "Like you'll read them anyway",
  },
  {
    location: 'login',
    template: '/dist/templates/login.html',
    title: 'login',
    description: 'Login or register',
  },
  {
    location: 'register',
    template: '/dist/templates/register.html',
    title: 'register',
    description: 'Login or register',
  },
  {
    location: 'post',
    template: '/dist/templates/post.html',
    title: 'Post to blog',
    description: 'Go on, Write something.',
  },
] as Array<route>;

function getRoute(location: string) {
  return routes.find((x) => x.location === location) || routes[0];
}

function activatePageListeners(location: string) {
  SetUpSiteLinks();
  if (location === 'register') {
    initRegister();
  }
  if (location === 'post') {
    initPost();
  }
  if (location === 'login') {
    initLogin();
  }
}

type route = {
  location: string;
  template: string;
  title: string;
  description: string;
};

function SetUpSiteLinks() {
  const els = getElsWithClass('site-link');
  Array.from(els).forEach((x) => {
    x.removeEventListener('click', siteLinkClickHandler);
  });
  Array.from(els).forEach((x) => {
    x.addEventListener('click', siteLinkClickHandler);
  });
}

function siteLinkClickHandler(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLElement;
  route(target);
}
