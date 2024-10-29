<template>
  <IonPage>
      <IonContent>
          <IonGrid class="payment-container">
              <IonRow>
                  <IonCol size="12">
                      <h2 class="ion-text-center">Selecciona un método de pago</h2>
                  </IonCol>
              </IonRow>

              <!-- Grupo de Radio para seleccionar método de pago -->
              <IonRow>
                  <IonCol size="12" size-md="8" offset-md="2">
                      <ion-list>
                          <ion-radio-group v-model="selectedPaymentMethod">
                              <ion-item>
                                  <IonLabel>Credit Debit Card</IonLabel>
                                  <ion-radio slot="start" value="card"></ion-radio>
                              </ion-item>
                              <ion-item>
                                  <IonLabel>PayPal</IonLabel>
                                  <ion-radio slot="start" value="paypal"></ion-radio>
                              </ion-item>
                              <ion-item>
                                  <IonLabel>Apple Pay</IonLabel>
                                  <ion-radio slot="start" value="apple-pay"></ion-radio>
                              </ion-item>
                              <ion-item>
                                  <IonLabel>Google Pay</IonLabel>
                                  <ion-radio slot="start" value="google-pay"></ion-radio>
                              </ion-item>
                          </ion-radio-group>
                      </ion-list>
                  </IonCol>
              </IonRow>

              <!-- Mostrar el formulario correspondiente al método seleccionado -->
              <IonRow>
                  <IonCol size="12" size-md="8" offset-md="2">
                    <div v-show="selectedPaymentMethod === 'card'">
                        
                        <form @submit.prevent="handleStripePayment">
                            <label for="card-element">Tarjeta de crédito/débito</label>
                            <div id="card-element"></div>
                            <IonButton expand="block" type="submit">Pagar con tarjeta</IonButton>
                        </form>
                    </div>



                      <!-- Contenedor del botón de PayPal siempre está presente, pero oculto si no es seleccionado -->
                      <div v-show="selectedPaymentMethod === 'paypal'">
                          <!-- Botón de PayPal -->
                          <div id="paypal-button-container"></div>
                      </div>

                      <div v-show="selectedPaymentMethod === 'apple-pay' || selectedPaymentMethod === 'google-pay'">
                          <!-- Botón de Apple Pay / Google Pay -->
                          <div id="payment-request-button"></div>
                      </div>
                  </IonCol>
              </IonRow>
          </IonGrid>
      </IonContent>
  </IonPage>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  watch
} from "vue";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonLabel,
  IonList
} from "@ionic/vue";
import {
  loadStripe,
  StripeCardElement 
} from "@stripe/stripe-js";

export default defineComponent({
  components: {
      IonPage,
      IonContent,
      IonGrid,
      IonRow,
      IonCol,
      IonButton,
      IonRadioGroup,
      IonRadio,
      IonItem,
      IonLabel,
      IonList
  },
  setup() {
      const selectedPaymentMethod = ref('card');
      const stripe = ref<any>(null);
      const cardElement = ref<StripeCardElement | null>(null);
      const paymentRequest = ref<any>(null);

      // Función para cargar dinámicamente el script de PayPal
      const loadPayPalScript = () => {
          return new Promise<void>((resolve) => {
              const script = document.createElement('script');
              script.src = 'https://www.paypal.com/sdk/js?client-id=AfOuWCGm02PBc-nT5eA3DrWwE4_YT-kqE7G0Vd_RTKIlHpDWpiE3Qui9UMxUkRxPdUkMaGJj8m_4Eg1X';
              script.addEventListener('load', () => resolve());
              document.body.appendChild(script);
          });
      };

      const renderPayPalButton = async () => {
          const paypal = (window as any).paypal;
          if (!paypal) {
              console.error("PayPal SDK not loaded.");
              return;
          }

          paypal.Buttons({
              createOrder: (data: any, actions: any) => {
                  return actions.order.create({
                      purchase_units: [{
                          amount: {
                              currency_code: 'USD',
                              value: "100.00"
                          }
                      }]
                  });
              },
              onApprove: async (data: any, actions: any) => {
                  const order = await actions.order.capture();
                  console.log(order);

                  const paymentDetails = {
                      user: "userId",
                      amount: 100,
                      scheduleService: "Servicio de ejemplo",
                      type: 'PayPal',
                      paypalOrderId: order.id,
                      paypalPayerId: order.payer.payer_id
                  };

                  sendPaymentToBackend(paymentDetails);
              },
              onError: (err: any) => {
                  console.error("Error en PayPal", err);
              }
          }).render('#paypal-button-container');
      };

      // Observa cuando se selecciona PayPal para cargar el script y renderizar el botón
      watch(selectedPaymentMethod, async (newMethod) => {
          if (newMethod === "paypal") {
              await loadPayPalScript();
              // Esperar a que el DOM tenga el contenedor de PayPal antes de intentar renderizar el botón
              setTimeout(() => {
                  renderPayPalButton();
              }, 100); // Dar tiempo al DOM para actualizarse
          }
      });

      onMounted(async () => {
          stripe.value = await loadStripe("pk_test_51Q5aH7AXipH64sKmHbNWE8XRQ8syr2gEoTQg6Tnd6VDVjr771xrdqLhtKTGK4jOekNhZUTjazELF92jF0fqNHJHa00xPThmI9F");
          if (stripe.value) {
              const elements = stripe.value.elements();
              cardElement.value = elements.create("card");
              cardElement.value?.mount("#card-element");

              paymentRequest.value = stripe.value.paymentRequest({
                  country: "US",
                  currency: "usd",
                  total: {
                      label: "Pago por servicio",
                      amount: 5000, // En centavos (50.00 USD)
                  },
                  requestPayerName: true,
                  requestPayerEmail: true,
              });

              const prButton = elements.create("paymentRequestButton", {
                  paymentRequest: paymentRequest.value,
              });

              paymentRequest.value.canMakePayment().then((result: any) => {
                  const paymentRequestButton = document.getElementById("payment-request-button");
                  if (result && paymentRequestButton) {
                      prButton.mount("#payment-request-button");
                  } else if (paymentRequestButton) {
                      paymentRequestButton.style.display = "none";
                  }
              });
          }
      });

      const handleStripePayment = async () => {
          const {
              paymentMethod,
              error
          } = await stripe.value.createPaymentMethod({
              type: "card",
              card: cardElement.value!,
          });

          if (error) {
              console.error("Error en el pago:", error);
          } else {
              console.log("Método de pago creado:", paymentMethod);
              sendPaymentToBackend(paymentMethod);
          }
      };

      const sendPaymentToBackend = (paymentData: any) => {
          const data = {
              user: "userId",
              amount: 100,
              scheduleService: "Servicio de ejemplo",
              type: paymentData.type || "PayPal",
              paymentId: paymentData.id,
          };
          console.log(data)

          
      };

      return {
          selectedPaymentMethod,
          handleStripePayment,
      };
  },
});
</script>

<style scoped>
.payment-container {
  padding: 20px;
}

#card-element {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
}

.stripe-button {
  background-color: #6772e5;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

#payment-request-button {
  margin-bottom: 20px;
}

#paypal-button-container {
  margin-top: 20px;
}
</style>
