<template>
    <IonGrid>
      <IonRow class="justify-center">
        <!-- Card de servicio dinámico -->
        <IonCol size="12" size-sm="6" size-md="4" class="ion-padding">
          <div class="rounded-lg p-3">
            <!-- Imagen del servicio con bordes redondeados -->
            <img
              class="rounded-lg w-full h-36 object-cover mb-3"
              :src="service.img.secure_url"
              :alt="service.name"
            />
            <!-- Título del servicio -->
            <h3 class="text-lg font-bold">
              {{ service.name }}
              <span class="text-gray-500">({{ service.tipoDeServicio.tipo }})</span>
            </h3>
            <!-- Rating del servicio -->
            <p class="text-[#86A286] mt-2">
              Rating {{ service.Calificacion.total }} ({{ service.Calificacion.totales }})
            </p>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonGrid, IonRow, IonCol } from '@ionic/vue';
  
  export default defineComponent({
    props: {
      service: {
        type: Object,
        required: true,
      },
    },
    components: {
      IonGrid,
      IonRow,
      IonCol,
    },
  });
  </script>
  
  <style scoped>
  /* Aquí puedes añadir estilos adicionales si es necesario */
  </style>
  