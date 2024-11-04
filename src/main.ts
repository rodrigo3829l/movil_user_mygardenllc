import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import inputMixin from "./mixins/inputMixin";
import { IonicVue } from "@ionic/vue";
import { createPinia } from "pinia"; // Importa Pinia
import { Capacitor } from "@capacitor/core";
/* Import Tailwind CSS */
import "./styles/tailwind.css";
import "./styles/themes.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
import { addIcons } from "ionicons";
import * as allIcons from "ionicons/icons"; // Importa todos los íconos
import { PushNotifications } from "@capacitor/push-notifications";
import { requestNotificationPermission } from "./utils/notificationUtils";
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
async function initializeApp() {
  console.log("Inicializando solicitud de permisos de notificación...");
  alert("Inicializando solicitud de permisos de notificación...");

  // Solicitar permisos de notificación y registrar listeners
  await requestNotificationPermission();

  // Listener para recibir notificaciones en primer plano
  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log("Notificación recibida en primer plano:", notification);
    alert(`Notificación recibida:\nTítulo: ${notification.title}\nCuerpo: ${notification.body}`);
  });

  // Listener para manejar acciones de notificación en segundo plano
  PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
    console.log("Acción en notificación realizada:", notification);
    alert(`Acción en notificación realizada: ${JSON.stringify(notification.notification)}`);
  });
}

// Inicializar aplicación con los listeners registrados
import "@ionic/vue/css/palettes/dark.system.css";
addIcons(allIcons);
const pinia = createPinia();
const app = createApp(App).use(IonicVue).use(pinia).use(router); // Usar el plugin global

app.mixin(inputMixin);

router.isReady().then(() => {
  if (Capacitor.isNativePlatform()) {
    initializeApp();
  }
  app.mount("#app");
});


