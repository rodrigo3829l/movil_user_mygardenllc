<template>
    <ion-tabs>
      <!-- Router Outlet que maneja las rutas de las tabs -->
      <ion-router-outlet></ion-router-outlet>
  
      <!-- Barra de navegación inferior personalizada -->
      <ion-tab-bar slot="bottom">
        <!-- Home Tab -->
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="homeIcon" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
  
        <!-- Services Tab -->
        <ion-tab-button tab="services" href="/services">
          <ion-icon :icon="servicesIcon" />
          <ion-label>Services</ion-label>
        </ion-tab-button>
  
        <!-- Profile Tab -->
        <ion-tab-button tab="profile" href="/profile">
          <ion-icon :icon="profileIcon" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
  
        <!-- My Services Tab -->
        <ion-tab-button tab="my-services" href="/my-services">
          <ion-icon :icon="myServicesIcon" />
          <ion-label>My Services</ion-label>
        </ion-tab-button>
  
        <!-- Logout Tab -->
        <ion-tab-button tab="logout" @click="logout">
          <ion-icon :icon="logoutIcon" />
          <ion-label>Logout</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
  import { homeOutline, briefcaseOutline, personOutline, listOutline, logOutOutline } from 'ionicons/icons';
  import { Preferences } from '@capacitor/preferences';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    components: {
      IonTabs,
      IonRouterOutlet,
      IonTabBar,
      IonTabButton,
      IonIcon,
      IonLabel,
    },
    setup() {
      const router = useRouter();
  
      const logout = async () => {
        // Limpiar el token de Preferences
        await Preferences.remove({ key: 'token' });
        router.push('/login'); // Redirigir al login
      };
  
      return {
        homeIcon: homeOutline,
        servicesIcon: briefcaseOutline,
        profileIcon: personOutline,
        myServicesIcon: listOutline,
        logoutIcon: logOutOutline,
        logout,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Personalización del ion-tab-bar */
  ion-tab-bar {
     /* Color de fondo de la barra */
    --color: #86A286; /* Color por defecto de los iconos y texto */
    --color-selected: #3cae3c; /* Color cuando el elemento está seleccionado */
  }
  </style>
  