<template>
<IonGrid @click="goToService(service._id)">
    <IonRow class="ion-align-items-center">
        <!-- Columna para el texto -->
        <IonCol size="8">
            <!-- Status del servicio -->
            <p class="status">{{ service.status }}</p>

            <!-- Nombre del Servicio -->
            <h3 class="text-lg font-bold">{{ service.service.name }}</h3>

            <!-- Fecha de última modificación -->
            <p class="last-updated">Scheduled for {{ lastUpdated() }}</p>
        </IonCol>

        <!-- Columna para la Imagen -->
        <IonCol size="4">
            <img class="rounded-lg w-full h-20 object-cover" :src="service.img.secure_url" alt="Service Image" />
        </IonCol>
    </IonRow>
</IonGrid>
</template>

  
<script lang="ts">
import {
    defineComponent,
    PropType
} from 'vue';
import {
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/vue';

export default defineComponent({
    components: {
        IonGrid,
        IonRow,
        IonCol,
    },
    props: {
        service: {
            type: Object as PropType < any > ,
            required: true,
        },
    },
    methods: {
        goToService(id) {
            this.$router.push(`/my-service/${id}`);
        },
        lastUpdated() {
            const status = this.service.status;
            let referenceDate;

            if (status === 'quoting') {
                referenceDate = this.service.dates.reserved;
            } else if (status === 'finish') {
                referenceDate = this.service.dates.quoted;
            } else if (status === 'quoted' || status === 'development') {
                referenceDate = this.service.dates.quoted;
            } else if (status === 'canceled') {
                referenceDate = this.service.dates.quoted || this.service.dates.reserved;
            }

            if (!referenceDate) {
                return 'Unknown';
            }

            const serviceDate = new Date(referenceDate);
            return serviceDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            });
        },
    },
});
</script>

  
<style scoped>
/* Estilo para el texto */
.status {
    color: #86A286;
    /* Verde */
    font-weight: bold;
}

.text-lg {
    font-size: 1.25rem;
    /* Tamaño de texto para el título */
}

.font-bold {
    font-weight: bold;
    /* Negrita */
}

.last-updated {
    color: #9e9e9e;
    font-size: 0.9rem;
}

.w-full {
    width: 100%;
    /* Imagen ocupa el ancho completo del contenedor */
}

.h-20 {
    height: 80px;
    /* Altura de la imagen */
}

.object-cover {
    object-fit: cover;
    /* Imagen cubre el área sin deformarse */
}

.rounded-lg {
    border-radius: 0.5rem;
    /* Bordes redondeados */
}
</style>
