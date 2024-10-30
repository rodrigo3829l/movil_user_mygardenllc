<<<<<<< HEAD
import { defineStore } from 'pinia';
import api from '@/axios/axios';
import { Preferences } from '@capacitor/preferences';

// Define el store de Pinia
export const useAuthStore = defineStore('auth', {
=======
import { defineStore } from "pinia";
import api from "@/axios/axios";
import { Preferences } from "@capacitor/preferences";

// Define el store de Pinia
export const useAuthStore = defineStore("auth", {
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
  state: () => ({
    token: null as string | null,
    expireIn: null as number | null,
    name: null as string | null,
    email: null as string | null,
    rol: null as string | null,
    image: null as string | null,
  }),

  actions: {
    async login(email: string, pass: string, dpto: string) {
      const datos = {
        email,
        password: pass,
        department: dpto,
      };

      try {
<<<<<<< HEAD
        const { data } = await api.post('/user/login', datos);
=======
        const { data } = await api.post("/user/login", datos);
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
        this.name = data.name;
        this.token = data.token;
        this.expireIn = data.expiresIn;
        this.rol = data.rol;
        this.image = data.image;

        // Guardar en Preferences
<<<<<<< HEAD
        await Preferences.set({ key: 'token', value: data.token });
        await Preferences.set({ key: 'rol', value: data.rol });

        return { exito: 'Inicio de sesión exitoso' };
      } catch (error: any) {
        console.error('Error en el store:', error);
        return { error: error.response?.data?.error || 'Unknown error' };
=======
        await Preferences.set({ key: "token", value: data.token });
        await Preferences.set({ key: "rol", value: data.rol });

        return { exito: "Inicio de sesión exitoso" };
      } catch (error: any) {
        console.error("Error en el store:", error);
        return { error: error.response?.data?.error || "Unknown error" };
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
      }
    },

    async logout() {
      try {
<<<<<<< HEAD
        await api.get('/user/logout');
=======
        await api.get("/user/logout");
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
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
<<<<<<< HEAD
          method: 'GET',
          url: '/user/refresh',
=======
          method: "GET",
          url: "/user/refresh",
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
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

<<<<<<< HEAD
        await Preferences.set({ key: 'token', value: data.token });
=======
        await Preferences.set({ key: "token", value: data.token });
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
      } catch (error) {
        console.error(error);
      }
    },

    async initializeStore() {
<<<<<<< HEAD
      const storedToken = await Preferences.get({ key: 'token' });
=======
      const storedToken = await Preferences.get({ key: "token" });
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
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
