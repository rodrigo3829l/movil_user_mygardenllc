<template>
    <IonPage>
      <IonContent fullscreen>
        <!-- Skeleton Loader estático para la pantalla de perfil -->
        <div class="skeleton-container">
          <!-- Skeleton para la imagen de perfil en el centro -->
          <ContentLoader viewBox="0 0 400 600">
            <!-- Círculo para la imagen del perfil -->
            <circle cx="200" cy="60" r="60" />
  
            <!-- Rectángulo para el nombre del usuario -->
            <rect x="80" y="150" rx="5" ry="5" width="240" height="30" />
  
            <!-- Rectángulo para el correo electrónico -->
            <rect x="120" y="190" rx="5" ry="5" width="160" height="25" />
  
            <!-- Título para "Personal Information" -->
            <rect x="20" y="240" rx="5" ry="5" width="220" height="25" />
  
            <!-- Filas de "Personal Information" con los elementos alineados -->
            <!-- El lado derecho ahora está alineado completamente a la derecha -->
            <rect x="20" y="290" rx="5" ry="5" width="180" height="25" /> <!-- Más largo -->
            <rect x="210" y="290" rx="5" ry="5" width="170" height="25" /> <!-- Alineado a la derecha -->
            
            <rect x="20" y="340" rx="5" ry="5" width="180" height="25" /> <!-- Más largo -->
            <rect x="210" y="340" rx="5" ry="5" width="150" height="25" /> <!-- Alineado a la derecha -->
  
            <rect x="20" y="390" rx="5" ry="5" width="180" height="25" /> <!-- Más largo -->
            <rect x="210" y="390" rx="5" ry="5" width="170" height="25" /> <!-- Alineado a la derecha -->
  
            <rect x="20" y="450" rx="5" ry="5" width="180" height="25" /> <!-- Más largo -->
            <rect x="210" y="450" rx="5" ry="5" width="170" height="25" /> <!-- Alineado a la derecha -->
  
            <rect x="20" y="510" rx="5" ry="5" width="180" height="25" /> <!-- Más largo -->
            <rect x="210" y="510" rx="5" ry="5" width="150" height="25" /> <!-- Alineado a la derecha -->
  
            <!-- Skeleton para un botón -->
            <rect x="50" y="570" rx="10" ry="10" width="300" height="45" />
          </ContentLoader>
        </div>
      </IonContent>
    </IonPage>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { ContentLoader } from 'vue-content-loader';
  import { IonPage, IonContent } from '@ionic/vue';
  
  export default defineComponent({
    components: {
      IonPage,
      IonContent,
      ContentLoader,
    },
  });
  </script>
  
  <style scoped>
  .skeleton-container {
    padding: 25px;
  }
  </style>
  