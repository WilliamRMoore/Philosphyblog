import { getElById } from './helpers/htmlFuncs';
import initRegister from './forms/register';
import initPost from './forms/post';

export const locationHandler = async () => {
  let location = window.location.hash.replace('#', '');

  if (location.length === 0) {
    location = '/';
  }

  console.log(location);
  const route = getRoute(location);

  const html = await fetch(route.template).then((response) => response.text());
  getElById('content')!.innerHTML = html;
  activatePageListeners(location);
};

type route = {
  location: string;
  template: string;
  title: string;
  description: string;
};

const routes = [
  {
    location: '404',
    template: '/templates/404.html',
    title: '404',
    description: 'Page Not Found',
  },
  {
    location: '/',
    template: '/templates/home.html',
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

window.addEventListener('hashchange', locationHandler);

//locationHandler();

function activatePageListeners(location: string) {
  if (location === 'register') {
    initRegister();
  }
  if (location === 'post') {
    initPost();
  }
}
