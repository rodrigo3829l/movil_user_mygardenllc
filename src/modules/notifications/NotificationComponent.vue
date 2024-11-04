<template>
    <div class="flex items-center p-4 border-b border-gray-200 bg-white" @swipe="handleSwipe">
      <!-- Columna 1: Ícono -->
      <div class="flex-shrink-0 mr-4">
        <ion-icon :icon="icon" :style="{ color: iconColor }" size="large"></ion-icon>
      </div>
  
      <!-- Columna 2: Tipo de Notificación, Mensaje y Título -->
      <div class="flex-1">
        <!-- <p class="font-bold text-black">{{ notificationType }}</p> -->
        <p class="font-bold text-black">{{ notification._id }}</p>
        <p class="text-custom-green">{{ notification.message }}</p>
        <p class="text-gray-500">{{ notification.title }}</p>
      </div>
  
      <!-- Columna 3: Estado de Lectura y Botón de Marcar como Leído -->
      <div class="flex flex-col items-end">
        <ion-icon
          :icon="notification.read ? 'checkmark-circle' : 'checkmark-circle-outline'"
          :style="{ color: notification.read ? '#86A286' : 'black' }"
          size="small"
          class="mb-2"
        ></ion-icon>
        <ion-button v-if="!notification.read" fill="clear" size="small" @click="markAsRead">
          <ion-icon name="checkmark-done-outline"></ion-icon>
        </ion-button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { IonButton, IonIcon } from '@ionic/vue';
  
  export default defineComponent({
    components: {
      IonButton,
      IonIcon,
    },
    props: {
      notification: {
        type: Object as PropType<{
          title: string;
          message: string;
          type: string;
          read: boolean;
          _id: string;
        }>,
        required: true,
      },
    },
    computed: {
      icon() {
        switch (this.notification.type) {
          case 'serviceScheduled':
            return 'calendar';
          case 'serviceQuoted':
            return 'cash';
          case 'serviceCancelled':
            return 'close-circle';
          case 'serviceRescheduled':
            return 'refresh';
          case 'servicePaid':
            return 'wallet';
          case 'upcomingVisit':
            return 'walk';
          default:
            return 'notifications';
        }
      },
      iconColor() {
        switch (this.notification.type) {
          case 'serviceScheduled':
            return '#4a90e2';
          case 'serviceQuoted':
            return '#9b59b6';
          case 'serviceCancelled':
            return '#e74c3c';
          case 'serviceRescheduled':
            return '#f39c12';
          case 'servicePaid':
            return '#27ae60';
          case 'upcomingVisit':
            return '#f1c40f';
          default:
            return '#95a5a6';
        }
      },
      notificationType() {
        return this.notification.type
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase());
      },
    },
    methods: {
      markAsRead() {
        this.$emit('mark-as-read', this.notification);
      },
      handleSwipe() {
        this.$emit('delete-notification', this.notification);
      },
    },
  });
  </script>
  
  <style scoped>
  .text-custom-green {
    color: #86A286; /* Verde personalizado para el mensaje */
  }
  .bg-white {
    background-color: #ffffff;
  }
  </style>
  