import { SetupNav } from './nav';
import { SetUpRouting } from './router';
import { authStore } from './store/auth';
authStore.GET_USER();
SetupNav();
SetUpRouting();
