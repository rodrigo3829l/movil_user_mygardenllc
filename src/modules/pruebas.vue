<template>
  <ion-page>
    <!-- Usando el IonToolbar personalizado con ícono de retroceso -->
    <ion-toolbar title="Perfil" ></ion-toolbar>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="6">
            <!-- Barra de búsqueda -->
            <IonSearchbar placeholder="Buscar" ></IonSearchbar><br>

            <!-- Campo de correo -->
            <ion-input
              v-model="email"
              type="email"
              placeholder="Correo Electrónico"
              label="Correo Electrónico"
              required
            ></ion-input><br>

            <!-- Campo de contraseña -->
            <ion-input
              v-model="password"
              type="password"
              placeholder="Contraseña"
              label="Contraseña"
              required
            ></ion-input>

            <!-- Botón de iniciar sesión -->
            <ion-button expand="block" @click="login" >Iniciar Sesión</ion-button>
            

            <!-- Chip personalizado -->
            <IonChip >Decking</IonChip>

            <!-- Enlace de contraseña olvidada -->
            <ion-text color="medium">
              <p class="ion-text-center">¿Olvidaste tu contraseña?</p>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonInput, IonButton, IonChip, IonSearchbar, IonText } from '@ionic/vue';

export default defineComponent({
  components: {
    IonPage,
    IonToolbar,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    IonChip,
    IonSearchbar,
    IonText
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert('Por favor, ingresa tu correo y contraseña.');
        return;
      }
      console.log(`Iniciar sesión con: ${this.email} / ${this.password}`);
    }
  }
});
</script>

  