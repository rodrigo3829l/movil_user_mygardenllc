<template>
<IonPage>
    <IonContent fullscreen>
        
        <!-- Flecha de regreso encima del toolbar -->
        <div class="absolute top-4 left-4 z-10 flex items-center">
            <IonIcon name="arrow-back-outline" class="text-black text-2xl" @click="goBack" />
        </div>

        <!-- Toolbar con el título del servicio -->
        <IonToolbar>
            <IonTitle class="text-lg font-semibold">{{ service ? service.name : 'Schedule Service' }}</IonTitle>
        </IonToolbar>

        <!-- Imagen del servicio ocupando todo el ancho -->

        <div v-if="service" class="service-image">
            <img :src="service?.img?.secure_url" alt="Service Image" class="w-full object-cover h-64" />
        </div>

        <!-- Contenedor para el contenido del servicio -->
        <div v-if="!loading" class="p-4">
            <!-- Tipo de servicio y título -->
            <h5 class="text-sm text-black">{{ service.tipoDeServicio?.tipo }}</h5>
            <h2 class="text-xl font-bold text-[#86A286] mt-2">{{ service.name }}</h2>
            <p class="text-base text-black mt-2">{{ service.description }}</p>

            <!-- Formulario para agendar el servicio -->
            <IonRow>
                <!-- Descripción del servicio -->
                <IonCol size="12">
                    <IonInput placeholder="Description" label="Description" label-placement="floating" v-model="scheduleDescription" class="custom-input">
                    </IonInput>
                </IonCol>

                <!-- Input para seleccionar imagen -->
                <IonCol size="12">
                    <label for="schedule-image" class="date-label">Select Image</label>
                    <input type="file" id="schedule-image" @change="handleImageChange" accept="image/*" class="custom-input-image" />
                </IonCol>

                <!-- Selector de fecha (día, mes, año) -->
                <IonCol size="12">
                    <label for="schedule-date" class="date-label">Select Date</label>
                    <ion-datetime id="schedule-date" presentation="date" :prefer-wheel="true" v-model="scheduleDate" class="custom-datetime">
                    </ion-datetime>
                </IonCol>

                <!-- Botón para agendar el servicio -->
                <IonCol size="12">
                    <!-- <IonButton expand="block" type="submit" class="schedule-button" @click="handleSchedule">Schedule</IonButton> -->
                    <IonButton expand="block" type="submit" @click="handleSchedule" :disabled="isSubmitting">
                        <span v-if="!isSubmitting">Schedule</span>
                        <ion-spinner v-else name="dots"></ion-spinner>
                    </IonButton>
                </IonCol>
            </IonRow>
        </div>

        <!-- Barra de progreso y mensaje amigable mientras se carga la información -->
        <div v-if="loading" class="text-center mt-8">
            <ion-progress-bar type="indeterminate"></ion-progress-bar>
            <SkeletonLoader></SkeletonLoader>
            <!-- <p class="text-gray-500 mt-4">Fetching service information...</p> -->
        </div>
    </IonContent>
</IonPage>
</template>

    
<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    defineAsyncComponent
} from 'vue';
import {
    IonPage,
    IonContent,
    IonButton,
    IonIcon,
    IonInput,
    IonDatetime,
    IonProgressBar,
    IonRow,
    IonCol,
    IonToolbar,
    IonTitle
} from '@ionic/vue';
import {
    useRoute,
    useRouter
} from 'vue-router';
import {
    Preferences
} from '@capacitor/preferences';
import api from '@/axios/axios';
const SkeletonLoader = defineAsyncComponent(() => import('./SkeletonService.vue'));
export default defineComponent({
    components: {
        IonPage,
        IonContent,
        IonButton,
        IonIcon,
        IonInput,
        IonDatetime,
        IonProgressBar,
        IonRow,
        IonCol,
        IonToolbar,
        IonTitle,
        SkeletonLoader
    },
    setup() {
        const service = ref(null);
        const rating = ref(4.3); // Valor del rating
        const loading = ref(true);
        const isSubmitting = ref(false);
        const scheduleDate = ref('');
        const scheduleDescription = ref('');
        const scheduleImage = ref(null);
        const router = useRouter();
        const route = useRoute();

        const fetchService = async () => {
            try {
                const {
                    data
                } = await api.get(`/services/getservice/${route.params.id}`);
                service.value = data.service;
            } catch (error) {
                console.error(error);
            } finally {
                loading.value = false;
            }
        };

        const handleImageChange = (event: Event) => {
            const file = (event.target as HTMLInputElement)?.files ?. [0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    scheduleImage.value = e.target ?.result; // Convertir a base64
                };
                reader.readAsDataURL(file);
            }
        };

        const handleSchedule = async () => {
            isSubmitting.value = true;
            try {
                // Obtener token y rol desde Preferences
                isSubmitting.value = true
                const {
                    value: token
                } = await Preferences.get({
                    key: 'token'
                });
                const {
                    value: rol
                } = await Preferences.get({
                    key: 'rol'
                });

                if (!token) {
                    console.error('No token found');
                    return;
                }

                const scheduleData = {
                    user: token,
                    service: service.value._id,
                    description: scheduleDescription.value,
                    img: scheduleImage.value, // Imagen en base64
                    typeReserve: 'online',
                    scheduledTime: new Date(scheduleDate.value).toISOString().split('T')[0],
                };

                const {
                    data
                } = await api.post('/schedule/schedule', scheduleData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        rol: rol || 'client',
                    },
                });
                if (data.success) {
                    // Mostrar alerta de éxito
                    alert("Service scheduled successfully!");

                    // Cambiar el estado a "submitting" después de mostrar la alerta
                    setTimeout(() => {
                        isSubmitting.value = true;
                        // Redirigir a la pantalla de "Mis Servicios" después de 3 segundos
                        setTimeout(() => {
                        router.push('/my-services');
                        }, 3000);
                    }, 500); // Demora antes de cambiar el valor de isSubmitting a true
                    } else {
                    alert("Something went wrong!");
                }

                // Redirigir a "Mis Servicios" después del éxito
            } catch (error) {
                console.error('Error al agendar servicio:', error);
            }
        };

        const goBack = () => {
            router.back();
        };

        onMounted(() => {
            fetchService();
        });

        return {
            service,
            rating,
            loading,
            scheduleDate,
            scheduleDescription,
            handleSchedule,
            handleImageChange,
            goBack,
            isSubmitting
        };
    },
});
</script>

    
<style scoped>
/* Estilo del formulario */
.custom-input {
    background-color: #F0F5F0;
    border-radius: 12px;
    color: #86A286;
}

.custom-input-image {
    background-color: #F0F5F0;
    color: #86A286;
    border-radius: 12px;
    padding: 10px;
    width: 100%;
    border: none;
}

/* Estilo para el label de la fecha */
.date-label {
    font-size: 1rem;
    font-weight: bold;
    color: #86A286;
}

/* Estilo personalizado para el ion-datetime */
.custom-datetime {
    --color: #86A286;
}

/* Botón de agendar */
.schedule-button {
    --background: #86A286;
    --color: white;
    border-radius: 12px;
}

/* Estilos del indicador de carga */
.loading-message {
    margin-top: 16px;
    font-size: 1.2rem;
    color: #86A286;
}

/* Imagen de servicio que ocupa todo el ancho */
.service-image {
    width: 100%;
}

.service-image img {
    width: 100%;
    object-fit: cover;
    height: 100%;
}

/* Posición del ícono de regreso */
.absolute {
    position: absolute;
}
</style>
