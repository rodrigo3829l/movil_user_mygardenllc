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

      <!-- Profile Tab con badge de notificaciones no leídas -->
      <ion-tab-button tab="profile" href="/profile">
        <ion-icon :icon="profileIcon" />
        <ion-label>Profile</ion-label>
        <!-- Badge de notificaciones encima del icono de perfil -->
        <ion-badge v-if="unreadCount > 0" class="notification-badge">{{ unreadCount }}</ion-badge>
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
import { defineComponent, ref, onMounted } from "vue";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
} from "@ionic/vue";
import {
  homeOutline,
  briefcaseOutline,
  personOutline,
  listOutline,
  logOutOutline,
} from "ionicons/icons";
import { Preferences } from "@capacitor/preferences";
import { useRouter } from "vue-router";
import api from "@/axios/axios";

export default defineComponent({
  components: {
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonBadge,
  },
  setup() {
    const router = useRouter();
    const unreadCount = ref(0); // Conteo de notificaciones no leídas

    // Iconos
    const homeIcon = homeOutline;
    const servicesIcon = briefcaseOutline;
    const profileIcon = personOutline;
    const myServicesIcon = listOutline;
    const logoutIcon = logOutOutline;

    // Función para manejar la salida
    const logout = async () => {
      await Preferences.remove({ key: "token" });
      router.push("/login"); // Redirigir al login
    };

    const fetchUnreadNotifications = async () => {
      try {

        const token = await Preferences.get({ key: "token" });
        if (!token.value) {
          return;
        }
        const { data } = await api({
          method: "GET",
          url: "/notifications/notifications",
          headers: {
            Authorization: "Bearer " + token.value,
            rol: "client",
          },
        });

        // Comprobar si la respuesta es exitosa
        if (data.success && data.notifications) {
          const unreadNotifications = data.notifications.filter(
            (notification) => !notification.read
          );
          unreadCount.value = unreadNotifications.length;
        } else {
          unreadCount.value = 0;
        }
      } catch (error) {
        console.error("Error fetching unread notifications:", error);

      } finally {

        setTimeout(fetchUnreadNotifications, 1000);
      }
    };


    // Llamar a fetchUnreadNotifications cuando el componente se monte
    onMounted(() => {
      fetchUnreadNotifications();
    });

    return {
      homeIcon,
      servicesIcon,
      profileIcon,
      myServicesIcon,
      logoutIcon,
      logout,
      unreadCount,
    };
  },
});
</script>

<style scoped>
/* Personalización del ion-tab-bar */
ion-tab-bar {
  --color: #86a286;
  /* Color por defecto de los iconos y texto */
  --color-selected: #3cae3c;
  /* Color cuando el elemento está seleccionado */
}

/* Estilo del badge de notificaciones */
.notification-badge {
  position: absolute;
  top: 0px; /* Ajusta este valor para bajarlo un poco */
  right: 10px;
  background-color: red;
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 1;
}


</style>
