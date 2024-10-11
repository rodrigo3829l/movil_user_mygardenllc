// import { createRouter, createWebHistory } from '@ionic/vue-router';
// import { defineAsyncComponent } from 'vue';
// import { Preferences } from '@capacitor/preferences';

// // Componentes cargados de manera asincrónica
// const WelcomePage = defineAsyncComponent(() => import('@/modules/welcome/WelcomePage.vue'));
// const HomePage = defineAsyncComponent(() => import('@/modules/home/HomePage.vue'));
// const ServicesPage = defineAsyncComponent(() => import('@/modules/services/ServicesPage.vue'));
// const ProfilePage = defineAsyncComponent(() => import('@/modules/profile/ProfilePage.vue'));
// const MyServicesPage = defineAsyncComponent(() => import('@/modules/myservices/MyServicesPage.vue'));
// const LoginPage = defineAsyncComponent(() => import('@/modules/login/LoginPage.vue'));
// const TabsPage = defineAsyncComponent(() => import('@/components/Navbar.vue')); // Esto será el ion-tabs

// const routes = [
//   {
//     path: '/',
//     redirect: '/welcome',
//   },
//   {
//     path: '/welcome',
//     name: 'Welcome',
//     component: WelcomePage,
//     beforeEnter: async (to, from, next) => {
//       setTimeout(async () => {
//         const token = await Preferences.get({ key: 'token' });
//         if (token.value) {
//           next('/home');
//         } else {
//           next('/login');
//         }
//       }, 3000);
//     },
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: LoginPage,
//   },
//   {
//     path: '/',
//     component: TabsPage, // Aquí es donde se definen las rutas con ion-tabs
//     meta: { requiresAuth: true },
//     children: [
//       {
//         path: 'home',
//         name: 'Home',
//         component: HomePage,
//       },
//       {
//         path: 'services',
//         name: 'Services',
//         component: ServicesPage,
//       },
//       {
//         path: 'profile',
//         name: 'Profile',
//         component: ProfilePage,
//       },
//       {
//         path: 'my-services',
//         name: 'MyServices',
//         component: MyServicesPage,
//       },
//     ],
//   },
//   {
//     path: '/:pathMatch(.*)*',
//     redirect: '/welcome',
//   },
// ];

// // Verificar si las rutas requieren autenticación
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
// });

// router.beforeEach(async (to, from, next) => {
//   const token = await Preferences.get({ key: 'token' });
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!token.value) {
//       next('/login');
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

// export default router;
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { Preferences } from '@capacitor/preferences';
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
// Componentes cargados de manera asíncrona (sin defineAsyncComponent)
const WelcomePage = () => import('@/modules/welcome/WelcomePage.vue');
const HomePage = () => import('@/modules/home/HomePage.vue');
const ServicesPage = () => import('@/modules/services/ServicesPage.vue');
const ProfilePage = () => import('@/modules/profile/ProfilePage.vue');
const MyServicesPage = () => import('@/modules/myservices/MyServicesPage.vue');
const LoginPage = () => import('@/modules/login/LoginPage.vue');
const ServiceInfoPage = () => import('@/modules/services/ServiceInfoPage.vue');
const PaymentPage = () => import('@/modules/payment/PaymentPage.vue');
const TabsPage = () => import('@/components/Navbar.vue');

const routes = [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
      name: 'Welcome',
      component: WelcomePage,
      beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
        setTimeout(async () => {
          const token = await Preferences.get({ key: 'token' });
          if (token.value) {
            next('/home');
          } else {
            next('/login');
          }
        }, 3000);
      },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/',
    component: TabsPage, // ion-tabs para las rutas principales
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: HomePage,
      },
      {
        path: 'services',
        name: 'Services',
        component: ServicesPage,
      },
      {
        path: '/service/:id',
        name: 'ServiceInfo',
        component: ServiceInfoPage,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfilePage,
      },
      {
        path: 'my-services',
        name: 'MyServices',
        component: MyServicesPage,
      },
      {
        path: '/my-service/:id',
        name: 'InfoMyService',
        component:  () => import('@/modules/myservices/InfoMyService.vue'),
      },
      {
        path: '/payment/:id',
        name: 'payment',
        component: PaymentPage,
      }
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/welcome',
  },
];

// Verificar si las rutas requieren autenticación
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = await Preferences.get({ key: 'token' });
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token.value) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
