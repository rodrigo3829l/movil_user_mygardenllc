import { defineStore } from "pinia";
import api from "@/axios/axios";
import { Preferences } from "@capacitor/preferences";
import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from '@capacitor/core';
// Define el store de Pinia
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    expireIn: null as number | null,
    name: null as string | null,
    email: null as string | null,
    rol: null as string | null,
    image: null as string | null,
    fcmToken: null as string | null,
  }),

  actions: {
    async registerPushNotifications() {
      if (!Capacitor.isNativePlatform()) {
        console.log("Entorno web detectado. No se registrarán notificaciones push.");
        // Genera un token aleatorio para el entorno web
        this.fcmToken = "web-simulated-token-" + Math.random().toString(36).substr(2, 10);
        return;
      }
      return new Promise((resolve, reject) => {
        PushNotifications.register();
    
        PushNotifications.addListener('registration', (token) => {
          this.fcmToken = token.value;
          console.log("Token FCM obtenido:", token.value);
          resolve(this.fcmToken);
        });
    
        PushNotifications.addListener('registrationError', (error) => {
          console.error("Error en la registración de notificaciones push:", error);
          reject(error);
        });
      });
    },
    async login(email: string, pass: string, dpto: string) {
      await this.registerPushNotifications();
      const datos = {
        email,
        password: pass,
        department: dpto,
        fcmToken: this.fcmToken,
        platform: "mobile", 
      };

      try {
        const { data } = await api.post("/user/login", datos);
        this.name = data.name;
        this.token = data.token;
        this.expireIn = data.expiresIn;
        this.rol = data.rol;
        this.image = data.image;

        // Guardar en Preferences
        await Preferences.set({ key: "token", value: data.token });
        await Preferences.set({ key: "rol", value: data.rol });

        return { exito: "Inicio de sesión exitoso" };
      } catch (error: any) {
        console.error("Error en el store:", error);
        return { error: error.response?.data?.error || "Unknown error" };
      }
    },

    async logout() {
      try {
        await api.get("/user/logout");
      } catch (error) {
        console.error(error);
      } finally {
        await Preferences.clear();
        this.$reset(); // Resetea todo el estado
      }
    },

    async refreshToken() {
      try {
        const { data } = await api({
          method: "GET",
          url: "/user/refresh",
          headers: {
            Authorization: `Bearer ${this.token}`,
            rol: this.rol,
          },
        });
        this.token = data.token;
        this.expireIn = data.expiresIn;
        this.name = data.name;
        this.email = data.email;
        this.rol = data.rol;
        this.image = data.image;

        await Preferences.set({ key: "token", value: data.token });
      } catch (error) {
        console.error(error);
      }
    },

    async initializeStore() {
      const storedToken = await Preferences.get({ key: "token" });
      const token = storedToken.value;

      if (token) {
        this.token = token;
      }
    },
  },

  getters: {
    isLoggedIn: (state) => !!state.token,
  },
});
