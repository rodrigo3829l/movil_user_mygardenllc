<template>
  <IonPage>
    <IonContent fullscreen>
      <!-- Imagen de fondo -->
      <div
        class="relative h-[500px] bg-cover bg-center"
        style="
          background-image: url(&quot;https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5--8IGy0OGa8nmcYwbg6XvPxtOVd4sauvrg&s&quot;);
        "
      >
        <!-- Icono de flecha atrás -->
        <IonIcon
          name="arrow-back-outline"
          class="absolute top-5 left-5 text-black text-2xl"
        ></IonIcon>

        <!-- Texto de bienvenida centrado -->
        <div
          class="absolute inset-0 flex flex-col items-center justify-center px-5"
        >
          <h1 class="text-white text-4xl font-bold mb-2 text-center">
            Welcome to My Garden
          </h1>
          <p class="text-white text-lg mb-4 text-center">
            Get ready to explore the world of gardening with us.
          </p>

          <!-- Botón verde con estilos globales -->
          <IonButton class="w-full max-w-xs">Get Started</IonButton>
        </div>
      </div>

      <!-- Sección de About Us -->
      <div class="px-5 py-8">
        <h2 class="text-3xl font-bold">About Us</h2>
        <p class="mt-2 text-gray-600">
          My Garden LLC is a modern gardening company that provides high-quality
          plants and gardening services. Our mission is to help our customers
          create beautiful and sustainable outdoor spaces. We are committed to
          offering the best products, fast delivery, and excellent customer
          support.
        </p>
      </div>

      <!-- Sección de Why Choose Us -->
      <div class="px-5 py-8">
        <h2 class="text-2xl font-bold">Why Choose Us</h2>
        <IonGrid>
          <IonRow class="justify-center">
            <IonCol size="12" size-sm="6" size-md="4" class="ion-padding">
              <div class="border border-gray-300 rounded-lg p-4">
                <IonIcon name="people-outline" class="text-3xl"></IonIcon>
                <h3 class="text-lg font-bold mt-2">Expert Team</h3>
                <p class="mt-2 text-[#86A286]">
                  Our team of experienced gardeners is dedicated to helping you
                  achieve your gardening goals.
                </p>
              </div>
            </IonCol>

            <IonCol size="12" size-sm="6" size-md="4" class="ion-padding">
              <div class="border border-gray-300 rounded-lg p-4">
                <IonIcon name="cash-outline" class="text-3xl"></IonIcon>
                <h3 class="text-lg font-bold mt-2">Affordable Pricing</h3>
                <p class="mt-2 text-[#86A286]">
                  We offer competitive prices without compromising on quality.
                </p>
              </div>
            </IonCol>

            <IonCol size="12" size-sm="6" size-md="4" class="ion-padding">
              <div class="border border-gray-300 rounded-lg p-4">
                <IonIcon name="star-outline" class="text-3xl"></IonIcon>
                <h3 class="text-lg font-bold mt-2">High Satisfaction</h3>
                <p class="mt-2 text-[#86A286]">
                  We prioritize customer satisfaction and go the extra mile to
                  ensure you're happy with our products and services.
                </p>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>

      <!-- Sección de Most Booked Services (con Swiper.js) -->
      <div class="px-5">
        <h2 class="text-2xl font-bold">Most Booked Services</h2>
        <!-- Swiper con servicios sin flechas y autoplay de 1500ms -->
        <swiper :loop="true" :autoplay="{ delay: 1500 }" class="mySwiper">
          <swiper-slide v-for="(service, index) in usableServices" :key="index">
            <BookedServices :service="service" />
          </swiper-slide>
        </swiper>
      </div>

      <!-- Sección de Customer Reviews con Infinite Scroll -->
      <div class="px-5 py-8">
        <h2 class="text-2xl font-bold">Customer Reviews</h2>

        <ion-infinite-scroll threshold="100px" @ionInfinite="loadMoreComments">
          <ion-infinite-scroll-content loading-text="Loading more reviews...">
            <div
              v-for="comment in displayedComments"
              :key="comment._id"
              class="mb-4"
            >
              <CommentsServices :comment="comment" />
            </div>
          </ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import {
  IonPage,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue"; // Importamos los componentes de Swiper
import "swiper/css"; // Importamos los estilos de Swiper
import SwiperCore, { Autoplay } from "swiper"; // Importamos solo el módulo Autoplay de Swiper
import api from "@/axios/axios"; // Importamos la instancia de Axios

// Registrar el módulo Autoplay
SwiperCore.use([Autoplay]);

import { defineAsyncComponent } from "vue";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    Swiper,
    SwiperSlide,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    BookedServices: defineAsyncComponent(
      () => import("@/components/BookedServices.vue"),
    ),
    CommentsServices: defineAsyncComponent(
      () => import("@/components/CommentsHome.vue"),
    ),
  },
  setup() {
    const services = ref([]); // Array para almacenar los servicios
    const usableServices = ref([]); // Array para los servicios donde isUsable es true
    const comments = ref([]); // Array para almacenar los comentarios
    const displayedComments = ref([]); // Array para los comentarios que se muestran
    const commentsPerPage = 2; // Número de comentarios por página
    let currentPage = 1;

    // Función para obtener los servicios
    const fetchServices = async () => {
      try {
        const { data } = await api.get("/services/get");
        services.value = data.services;

        // Filtramos los servicios donde isUsable es true
        usableServices.value = services.value.filter(
          (service) => service.isUsable,
        );
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    // Función para obtener los comentarios
    const fetchComments = async () => {
      try {
        const { data } = await api.get("/comment/rating");
        comments.value = data.comments;

        // Mostrar la primera página de comentarios
        loadMoreComments();
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    // Función para cargar más comentarios con Infinite Scroll
    const loadMoreComments = (ev?: any) => {
      const start = (currentPage - 1) * commentsPerPage;
      const end = start + commentsPerPage;

      displayedComments.value.push(...comments.value.slice(start, end));

      currentPage++;

      if (ev) {
        setTimeout(() => ev.target.complete(), 500);
      }
    };

    // Ejecutar las funciones al montar el componente
    onMounted(() => {
      fetchServices();
      fetchComments();
    });

    return {
      usableServices,
      displayedComments,
      loadMoreComments,
    };
  },
});
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 280px;
  /* height: auto; */
}
</style>
