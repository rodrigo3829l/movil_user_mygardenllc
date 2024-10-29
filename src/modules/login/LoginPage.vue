<template>
<IonPage>
    <IonContent fullscreen>
        <!-- Mostrar el IonProgressBar solo cuando loading sea true -->
        <ion-progress-bar v-if="loading" type="indeterminate" class="fade-in"></ion-progress-bar>

        <!-- Imagen de fondo en la parte superior, ocupando todo el ancho -->
        <div class="h-96 bg-cover bg-center" style="background-image: url('https://res.cloudinary.com/dui4i9f4e/image/upload/v1697990498/logos/p3xyl9xetmmg6vlamwkt.jpg');"></div>

        <!-- Grid para el contenido -->
        <IonGrid>
            <!-- Bienvenida y formulario de login -->
            <IonRow class="justify-center">
                <IonCol size="12" class="text-center">
                    <h1 class="text-2xl font-bold mt-5">Welcome back</h1>
                </IonCol>
            </IonRow>

            <IonRow class="justify-center">
                <IonCol size="12" size-md="8">
                    <!-- Input para el correo con label -->
                    <IonInput placeholder="Email" label="Email" labelPlacement="floating" type="email" v-model="email"></IonInput><br>

                    <!-- Input para la contraseña con label e ícono de ojo más grande -->
                    <IonInput placeholder="Password" label="Password" labelPlacement="floating" :type="showPassword ? 'text' : 'password'" v-model="password">
                        <IonIcon slot="end" :icon="showPassword ? 'eye' : 'eye-off'" aria-hidden="true" class="text-2xl" @click="togglePasswordVisibility"></IonIcon>
                        <!-- <IonIcon :icon="showPassword ? 'eye' : 'eye-off'" class="text-3xl transition-transform duration-300" :class="{'rotate-180': showPassword}" @click="togglePasswordVisibility"></IonIcon> -->

                    </IonInput><br>

                    <!-- Enlace de Forgot Password alineado a la izquierda -->
                    <IonText>
                        <a href="https://mygardenllcservices.com/login/mail" target="_blank" class="text-sm text-[#86A286] block mt-2">Forgot password?</a>
                    </IonText><br>

                    <!-- Botón de iniciar sesión con disabled basado en el estado de loading -->
                    <IonButton expand="block" type="submit" @click="handleLogin" :disabled="loading">
                        <span v-if="!loading">Log in</span>
                        <ion-spinner v-else name="dots"></ion-spinner>
                    </IonButton>
                    <br>

                    <!-- Enlace de registro alineado al centro -->
                    <IonRow class="justify-center">
                        <IonText>
                            <p class="text-sm text-black">
                                New user? <a href="https://mygardenllcservices.com/login/reistration" target="_blank" class="font-bold text-[#86A286]">Sign Up</a>
                            </p>
                        </IonText>
                    </IonRow>
                </IonCol>
            </IonRow>
        </IonGrid>
    </IonContent>
</IonPage>
</template>

  
<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue';
import {
    useAuthStore
} from '@/store/index'; // Usa el store de Pinia
import {
    IonPage,
    IonContent,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    IonText,
    IonInput,
    IonIcon,
    IonProgressBar,
    IonSpinner
} from '@ionic/vue';


import {
    eye,
    eyeOff
} from 'ionicons/icons';
export default defineComponent({
    components: {
        IonPage,
        IonContent,
        IonButton,
        IonCol,
        IonRow,
        IonGrid,
        IonText,
        IonInput,
        IonIcon,
        IonProgressBar,
        IonSpinner
    },
    setup() {
        const showPassword = ref(false);
        const email = ref('');
        const password = ref('');
        const loading = ref(false);
        const authStore = useAuthStore();

        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
        };

        const handleLogin = async () => {
            if (!email.value || !password.value) {
                alert('Please enter your email and password.');
                return;
            }

            loading.value = true;
            try {
                const response = await authStore.login(email.value, password.value, 'client');
                console.log(response);
                loading.value = false;

                if (response.exito) {
                    window.location.replace('/home');
                } else {
                    alert(response.error);
                }
            } catch (error) {
                loading.value = false;
                alert('An error occurred during login.');
            }
        };

        return {
            showPassword,
            togglePasswordVisibility,
            email,
            password,
            handleLogin,
            loading,
            eye,
            eyeOff
        };
    }
});
</script>

<style scoped>
.fade-in {
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

</style>