<template>
  <IonPage>
    <IonContent fullscreen>
      <!-- Título del perfil con el toolbar -->
      <IonToolbar>
        <IonTitle>Profile</IonTitle>
      </IonToolbar>

      <!-- Botón de retroceso -->
      <div class="back-button">
        <IonIcon
          name="arrow-back-outline"
          class="text-black text-2xl"
          @click="goBack"
        />
      </div>

      <!-- Barra de progreso mientras se cargan los datos -->
      <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>

      <!-- Verifica si 'user' está disponible antes de renderizar la imagen y los datos -->
      <div v-if="user">
        <!-- Imagen del perfil -->
        <div class="profile-image">
          <img :src="user.img?.secure_url" alt="Profile Image" />
        </div>

        <!-- Nombre y correo del usuario -->
        <div class="profile-name">
          <h2>{{ user.name }} {{ user.apellidoP }} {{ user.apellidoM }}</h2>
          <p class="email">{{ user.email }}</p>
        </div>

        <!-- Información personal -->
        <div class="section personal-info">
          <h3>Personal Information</h3>
          <div class="info-row">
            <p class="info-title">Full Name</p>
            <p class="info-result">
              {{ user.name }} {{ user.apellidoP }} {{ user.apellidoM }}
            </p>
          </div>
          <div class="info-row">
            <p class="info-title">Date of Birth</p>
            <p class="info-result">{{ formatDate(user.fechaNacimiento) }}</p>
          </div>
          <div class="info-row">
            <p class="info-title">Phone</p>
            <p class="info-result">{{ formatPhone(user.cellPhone) }}</p>
          </div>
          <div class="info-row">
            <p class="info-title">Gender</p>
            <p class="info-result">{{ user.genero }}</p>
          </div>
          <div class="info-row">
            <p class="info-title">User Name</p>
            <p class="info-result">{{ user.userName }}</p>
          </div>
        </div>

        <!-- Información de seguridad -->
        <div class="section security-info">
          <h3>Security Information</h3>
          <div class="info-row">
            <p class="info-title">Last Login</p>
            <p class="info-result">{{ formatDate(user.lastLogin) }}</p>
          </div>
          <div class="info-row">
            <p class="info-title">Creation Date</p>
            <p class="info-result">{{ formatDate(user.creation) }}</p>
          </div>
          <div class="info-row">
            <p class="info-title">Last Password Change</p>
            <p class="info-result">{{ formatDate(user.lastPassword) }}</p>
          </div>
          <div class="info-row">
            <p class="info-title">Account Status</p>
            <ion-icon
              :name="
                user.userStatus === 'ENABLED' ? 'ellipse' : 'ellipse-outline'
              "
              class="status-icon"
            ></ion-icon>
          </div>
        </div>

        <!-- Botones de Ver Servicios y Logout -->
        <div class="button-container">
          <IonButton expand="block" color="success" @click="viewServices"
            >View Services</IonButton
          >
          <!-- <IonButton expand="block" color="tertiary" @click="notifications">
            View Notifications
            <IonBadge v-if="unreadCommentsCount > 0" class="notification-badge">{{ unreadCommentsCount }}</IonBadge>
          </IonButton> -->
          <IonButton expand="block" color="tertiary" @click="notifications" class="animate-pulse">
            View Notifications
          </IonButton><br>
          <IonButton expand="block" color="tertiary" @click="notifications" class="glow-effect">
            View Notifications
          </IonButton><br>
          <IonButton expand="block" color="tertiary" @click="notifications" class="animate-bounce">
            View Notifications
          </IonButton><br>
          <IonButton expand="block" color="tertiary" @click="notifications" class="relative flex items-center space-x-2">
            <span>View Notifications</span>
            <span class="h-2 w-2 bg-red-500 rounded-full animate-ping absolute right-0 ml-2"></span>
          </IonButton>




          <IonButton expand="block" color="dark" @click="logout"
            >Logout</IonButton
          >
        </div>
      </div>

      <!-- Mensaje amigable mientras se cargan los datos del usuario -->
      <div v-else>
        <SkeletonLoader></SkeletonLoader>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, defineAsyncComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonBadge
} from "@ionic/vue";
import { Preferences } from "@capacitor/preferences"; 
import { useRouter } from "vue-router";
import api from "@/axios/axios";
const SkeletonLoader = defineAsyncComponent(
  () => import("./SkeletonProfile.vue"),
);

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    SkeletonLoader,
    IonBadge
  },
  setup() {
    const router = useRouter();
    const user = ref<any>(null);
    const loading = ref(true); // Variable de carga
    const unreadCommentsCount = ref(0);
    // Función para regresar a la página anterior
    const goBack = () => {
      router.back();
    };
    const fetchUnreadComments = async () => {
      try {
        const token = await Preferences.get({ key: "token" });
        if (!token.value) {
          return;
        }
        const { data } = await api({
          method: "GET",
          url: "/comments/unread",
          headers: {
            Authorization: "Bearer " + token.value,
            rol: "client",
          },
        });

        if (data.success && data.comments) {
          const unreadComments = data.comments.filter((comment) => !comment.read);
          unreadCommentsCount.value = unreadComments.length;
        } else {
          unreadCommentsCount.value = 0;
        }
      } catch (error) {
        console.error("Error fetching unread comments:", error);
      }
    };
    // Función para formatear fechas
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toDateString().slice(4); // Formato: "Jan 1, 2022"
    };

    // Función para formatear el número de teléfono
    const formatPhone = (phone: any) => {
      const phoneStr = String(phone); // Asegúrate de que phone sea una cadena
      return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
    };

    // Función para redirigir a la página de servicios
    const viewServices = () => {
      router.push("/my-services");
    };

    // Función para cerrar sesión
    const logout = async () => {
      await Preferences.clear(); // Borra todos los datos de Preferences
      router.push("/login");
    };

    const notifications = async () => {
      router.push("/notifications");
    };

    // Función para obtener los datos del usuario desde la API
    const fetchUserData = async () => {
      const { value: token } = await Preferences.get({ key: "token" }); // Obtén el token desde Preferences
      const { value: rol } = await Preferences.get({ key: "rol" }); // Obtén el rol desde Preferences

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const { data } = await api({
          method: "GET",
          url: "/user/protected",
          headers: {
            Authorization: "Bearer " + token,
            rol: rol || "", // Pasa el rol si está disponible
          },
        });
        user.value = data.user;
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        loading.value = false; // Deja de mostrar el indicador de carga
      }
    };

    onMounted(() => {
      fetchUserData();
      fetchUnreadComments(); // Llama también a esta función para cargar los comentarios no leídos
      setInterval(fetchUnreadComments, 1000);
    });
    return {
      goBack,
      user,
      formatDate,
      formatPhone,
      viewServices,
      logout,
      loading,
      notifications,
      unreadCommentsCount
    };
  },
});
</script>

<style scoped>
/* Estilos generales */
.profile-image {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.profile-image img {
  border-radius: 50%;
  width: 120px;
  height: 120px;
}

.profile-name {
  text-align: center;
  margin: 20px 0;
}

.profile-name h2 {
  font-weight: bold;
  font-size: 1.8rem;
}

.email {
  color: #86a286; /* Mismo color que los resultados */
  font-size: 1rem;
}

/* Títulos de las secciones en negro */
.section h3 {
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
}

.info-title {
  color: black; /* Los títulos ahora están en negro */
  font-size: 0.95rem;
  margin-bottom: 4px;
}

.info-result {
  color: #86a286; /* El color de los resultados es igual al correo */
  font-size: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

/* Márgenes en las secciones */
.section {
  margin: 0 20px; /* Márgenes a los lados */
}

/* Estilo para la sección de información de seguridad */
.security-info .info-row {
  display: flex;
  justify-content: space-between;
}

.status-icon {
  color: green;
  font-size: 1.2rem;
}

/* Estilos del botón de retroceso encima del toolbar */
.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  display: flex;
  align-items: center;
}

/* Estilos de los botones */
.button-container {
  margin: 20px;
}

.button-container IonButton {
  margin-top: 10px;
}

/* Estilos del mensaje de carga */
.loading-message {
  text-align: center;
  margin-top: 30px;
  font-size: 1.1rem;
  color: #86a286;
}
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
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 255, 150, 0.6), 0 0 20px rgba(0, 255, 150, 0.4);
  }
  50% {
    box-shadow: 0 0 15px rgba(0, 255, 150, 0.7), 0 0 30px rgba(0, 255, 150, 0.5);
  }
}

.glow-effect {
  animation: glow 2s ease-in-out infinite;
}

</style>
