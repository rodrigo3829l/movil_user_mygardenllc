<<<<<<< HEAD
<template>
    <IonGrid>
      <IonRow class="justify-between items-center">
        <!-- Texto de comentario alineado a la izquierda -->
        <IonCol size="8" class="text-left"> <!-- Agregamos la clase text-left -->
          <!-- Servicio y Rating -->
          <p class="text-sm text-[#86A286]">{{ comment.service.name }} <span class="text-gray-500">({{ comment.rating }})</span></p>
          <!-- Nombre del usuario -->
          <h3 class="text-lg font-bold">{{ fullName }}</h3>
          <!-- Comentario -->
          <p class="mt-2 text-gray-600">{{ comment.comment }}</p>
        </IonCol>
        <!-- Imagen del usuario a la derecha -->
        <IonCol size="4">
          <img class="rounded-lg w-full h-32 object-cover" :src="imgUrl" alt="User Image" />
        </IonCol>
      </IonRow>
    </IonGrid>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { IonGrid, IonRow, IonCol } from '@ionic/vue';
  
  export default defineComponent({
    components: {
      IonGrid,
      IonRow,
      IonCol,
    },
    props: {
      comment: {
        type: Object,
        required: true,
      },
      imgUrl: {
        type: String,
        default: 'https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg',
      },
    },
    setup(props) {
      // Computed property to get the full name of the user
      const fullName = computed(() => {
        const { name, apellidoP, apellidoM } = props.comment.user;
        return `${name} ${apellidoP} ${apellidoM}`;
      });
  
      return {
        fullName,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Aquí puedes añadir estilos adicionales si lo necesitas */
  </style>
  
=======
<template>
  <IonGrid>
    <IonRow class="justify-between items-center">
      <!-- Texto de comentario alineado a la izquierda -->
      <IonCol size="8" class="text-left">
        <!-- Agregamos la clase text-left -->
        <!-- Servicio y Rating -->
        <p class="text-sm text-[#86A286]">
          {{ comment.service.name }}
          <span class="text-gray-500">({{ comment.rating }})</span>
        </p>
        <!-- Nombre del usuario -->
        <h3 class="text-lg font-bold">{{ fullName }}</h3>
        <!-- Comentario -->
        <p class="mt-2 text-gray-600">{{ comment.comment }}</p>
      </IonCol>
      <!-- Imagen del usuario a la derecha -->
      <IonCol size="4">
        <img
          class="rounded-lg w-full h-32 object-cover"
          :src="imgUrl"
          alt="User Image"
        />
      </IonCol>
    </IonRow>
  </IonGrid>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";

export default defineComponent({
  components: {
    IonGrid,
    IonRow,
    IonCol,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
    imgUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg",
    },
  },
  setup(props) {
    // Computed property to get the full name of the user
    const fullName = computed(() => {
      const { name, apellidoP, apellidoM } = props.comment.user;
      return `${name} ${apellidoP} ${apellidoM}`;
    });

    return {
      fullName,
    };
  },
});
</script>

<style scoped>
/* Aquí puedes añadir estilos adicionales si lo necesitas */
</style>
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
