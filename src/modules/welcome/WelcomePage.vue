<template>
  <IonPage>
    <IonContent fullscreen>
      <!-- Uso de IonGrid para manejar el layout de la pantalla completa -->
      <IonGrid>
        <IonRow>
          <!-- Primer Columna: Imagen de fondo con texto -->
          <IonCol size="12" class="welcome-section">
            <div class="background-image">
              <IonText>
                <h2 class="welcome-title">Welcome to My Garden LLC</h2>
                <p class="welcome-subtitle">
                  Your trusted gardening and landscaping company.
                </p>
              </IonText>
            </div>
          </IonCol>

          <!-- Segunda Columna: Texto corto -->
          <IonCol size="12" class="ion-text-center">
            <IonText>
              <p class="description-text">
                Your outdoor paradise, our expertise.
              </p>
            </IonText>
          </IonCol>

          <!-- Tercera Columna: Logo centrado -->
          <IonCol size="12" class="ion-text-center">
            <img
              src="https://res.cloudinary.com/dui4i9f4e/image/upload/v1709677547/logos/jb7aaqsuesjivzmiz5mg.png"
              alt="My Garden Logo"
              class="logo-image"
            />
          </IonCol>

          <!-- Cuarta Columna: Otro texto corto -->
          <IonCol size="12" class="ion-text-center">
            <IonText>
              <p class="description-text">
                Transforming your garden dreams into reality.
              </p>
            </IonText>
          </IonCol>

          <!-- Quinta Columna: Botones de paginación y botón de siguiente -->
          <IonCol size="12" class="ion-text-center">
            <!-- Indicadores de Paginación -->
            <div class="pagination-indicator">
              <IonIcon
                name="ellipse"
                class="pagination-circle active"
              ></IonIcon>
              <IonIcon name="ellipse" class="pagination-circle"></IonIcon>
              <IonIcon name="ellipse" class="pagination-circle"></IonIcon>
            </div>
            <br />
            <!-- Botón de Siguiente -->
            <IonButton expand="block" @click="goToNextPage">
              Let's get started
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonButton,
  IonCol,
  IonRow,
  IonText,
  IonIcon,
  IonGrid,
} from "@ionic/vue";
import { useRouter } from "vue-router"; // Para la navegación

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonButton,
    IonCol,
    IonRow,
    IonText,
    IonIcon,
    IonGrid,
  },
  methods: {
    goToNextPage() {
      // Función para navegar a la siguiente página
      this.$router.push("/next-page");
    },
  },
});
</script>

<style scoped>
/* Estilos para la pantalla de bienvenida */

.welcome-section {
  background-image: url("https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990267/logos/nhqsptfuorp4dkmutlcm.jpg");
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  text-align: center;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: white;
  text-align: center;
  margin: 0;
}

.description-text {
  font-size: 1.2rem;
  color: #86a286; /* Color verde claro */
  text-align: center;
  margin: 10px 0;
}

.logo-image {
  max-width: 200px;
  margin: 20px auto;
}

.pagination-indicator {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.pagination-circle {
  font-size: 10px;
  color: lightgray;
}

.pagination-circle.active {
  color: #2dd55b; /* Indicador activo verde */
}
</style>
