<template>
  <IonPage>
    <div v-if="loading">
        <ion-progress-bar type="indeterminate"></ion-progress-bar>
    </div>
    <IonContent v-else>
      <IonToolbar>
        <IonTitle>Payment Method</IonTitle>
      </IonToolbar>

      <!-- Service Summary -->
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Service Summary</h2>
          <p class="text-gray-500">
            ${{ selectedPercentage === '50%' ? (serviceData.quote / 2).toFixed(2) : serviceData.quote.toFixed(2) }}
          </p>
        </div>
        <div class="relative w-full h-2 bg-gray-200 rounded-full mb-4">
          <div
            :class="{
              'bg-green-600 h-2 rounded-full': true, 
              'w-1/2': selectedPercentage === '50%' && !hide50PercentOption,
              'w-full': selectedPercentage === '100%',
            }"
          ></div>
        </div>

        <!-- Selección de porcentaje de pago -->
        <IonList v-if="!hide50PercentOption">
          <IonRadioGroup v-model="selectedPercentage">
            <IonItem class="custom-radio-item">
              <div class="flex justify-between w-full">
                <p>50% Payment</p>
                <p>${{ (serviceData.quote / 2).toFixed(2) }}</p>
              </div>
              <IonRadio slot="end" value="50%" class="custom-radio" />
            </IonItem>
            <IonItem class="custom-radio-item">
              <div class="flex justify-between w-full">
                <p>100% Payment</p>
                <p>${{ serviceData.quote.toFixed(2) }}</p>
              </div>
              <IonRadio slot="end" value="100%" class="custom-radio" />
            </IonItem>
          </IonRadioGroup>
        </IonList>

        <IonList v-else>
          <IonItem class="custom-radio-item">
            <div class="flex justify-between w-full">
              <p>Pay Remaining</p>
              <p>${{ serviceData.pending.toFixed(2) }}</p>
            </div>
            <IonRadio slot="end" value="100%" class="custom-radio" checked />
          </IonItem>
        </IonList>

        <!-- Pay Now -->
        <div class="flex justify-between items-center mt-4 px-4">
          <p class="text-lg font-semibold">Pay Now</p>
          <p class="text-lg font-semibold text-green-600">${{ payNowAmount }}</p>
        </div>
      </div>

      <!-- Métodos de pago -->
      <div class="p-4" v-if="!loading">
        <h2 class="text-lg font-semibold mb-2">Choose payment method</h2>
        <IonList>
          <IonRadioGroup v-model="selectedPaymentMethod">
            <IonItem class="custom-radio-item">
              <div class="flex justify-between w-full">
                <p>Credit/Debit Card</p>
                <IonRadio slot="end" value="card" class="custom-radio" />
              </div>
            </IonItem>
            <IonItem class="custom-radio-item">
              <div class="flex justify-between w-full">
                <p>PayPal</p>
                <IonRadio slot="end" value="paypal" class="custom-radio" />
              </div>
            </IonItem>
            <IonItem class="custom-radio-item">
              <div class="flex justify-between w-full">
                <p>Apple Pay</p>
                <IonRadio slot="end" value="apple-pay" class="custom-radio" />
              </div>
            </IonItem>
            <IonItem class="custom-radio-item">
              <div class="flex justify-between w-full">
                <p>Google Pay</p>
                <IonRadio slot="end" value="google-pay" class="custom-radio" />
              </div>
            </IonItem>
          </IonRadioGroup>
        </IonList>

        <!-- Formulario para los métodos de pago -->
        <!-- Formulario para los métodos de pago -->
        <div v-show="selectedPaymentMethod === 'card'">
          <!-- Formulario de Stripe -->
          <form @submit.prevent="handleStripePayment">
            <label for="card-element">Tarjeta de crédito/débito</label>
            <div id="card-element"></div>
            <IonButton expand="block" type="submit" @click="handleStripePayment">Pagar con tarjeta</IonButton>
          </form>
        </div>


        <div v-show="selectedPaymentMethod === 'paypal'">
          <!-- Botón de PayPal -->
          <div id="paypal-button-container"></div>
        </div>

        <div v-show="selectedPaymentMethod === 'apple-pay' || selectedPaymentMethod === 'google-pay'">
          <!-- Botón de Apple Pay / Google Pay -->
          <div id="payment-request-button"></div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch, nextTick } from 'vue';
import { IonPage, IonContent, IonToolbar, IonTitle, IonList, IonRadioGroup, IonItem, IonRadio, IonButton, IonProgressBar } from '@ionic/vue';
import api from '@/axios/axios';
import { useRoute, useRouter } from 'vue-router';
import { loadStripe, StripeCardElement } from '@stripe/stripe-js';
import { Preferences } from '@capacitor/preferences';

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonToolbar,
    IonTitle,
    IonList,
    IonRadioGroup,
    IonItem,
    IonRadio,
    IonButton,
    IonProgressBar
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const serviceData = ref<any>(null);
    const selectedPercentage = ref('50%');
    const selectedPaymentMethod = ref('');
    const hide50PercentOption = ref(false);
    const stripe = ref<any>(null);
    const cardElement = ref<StripeCardElement | null>(null);
    const paymentRequest = ref<any>(null);
    const loading = ref(true);

    const payNowAmount = computed(() =>
      selectedPercentage.value === '50%'
        ? (serviceData.value?.quote / 2).toFixed(2)
        : serviceData.value?.pending.toFixed(2)
    );

    const fetchServiceData = async () => {
      try {
        const { data } = await api.get(`/schedule/scheduleservice/${route.params.id}`);
        serviceData.value = data.scheduledService;
        hide50PercentOption.value = serviceData.value.pending <= serviceData.value.quote / 2;
        selectedPercentage.value = hide50PercentOption.value ? '100%' : '50%';
      } catch (error) {
        console.error('Error fetching service data:', error);
      } finally {
        loading.value = false;
      }
    };

    const setupStripe = async () => {
      stripe.value = await loadStripe('pk_test_51Q5aH7...');
      if (stripe.value) {
        await nextTick();
        const elements = stripe.value.elements();
        cardElement.value = elements.create('card');
        const cardContainer = document.getElementById('card-element');
        cardContainer ? cardElement.value.mount('#card-element') : console.error('No #card-element found');
      }
    };

    const handleStripePayment = async () => {
      try {
        const { paymentMethod, error } = await stripe.value.createPaymentMethod({ type: 'card', card: cardElement.value! });
        if (error) throw error;
        await sendPaymentToBackend(paymentMethod);
      } catch (error) {
        console.error('Payment error:', error);
      }
    };

    const sendPaymentToBackend = async (paymentData: any) => {
      try {
        const { value: token } = await Preferences.get({ key: 'token' });
        const paymentDetails = {
          user: token,
          mount: parseFloat(payNowAmount.value),
          scheduleService: route.params.id,
          type: '65d9c9eda4ee265c1c861501',
          paypalOrderId: paymentData.id
        };
        const { data } = await api.post('/pays/pay', paymentDetails);
        data.success ? router.push(`/my-service/${route.params.id}`) : alert('Payment failed');
      } catch (error) {
        console.error('Error sending payment:', error);
      }
    };

    const loadPayPalScript = () =>
      new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://www.paypal.com/sdk/js?client-id=AfOuWCGm02PBc...';
        script.onload = () => resolve();
        document.body.appendChild(script);
      });

    const renderPayPalButton = async () => {
      const paypal = (window as any).paypal;
      if (!paypal) return console.error('PayPal SDK not loaded');
      paypal.Buttons({
        createOrder: (data: any, actions: any) =>
          actions.order.create({ purchase_units: [{ amount: { currency_code: 'USD', value: payNowAmount.value } }] }),
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          await sendPaymentToBackend({ type: 'PayPal', ...order });
        },
        onError: (err: any) => console.error('PayPal Error:', err)
      }).render('#paypal-button-container');
    };

    watch(selectedPaymentMethod, async (newMethod) => {
      if (newMethod === 'paypal') {
        await loadPayPalScript();
        setTimeout(() => renderPayPalButton(), 100);
      } else if (newMethod === 'card') {
        await setupStripe();
      }
    });

    watch(() => route.params.id, fetchServiceData);

    onMounted(() => {
      fetchServiceData();
      setupStripe();
    });

    return {
      selectedPercentage,
      selectedPaymentMethod,
      payNowAmount,
      handleStripePayment,
      loading,
      serviceData,
      hide50PercentOption
    };
  }
});
</script>


<style scoped>
.custom-radio-item {
  border: 2px solid #a6d5a6; /* Color verde más oscuro */
  border-radius: 12px;
  padding: 6px; /* Reducido para hacer menos altos los contenedores */
  margin-bottom: 8px;
  height: 50px; /* Controlamos la altura manualmente */
  display: flex;
  align-items: center; /* Asegura que el contenido esté centrado verticalmente */
}

/* Eliminar la línea gris por defecto debajo del IonItem */
ion-item::part(native) {
  border: none !important;
  box-shadow: none !important;
}

.custom-radio-item ion-radio {
  --border-radius: 50%;
  --color-checked: #63ba76;
}

.custom-radio {
  --color: #63ba76; /* Color verde más oscuro */
}
#card-element {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
}

</style>
