<template>
  <IonPage>
    <div v-if="loading">
<<<<<<< HEAD
        <ion-progress-bar type="indeterminate"></ion-progress-bar>
=======
      <ion-progress-bar type="indeterminate"></ion-progress-bar>
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
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
<<<<<<< HEAD
            ${{ selectedPercentage === '50%' ? (serviceData.quote / 2).toFixed(2) : serviceData.quote.toFixed(2) }}
=======
            ${{
              selectedPercentage === "50%"
                ? (serviceData.quote / 2).toFixed(2)
                : serviceData.quote.toFixed(2)
            }}
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
          </p>
        </div>
        <div class="relative w-full h-2 bg-gray-200 rounded-full mb-4">
          <div
            :class="{
<<<<<<< HEAD
              'bg-green-600 h-2 rounded-full': true, 
=======
              'bg-green-600 h-2 rounded-full': true,
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
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
<<<<<<< HEAD
          <p class="text-lg font-semibold text-green-600">${{ payNowAmount }}</p>
=======
          <p class="text-lg font-semibold text-green-600">
            ${{ payNowAmount }}
          </p>
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
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
<<<<<<< HEAD
            <IonButton expand="block" type="submit" @click="handleStripePayment">Pagar con tarjeta</IonButton>
          </form>
        </div>


=======
            <IonButton expand="block" type="submit" @click="handleStripePayment"
              >Pagar con tarjeta</IonButton
            >
          </form>
        </div>

>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
        <div v-show="selectedPaymentMethod === 'paypal'">
          <!-- Botón de PayPal -->
          <div id="paypal-button-container"></div>
        </div>

<<<<<<< HEAD
        <div v-show="selectedPaymentMethod === 'apple-pay' || selectedPaymentMethod === 'google-pay'">
=======
        <div
          v-show="
            selectedPaymentMethod === 'apple-pay' ||
            selectedPaymentMethod === 'google-pay'
          "
        >
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
          <!-- Botón de Apple Pay / Google Pay -->
          <div id="payment-request-button"></div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
<<<<<<< HEAD
import { defineComponent, ref, computed, onMounted, watch, nextTick } from 'vue';
import { IonPage, IonContent, IonToolbar, IonTitle, IonList, IonRadioGroup, IonItem, IonRadio, IonButton, IonProgressBar } from '@ionic/vue';
import api from '@/axios/axios';
import { useRoute, useRouter } from 'vue-router';
import { loadStripe, StripeCardElement } from '@stripe/stripe-js';
import { Preferences } from '@capacitor/preferences';

=======
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import {
  IonPage,
  IonContent,
  IonToolbar,
  IonTitle,
  IonList,
  IonRadioGroup,
  IonItem,
  IonRadio,
  IonButton,
  IonProgressBar,
} from "@ionic/vue";
import api from "@/axios/axios";
import { useRoute, useRouter } from "vue-router";
import { loadStripe, StripeCardElement } from "@stripe/stripe-js";
import { nextTick } from "vue";
import { Preferences } from "@capacitor/preferences";
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
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
<<<<<<< HEAD
    IonProgressBar
=======
    IonProgressBar,
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
<<<<<<< HEAD
    const serviceData = ref<any>(null);
    const selectedPercentage = ref('50%');
    const selectedPaymentMethod = ref('');
=======
    const serviceData = ref(null);
    const selectedPercentage = ref("50%");
    const selectedPaymentMethod = ref("");
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
    const hide50PercentOption = ref(false);
    const stripe = ref<any>(null);
    const cardElement = ref<StripeCardElement | null>(null);
    const paymentRequest = ref<any>(null);
<<<<<<< HEAD
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
=======
    const loading = ref(true); // Variable para el estado de carga

    const payNowAmount = computed(() => {
      if (!serviceData.value) {
        return 0; // Si no hay datos de servicio, devuelve 0
      }
      return selectedPercentage.value === "50%"
        ? (serviceData.value.quote / 2).toFixed(2)
        : serviceData.value.pending.toFixed(2);
    });

    const fetchServiceData = async () => {
      try {
        const { data } = await api.get(
          `/schedule/scheduleservice/${route.params.id}`,
        );
        console.log(data);
        serviceData.value = data.scheduledService;
        console.log(serviceData.value.quote);

        if (serviceData.value.pending <= serviceData.value.quote / 2) {
          hide50PercentOption.value = true;
          selectedPercentage.value = "100%";
        }

        loading.value = false; // Desactivar la barra de progreso cuando la petición se complete
      } catch (error) {
        console.error("Error fetching service data:", error);
        loading.value = false; // Desactivar la barra de progreso en caso de error
      }
    };

    // Stripe payment logic
    onMounted(async () => {
      stripe.value = await loadStripe(
        "pk_test_51Q5aH7AXipH64sKmHbNWE8XRQ8syr2gEoTQg6Tnd6VDVjr771xrdqLhtKTGK4jOekNhZUTjazELF92jF0fqNHJHa00xPThmI9F",
      );
      if (stripe.value) {
        const elements = stripe.value.elements();
        cardElement.value = elements.create("card");
        cardElement.value?.mount("#card-element");

        paymentRequest.value = stripe.value.paymentRequest({
          country: "US",
          currency: "usd",
          total: {
            label: "Pago por servicio",
            amount: parseFloat(payNowAmount.value) * 100, // Monto dinámico en centavos
          },
          requestPayerName: true,
          requestPayerEmail: true,
        });

        const prButton = elements.create("paymentRequestButton", {
          paymentRequest: paymentRequest.value,
        });

        paymentRequest.value.canMakePayment().then((result: any) => {
          const paymentRequestButton = document.getElementById(
            "payment-request-button",
          );
          if (result && paymentRequestButton) {
            prButton.mount("#payment-request-button");
          } else if (paymentRequestButton) {
            paymentRequestButton.style.display = "none";
          }
        });
      }
    });

    const handleStripePayment = async () => {
      const { paymentMethod, error } = await stripe.value.createPaymentMethod({
        type: "card",
        card: cardElement.value!,
      });

      if (error) {
        console.error("Error en el pago:", error);
      } else {
        sendPaymentToBackend(paymentMethod, parseFloat(payNowAmount.value)); // Enviar la cantidad correcta
      }
    };
    const setupStripe = async () => {
      stripe.value = await loadStripe(
        "pk_test_51Q5aH7AXipH64sKmHbNWE8XRQ8syr2gEoTQg6Tnd6VDVjr771xrdqLhtKTGK4jOekNhZUTjazELF92jF0fqNHJHa00xPThmI9F",
      );
      if (stripe.value) {
        // Utilizamos nextTick para esperar a que el DOM esté completamente actualizado.
        await nextTick();

        const elements = stripe.value.elements();
        cardElement.value = elements.create("card");

        // Asegúrate de que el elemento existe en el DOM antes de montarlo
        const cardElementContainer = document.getElementById("card-element");
        if (cardElementContainer) {
          cardElement.value.mount("#card-element");
          console.log("Stripe card element mounted:", cardElement.value);
        } else {
          console.error("El contenedor de #card-element no existe.");
        }
      }
    };

    const updatePaymentRequest = () => {
      if (paymentRequest.value) {
        paymentRequest.value.update({
          total: {
            label: "Pago por servicio",
            amount: parseFloat(payNowAmount.value) * 100, // Convertir a centavos
          },
        });
      }
    };

    const sendPaymentToBackend = async (paymentData: any, mount: number) => {
      // Obtener el token desde Preferences
      try {
        const { value: token } = await Preferences.get({ key: "token" });

        // Obtener el scheduleService desde los parámetros de la ruta
        const scheduleService = route.params.id;

        // Construir el objeto de datos para enviar al backend
        const paymentDetails = {
          user: token, // Utilizamos el token que viene de Preferences
          mount, // Monto dinámico enviado (ya calculado anteriormente)
          scheduleService, // ID del servicio agendado desde la ruta
          type: "65d9c9eda4ee265c1c861501", // Tipo de pago (Stripe o PayPal)
          paypalOrderId: paymentData.id, // ID del PaymentMethod o OrderId (de Stripe o PayPal)
          paypalPayerId: paymentData.type || "PayPal",
        };

        // Enviar los datos al backend o hacer lo necesario con ellos
        console.log(paymentDetails);

        const { data } = await api.post("/pays/pay", paymentDetails);
        console.log(data);
        if (data.success) {
          router.push(`/my-service/${route.params.id}`);
        } else {
          alert("Payment not efectuaded");
        }
      } catch (error) {
        console.log(error);
      }
    };

    // const sendPaymentToBackend = (paymentData: any, amount: number) => {
    //   const data = {
    //     user: "userId",
    //     amount, // Monto dinámico enviado
    //     scheduleService: "Servicio de ejemplo",
    //     type: paymentData.type || "PayPal",
    //     paymentId: paymentData.id,
    //   };
    //   console.log(data);
    // };

    const loadPayPalScript = () => {
      return new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src =
          "https://www.paypal.com/sdk/js?client-id=AfOuWCGm02PBc-nT5eA3DrWwE4_YT-kqE7G0Vd_RTKIlHpDWpiE3Qui9UMxUkRxPdUkMaGJj8m_4Eg1X";
        script.addEventListener("load", () => resolve());
        document.body.appendChild(script);
      });
    };

    const renderPayPalButton = async () => {
      const paypal = (window as any).paypal;
      if (!paypal) {
        console.error("PayPal SDK not loaded.");
        return;
      }

      paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: payNowAmount.value, // Monto dinámico
                  },
                },
              ],
            });
          },
          onApprove: async (data: any, actions: any) => {
            const order = await actions.order.capture();
            sendPaymentToBackend(
              { type: "PayPal", ...order },
              parseFloat(payNowAmount.value),
            ); // Enviar el monto dinámico al backend
          },
          onError: (err: any) => {
            console.error("Error en PayPal", err);
          },
        })
        .render("#paypal-button-container");
    };

    watch(selectedPaymentMethod, async (newMethod) => {
      if (newMethod === "paypal") {
        await loadPayPalScript();
        setTimeout(() => {
          renderPayPalButton();
        }, 100);
      }
    });

    watch(payNowAmount, () => {
      updatePaymentRequest(); // Actualizar el monto de pago dinámicamente
    });

    watch(selectedPaymentMethod, async (newMethod) => {
      if (newMethod === "card") {
        await setupStripe(); // Ejecuta Stripe solo si el método de pago seleccionado es tarjeta
      }
    });

    watch(
      () => route.params.id,
      () => {
        fetchServiceData();
      },
    );
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e

    onMounted(() => {
      fetchServiceData();
      setupStripe();
    });

    return {
      selectedPercentage,
      selectedPaymentMethod,
      payNowAmount,
      handleStripePayment,
<<<<<<< HEAD
      loading,
      serviceData,
      hide50PercentOption
    };
  }
});
</script>


=======
      loading, // Estado de carga
      serviceData,
      hide50PercentOption,
      stripe,
      cardElement,
      paymentRequest,
      fetchServiceData,
      sendPaymentToBackend,
      loadPayPalScript,
      renderPayPalButton,
      setupStripe,
      updatePaymentRequest,
    };
  },
});
</script>

>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
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
<<<<<<< HEAD

=======
>>>>>>> 7540c70f338af5a141686fdc06ec344b2b51908e
</style>
