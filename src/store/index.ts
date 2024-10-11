import { defineStore } from 'pinia';
import api from '@/axios/axios';
import { Preferences } from '@capacitor/preferences';

// Define el store de Pinia
export const useAuthStore = defineStore('auth', {
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
        const { data } = await api.post('/user/login', datos);
        this.name = data.name;
        this.token = data.token;
        this.expireIn = data.expiresIn;
        this.rol = data.rol;
        this.image = data.image;

        // Guardar en Preferences
        await Preferences.set({ key: 'token', value: data.token });
        await Preferences.set({ key: 'rol', value: data.rol });

        return { exito: 'Inicio de sesión exitoso' };
      } catch (error: any) {
        console.error('Error en el store:', error);
        return { error: error.response?.data?.error || 'Unknown error' };
      }
    },

    async logout() {
      try {
        await api.get('/user/logout');
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
          method: 'GET',
          url: '/user/refresh',
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

        await Preferences.set({ key: 'token', value: data.token });
      } catch (error) {
        console.error(error);
      }
    },

    async initializeStore() {
      const storedToken = await Preferences.get({ key: 'token' });
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
