<template>
<<<<<<< HEAD
    <div class="skeleton-container">
      <ContentLoader
        :speed="2"
        viewBox="0 0 400 100"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <!-- Skeleton para el texto de la categoría (Gardening) -->
        <rect x="0" y="10" rx="4" ry="4" width="90" height="15" />
  
        <!-- Skeleton para el nombre del servicio (Garden Maintenance) -->
        <rect x="0" y="35" rx="4" ry="4" width="180" height="20" />
  
        <!-- Skeleton para la calificación (3.5) y reseñas -->
        <rect x="0" y="65" rx="4" ry="4" width="60" height="15" />
  
        <!-- Skeleton para la imagen (imagen de servicio) -->
        <rect x="260" y="10" rx="10" ry="10" width="120" height="80" />
      </ContentLoader>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { ContentLoader } from 'vue-content-loader';
  
  export default defineComponent({
    components: {
      ContentLoader,
    },
  });
  </script>
  
  <style scoped>
  .skeleton-container {
    margin: 0px 0px 0px 15px; /* Agrega un margen alrededor del skeleton */
  }
  </style>
  
=======
  <div class="skeleton-container">
    <ContentLoader
      :speed="2"
      viewBox="0 0 400 100"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <!-- Skeleton para el texto de la categoría (Gardening) -->
      <rect x="0" y="10" rx="4" ry="4" width="90" height="15" />

      <!-- Skeleton para el nombre del servicio (Garden Maintenance) -->
      <rect x="0" y="35" rx="4" ry="4" width="180" height="20" />

      <!-- Skeleton para la calificación (3.5) y reseñas -->
      <rect x="0" y="65" rx="4" ry="4" width="60" height="15" />

      <!-- Skeleton para la imagen (imagen de servicio) -->
      <rect x="260" y="10" rx="10" ry="10" width="120" height="80" />
    </ContentLoader>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ContentLoader } from "vue-content-loader";

export default defineComponent({
  components: {
    ContentLoader,
  },
});
</script>

<style scoped>
.skeleton-container {
  margin: 0px 0px 0px 15px; /* Agrega un margen alrededor del skeleton */
}
</style>
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
