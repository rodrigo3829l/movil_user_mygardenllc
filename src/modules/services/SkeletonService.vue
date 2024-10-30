<template>
<<<<<<< HEAD
    <ContentLoader
      :speed="2"
      viewBox="0 0 400 450"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <!-- Skeleton para la imagen del servicio -->
      <rect x="0" y="10" rx="10" ry="10" width="400" height="200" />
      
      <!-- Skeleton para la categoría del servicio -->
      <rect x="20" y="220" rx="4" ry="4" width="100" height="15" />
  
      <!-- Skeleton para el título del servicio -->
      <rect x="20" y="250" rx="6" ry="6" width="250" height="20" />
  
      <!-- Skeleton para la descripción corta -->
      <rect x="20" y="280" rx="6" ry="6" width="350" height="40" />
  
      <!-- Skeleton para el input de "Description" -->
      <rect x="20" y="330" rx="6" ry="6" width="360" height="40" />
  
      <!-- Skeleton para el botón de selección de imagen -->
      <rect x="20" y="380" rx="6" ry="6" width="180" height="20" />
      <rect x="220" y="380" rx="6" ry="6" width="160" height="20" />
  
      <!-- Skeleton para la selección de fecha -->
      <rect x="20" y="420" rx="6" ry="6" width="150" height="30" />
      <rect x="180" y="420" rx="6" ry="6" width="150" height="30" />
      <rect x="340" y="420" rx="6" ry="6" width="50" height="30" />
    </ContentLoader>
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
  /* Estilos adicionales si se necesitan */
  </style>
  
=======
  <ContentLoader
    :speed="2"
    viewBox="0 0 400 450"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <!-- Skeleton para la imagen del servicio -->
    <rect x="0" y="10" rx="10" ry="10" width="400" height="200" />

    <!-- Skeleton para la categoría del servicio -->
    <rect x="20" y="220" rx="4" ry="4" width="100" height="15" />

    <!-- Skeleton para el título del servicio -->
    <rect x="20" y="250" rx="6" ry="6" width="250" height="20" />

    <!-- Skeleton para la descripción corta -->
    <rect x="20" y="280" rx="6" ry="6" width="350" height="40" />

    <!-- Skeleton para el input de "Description" -->
    <rect x="20" y="330" rx="6" ry="6" width="360" height="40" />

    <!-- Skeleton para el botón de selección de imagen -->
    <rect x="20" y="380" rx="6" ry="6" width="180" height="20" />
    <rect x="220" y="380" rx="6" ry="6" width="160" height="20" />

    <!-- Skeleton para la selección de fecha -->
    <rect x="20" y="420" rx="6" ry="6" width="150" height="30" />
    <rect x="180" y="420" rx="6" ry="6" width="150" height="30" />
    <rect x="340" y="420" rx="6" ry="6" width="50" height="30" />
  </ContentLoader>
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
/* Estilos adicionales si se necesitan */
</style>
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
