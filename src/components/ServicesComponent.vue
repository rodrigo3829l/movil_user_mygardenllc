<template>
  <IonGrid @click="goToServiceInfo">
    <IonRow class="ion-align-items-center">
      <!-- Columna para el texto -->
      <IonCol size="8">
        <!-- Rating y Cantidad -->
        <p class="status text-sm text-gray-500">
          {{ service.tipoDeServicio.tipo }}
        </p>
        <!-- Nombre del Servicio -->
        <h3 class="text-lg font-bold">{{ service.name }}</h3>
        <!-- Tipo de Servicio -->
        <p class="text-sm text-[#86A286]">
          {{ service.Calificacion.total }} ({{ service.Calificacion.cantidad }})
        </p>
      </IonCol>
      <!-- Columna para la Imagen -->
      <IonCol size="4">
        <img
          class="rounded-lg w-full h-20 object-cover"
          :src="service.img.secure_url"
          alt="Service Image"
        />
      </IonCol>
    </IonRow>
  </IonGrid>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";

export default defineComponent({
  components: {
    IonGrid,
    IonRow,
    IonCol,
  },
  props: {
    service: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  methods: {
    goToServiceInfo() {
      this.$router.push(`/service/${this.service._id}`);
    },
  },
});
</script>

<style scoped>
/* Estilo para centrar el contenido y dar formato al texto */
h3 {
  font-weight: bold;
}
.status {
  color: #86a286; /* Verde */
  font-weight: bold;
}
</style>
