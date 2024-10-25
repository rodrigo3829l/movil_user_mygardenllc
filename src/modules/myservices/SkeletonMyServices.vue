<template>
    <IonPage>
        <!-- Toolbar con el título del servicio -->
        <div v-if="loading">
            <ion-progress-bar type="indeterminate"></ion-progress-bar>
        </div>
        <IonContent v-else>
            <IonToolbar>
                <IonTitle>Service Details</IonTitle>
            </IonToolbar>
    
            <!-- Título del servicio y estado -->
            <div class="text-center mt-5">
                <h1 class="text-xl font-bold">{{ serviceData.service.name }} <span class="text-[#86A286]">({{ serviceData.status }})</span></h1>
                <p class="text-gray-500">{{ serviceData.description }}</p>
            </div>
    
            <!-- Fechas de servicio -->
            <div class="mt-5 px-4">
                <h2 class="text-lg font-semibold mb-2">Service Dates</h2>
                <IonGrid>
                    <IonRow>
                        <IonCol size="6" v-if="serviceData.dates.reserved">
                            <p>Reserved Date</p>
                        </IonCol>
                        <IonCol v-if="serviceData.dates.reserved" size="6" class="text-right text-[#86A286]">
                            <p>{{ formatDate(serviceData.dates.reserved) }}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6" v-if="serviceData.dates.scheduledTime">
                            <p>Scheduled Time</p>
                        </IonCol>
                        <IonCol v-if="serviceData.dates.scheduledTime" size="6" class="text-right text-[#86A286]">
                            <p>{{ formatDate(serviceData.dates.scheduledTime) }}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6" v-if="serviceData.dates.quoted">
                            <p>Quoted Date</p>
                        </IonCol>
                        <IonCol v-if="serviceData.dates.quoted" size="6" class="text-right text-[#86A286]">
                            <p>{{ formatDate(serviceData.dates.quoted) }}</p>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
    
            <div v-if="serviceData.status === 'quoting'" class="mt-10 flex flex-col items-center">
                <h2 class="text-2xl font-semibold text-[#86A286] mb-2">🌱 Your garden is in progress! 🌿</h2>
                <p class="text-lg text-gray-600 max-w-lg">
                    We're preparing your quote. Hang tight! ⏳🌷
                </p>
            </div>
    
            <!-- Tabla de productos usados -->
            <div v-if="serviceData.products.length > 0" class="mt-5 px-4">
                <h2 class="text-lg font-semibold mb-2">Used Products</h2>
                <IonGrid>
                    <IonRow>
                        <IonCol size="6">
                            <strong>Product</strong>
                        </IonCol>
                        <IonCol size="3">
                            <strong>Quantity</strong>
                        </IonCol>
                        <IonCol size="3" class="text-right">
                            <strong>Total</strong>
                        </IonCol>
                    </IonRow>
                    <div v-for="product in serviceData.products" :key="product">
                        <IonRow>
                            <IonCol size="6">{{ product.product.product }}</IonCol>
                            <IonCol size="3">{{ product.quantity }}</IonCol>
                            <IonCol size="3" class="text-right text-[#86A286]">{{ product.total }}</IonCol>
                        </IonRow>
                    </div>
                </IonGrid>
            </div>
    
            <!-- Costos adicionales -->
            <div v-if="serviceData.additionalCosts" class="mt-5 px-4">
                <h2 class="text-lg font-semibold mb-2">Additional Costs</h2>
                <IonGrid>
                    <IonRow>
                        <IonCol size="6">
                            <p>Labor</p>
                        </IonCol>
                        <IonCol size="6" class="text-right text-[#86A286]">
                            <p>{{ serviceData.additionalCosts.labor }}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">
                            <p>Machinery</p>
                        </IonCol>
                        <IonCol size="6" class="text-right text-[#86A286]">
                            <p>{{ serviceData.additionalCosts.machinery }}</p>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
    
            <!-- Empleados asignados -->
            <div v-if="serviceData.employeds.length > 0" class="mt-5 px-4">
                <h2 class="text-lg font-semibold mb-2">Employees assigned</h2>
                <IonGrid>
                    <div v-for="employed in serviceData.employeds" :key="employe">
                        <IonRow>
                            <IonCol size="2">
                                <img class="w-10 h-10 rounded-full" :src="employed.img.secure_url" />
                            </IonCol>
                            <IonCol size="10">
                                <p>{{ employed.name }} {{ employed.apellidoP }} {{ employed.apellidoM }}</p>
                            </IonCol>
                        </IonRow>
                    </div>
                </IonGrid>
            </div>
    
            <!-- Ticket del servicio -->
            <div v-if="serviceData.quote > 0" class="mt-5 px-4">
                <h2 class="text-lg font-semibold mb-2">Service Ticket</h2>
                <IonGrid>
                    <IonRow>
                        <IonCol size="6">Total:</IonCol>
                        <IonCol size="6" class="text-right text-[#86A286]">${{ serviceData.quote.toFixed(2) }}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">Payment pending:</IonCol>
                        <IonCol size="6" class="text-right text-[#86A286]">${{ serviceData.pending.toFixed(2) }}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">Remaining amount:</IonCol>
                        <IonCol size="6" class="text-right text-[#86A286]">${{ serviceData.quote.toFixed(2) - serviceData.pending.toFixed(2) }}</IonCol>
                    </IonRow>
                </IonGrid>
                <IonButton v-if="serviceData.pending > 0" expand="block" @click="goToService">Pay Now</IonButton>
                <p v-else class="text-center text-lg text-[#86A286] mt-2">Thank you for your payment!</p>
            </div>
    
            <!-- Comentarios -->
            <div class="leave-comment mt-5 px-4">
                <!-- Iconos de rating -->
                <div v-if="!commentData.success && serviceData.status === 'finish'" class="rating-icons flex justify-between mb-4 space-x-2">
                    <IonIcon :icon="sadIcon" class="text-3xl" @click="selectRating(1)" :class="(selectedRating === 1) ? 'text-[#86A286]' : ''" />
                    <IonIcon :icon="disappointedIcon" class="text-3xl" @click="selectRating(2)" :class="(selectedRating === 2) ? 'text-[#86A286]' : ''" />
                    <IonIcon :icon="happyIcon" class="text-3xl" @click="selectRating(3)" :class="(selectedRating === 3) ? 'text-[#86A286]' : ''" />
                    <IonIcon :icon="disappointedIcon" class="text-3xl" @click="selectRating(4)" :class="(selectedRating === 4) ? 'text-[#86A286]' : ''" />
                    <IonIcon :icon="veryHappyIcon" class="text-3xl" @click="selectRating(5)" :class="(selectedRating === 5) ? 'text-[#86A286]' : ''" />
                </div>
    
                <IonGrid v-if="!commentData.success && serviceData.status === 'finish'">
                    <IonRow class="items-center">
                        <IonCol size="2" class="flex justify-center items-center">
                            <img class="w-10 h-10 rounded-full" src="https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg" alt="Profile">
                        </IonCol>
                        <IonCol size="9">
                            <IonInput v-model="comment" placeholder="Leave a comment" class="comment-input">
                                <IonIcon slot="end" :icon="sendIcon" class="text-3xl" @click="sendComment" />
                            </IonInput>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonButton v-if="serviceData.status !== 'finish' && serviceData.status !== 'canceled' && serviceData.status !== 'pay'" class="mt-4" color="danger" expand="block" @click="confirmCancel">Cancel Service</IonButton>
                <IonButton v-if="serviceData.status === 'quoting'" class="mt-2" color="warning" expand="block" @click="openRescheduleDatePicker">
                    Reeschedule Service
                </IonButton>
    
            </div>
    
            <!-- Comentario de prueba -->
            <div v-if="commentData.success" class="mt-5 px-4 space-y-2">
                <!-- Fila 1: Foto, nombre y fecha -->
                <div class="flex items-center space-x-3">
                    <img :src="commentData.comment.img" alt="Profile" class="w-10 h-10 rounded-full">
                    <div>
                        <p class="font-semibold">{{ commentData.comment.name }}</p>
                        <span class="text-sm text-[#86A286]">{{ formatDate(commentData.comment.date) }}</span>
                    </div>
                </div>
                <!-- Fila 2: Estrellas -->
                <div class="flex space-x-1 text-2xl text-[#86A286]">
                    <IonIcon :icon="starOutline" />
                    <IonIcon :icon="starOutline" />
                    <IonIcon :icon="starOutline" />
                    <IonIcon :icon="starOutline" />
                    <IonIcon :icon="starOutline" />
                </div>
                <!-- Fila 3: Comentario -->
                <p class="text-gray-700">
                    {{ commentData.comment.comment }}
                </p>
            </div>
        </IonContent>
        <ion-datetime ref="datetime" display-format="MMM D, YYYY" placeholder="Select Date" v-if="showDatePicker">
            <ion-buttons slot="buttons">
                <ion-button color="danger" @click="closeDatePicker">Cancel</ion-button>
                <ion-button color="success" @click="confirmDatePicker">Reschedule</ion-button>
            </ion-buttons>
        </ion-datetime>
    
    </IonPage>
    </template>
    
    <script lang="ts">
    import api from '@/axios/axios';
    import {
        onMounted,
        ref,
        watch 
    } from 'vue';
    import {
        IonPage,
        IonContent,
        IonToolbar,
        IonTitle,
        IonGrid,
        IonRow,
        IonCol,
        IonButton,
        IonInput,
        IonIcon,
        IonDatetime
    } from '@ionic/vue';
    import {
        useRoute,
        useRouter
    } from 'vue-router';
    import {
        happy,
        send,
        ellipsisHorizontalCircleOutline,
        sadOutline,
        happyOutline,
        starOutline
    } from 'ionicons/icons';
    import {
        alertController,
        toastController
    } from '@ionic/vue';
    import {
        defineComponent
    } from 'vue';
    
    import axios from 'axios';
    
    export default defineComponent({
        components: {
            IonPage,
            IonContent,
            IonToolbar,
            IonTitle,
            IonGrid,
            IonRow,
            IonCol,
            IonButton,
            IonInput,
            IonIcon,
            IonDatetime
        },
        setup() {
            const selectedRating = ref(0);
            const sadIcon = sadOutline;
            const disappointedIcon = ellipsisHorizontalCircleOutline;
            const neutralIcon = sadOutline;
            const happyIcon = happyOutline;
            const veryHappyIcon = happy;
            const commentData = ref({
                success: false
            });
            const serviceData = ref(null);
            const route = useRoute();
            const router = useRouter();
            const loading = ref(true);
            const showDatePicker = ref(false);
            const datetime = ref(null);
            const comment = ref('')
            const pred = ref('')
    
            const openRescheduleDatePicker = () => {
                showDatePicker.value = true;
            };
    
            const closeDatePicker = () => {
                showDatePicker.value = false;
            };
            const goToService = () => {
                router.push(`/payment/${route.params.id}`);
            }
    
            const confirmDatePicker = async () => {
                const selectedDate = datetime.value; // Asegúrate de que datetime tiene el valor correcto
                console.log("Date: ", selectedDate)
                if (!selectedDate) {
                    showToast('Please select a valid date.', 'danger');
                    return;
                }
    
                const datos = {
                    newDate: selectedDate
                };
    
                try {
                    const {
                        data
                    } = await api.put(`/schedule/rescheduleservice/${route.params.id}`, datos);
                    if (data.success) {
                        showToast('Service rescheduled successfully!', 'success');
                        closeDatePicker();
                    } else {
                        showToast('Error rescheduling service.', 'danger');
                    }
                } catch (error) {
                    showToast('Error rescheduling service.', 'danger');
                }
            };
    
            const fetchScheduleData = async () => {
                try {
                    const {
                        data
                    } = await api.get(`/schedule/scheduleservice/${route.params.id}`);
                    console.log(data)
                    serviceData.value = data.scheduledService;
                    if (data.scheduledService.status === 'finish') {
                        const {
                            data: commentRes
                        } = await api.get(`/comment/getCommentByScheduledId/${route.params.id}`);
                        if (commentRes.success) {
                            commentData.value = commentRes;
                        }
                    }
                    loading.value = false;
                } catch (error) {
                    console.error('Error al obtener datos del servicio:', error);
                }
            };
    
            const formatDate = (dateString: string) => {
                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                };
                return new Date(dateString).toLocaleDateString('en-US', options);
            };
    
            const selectRating = (rating: number) => {
                selectedRating.value = rating;
            };
    
            const confirmCancel = async () => {
                const alert = await alertController.create({
                    header: 'Confirm Cancel',
                    message: 'Are you sure you want to cancel this service?',
                    buttons: [{
                            text: 'No',
                            role: 'cancel'
                        },
                        {
                            text: 'Yes',
                            handler: async () => {
                                await cancelService();
                            }
                        }
                    ]
                });
                await alert.present();
            };
    
            const cancelService = async () => {
                try {
                    const {
                        data
                    } = await api.put(`/schedule/cancel/${route.params.id}`);
                    console.log(data)
                    if (data.success) {
                        showToast('Service canceled successfully!', 'success');
                    } else {
                        showToast('Error canceling service.', 'danger');
                    }
                } catch (error) {
                    showToast('Error canceling service.', 'danger');
                }
            };
    
            const showToast = async (message: string, color: string) => {
                const toast = await toastController.create({
                    message,
                    duration: 2000,
                    color
                });
                await toast.present();
            };
    
            const sendComment = async () => {
                try {
                    if(!comment.value){
                        alert("Please leave a comment")
                    }
                    if(selectedRating.value <= 0){
                        alert("Please select a rating")
                    }
                    console.log(comment.value)
                    const {
                        data: translate
                    } = await axios.get(`https://api.mymemory.translated.net/get?q=${comment.value}&langpair=es-ES|en-GB`)
                    const translation = translate.responseData.translatedText;
                    const {
                        data: prediccion
                    } = await axios.post('https://sentiments-and-recomendatios.onrender.com/predict/comment', {
                        comment: translation
                    });
    
                    const category = prediccion.prediction
                    
                    
                    if (category === 1) {
                        pred.value = "Thanks for the good comment, we strive to offer the best service"
                    } else if (category == 0) {
                        pred.value = "We apologize if something went wrong, we will take it into account for next time, thank you"
                    } else {
                        pred.value = "Thank you very much for your opinion on the service"
                    }
    
                    const datos = {
                        comment: comment.value,
                        rating: selectedRating.value,
                        scheduleservice: route.params.id,
                        category
                    }
                    console.log(datos)
                    // const {
                    //     data
                    // } = await api.post('/comment/add', datos)
                    // console.log(data)
                    // if (data.success) {
                    //     alert(pred.value)
                    // } else {
                    //     alert("Mal")
                    // }
                } catch (error) {
                    console.log(error)
                }
            }
    
            onMounted(() => {
                fetchScheduleData();
            });
            
            watch(() => route.params.id, () => {
                fetchScheduleData();
            });
            
    
            return {
                selectedRating,
                sadIcon,
                disappointedIcon,
                neutralIcon,
                happyIcon,
                veryHappyIcon,
                sendIcon: send,
                selectRating,
                starOutline,
                commentData,
                serviceData,
                formatDate,
                loading,
                confirmCancel,
                showDatePicker,
                datetime,
                comment,
                openRescheduleDatePicker,
                closeDatePicker,
                confirmDatePicker,
                sendComment,
                pred,
                goToService
            };
        },
    });
    </script>
    
    <style scoped>
    /* Personalizando algunos estilos */
    .comment-input {
        width: 100%;
        height: 36px;
        background-color: #f0f8f0;
        border-radius: 8px;
        font-size: 1rem;
    }
    
    .comment-input::placeholder {
        color: #86A286;
        text-align: left;
    }
    
    .items-center {
        align-items: center;
    }
    
    .text-[#86A286] {
        color: #86A286;
    }
    </style>
    