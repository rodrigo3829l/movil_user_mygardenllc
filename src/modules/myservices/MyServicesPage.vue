<template>
  <IonPage>
    <IonContent fullscreen>
      <!-- Flecha hacia atrás -->
      <div class="back-button">
        <IonIcon
          name="arrow-back-outline"
          class="text-black text-2xl"
          @click="goBack"
        />
      </div>

      <!-- Toolbar -->
      <IonToolbar>
        <IonTitle>My Services</IonTitle>
      </IonToolbar>

      <!-- Searchbar -->
      <IonSearchbar
        v-model="searchQuery"
        placeholder="Search services"
      ></IonSearchbar>

      <!-- Filtros por status -->
      <div class="filters">
        <!-- Select para filtrar por estado del servicio -->
        <IonItem class="select-container">
          <IonSelect
            label="Service Status"
            v-model="selectedStatus"
            interface="action-sheet"
            :interface-options="actionSheetOptions"
            color="success"
          >
            <IonSelectOption value="all">All</IonSelectOption>
            <IonSelectOption value="development">Development</IonSelectOption>
            <IonSelectOption value="quoted">Quoted</IonSelectOption>
            <IonSelectOption value="canceled">Canceled</IonSelectOption>
            <IonSelectOption value="finish">Finish</IonSelectOption>
            <IonSelectOption value="quoting">Quoting</IonSelectOption>
          </IonSelect>
        </IonItem>
      </div>

      <!-- Lista de servicios con paginación -->
      <IonList v-if="loading">
        <!-- Mostrar 5 skeletons -->
        <SkeletonLoader v-for="n in 5" :key="n" />
      </IonList>
      <IonList v-else>
        <MyServiceComponent
          v-for="(service, index) in paginatedServices"
          :key="index"
          :service="service"
        />
      </IonList>

      <!-- Paginación -->
      <div class="pagination-controls">
        <button
          :disabled="currentPage === 1"
          @click="previousPage"
          class="pagination-arrow"
        >
          <IonIcon name="arrow-back-outline"></IonIcon>
        </button>

        <button
          v-if="currentPage > 2"
          @click="changePage(1)"
          class="pagination-number"
        >
          1
        </button>

        <span v-if="currentPage > 2" class="ellipsis">...</span>

        <button
          v-for="page in paginationRange"
          :key="page"
          @click="changePage(page)"
          :class="['pagination-number', { active: currentPage === page }]"
        >
          {{ page }}
        </button>

        <span v-if="currentPage < totalPages - 2" class="ellipsis">...</span>

        <button
          v-if="currentPage < totalPages - 2"
          @click="changePage(totalPages)"
          class="pagination-number"
        >
          {{ totalPages }}
        </button>

        <button
          :disabled="currentPage === totalPages"
          @click="nextPage"
          class="pagination-arrow"
        >
          <IonIcon name="arrow-forward-outline"></IonIcon>
        </button>
      </div>
    </IonContent>
  </IonPage>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  defineAsyncComponent,
} from "vue";
import {
  IonPage,
  IonContent,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonList,
  IonItem,
  IonIcon,
} from "@ionic/vue";
import MyServiceComponent from "@/components/MyServiceComponent.vue";
import api from "@/axios/axios";
import { Preferences } from "@capacitor/preferences";
import { useRouter } from "vue-router";
const SkeletonLoader = defineAsyncComponent(
  () => import("../../components/SkeletonService.vue"),
);
export default defineComponent({
  components: {
    MyServiceComponent,
    IonPage,
    IonContent,
    IonToolbar,
    IonTitle,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonList,
    IonItem,
    IonIcon,
    SkeletonLoader,
  },
  setup() {
    const router = useRouter();
    const services = ref([]);
    const searchQuery = ref("");
    const selectedStatus = ref("all");
    const currentPage = ref(1);
    const servicesPerPage = 5;
    const loading = ref(true);
    const actionSheetOptions = {
      header: "Choose a service status",
    };

    // Función para volver a la página anterior
    const goBack = () => {
      router.back();
    };

    const fetchServices = async () => {
      try {
        const { value: token } = await Preferences.get({ key: "token" });
        const { value: rol } = await Preferences.get({ key: "rol" });

        if (!token) {
          console.error("No token found");
          return;
        }

        const { data } = await api({
          method: "GET",
          url: "/schedule/userservices",
          headers: {
            Authorization: "Bearer " + token,
            rol: rol || "client",
          },
        });

        services.value = data.services;
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        loading.value = false;
      }
    };

    // Filtrar y ordenar los servicios por estado y búsqueda
    const filteredServices = computed(() => {
      let filtered = services.value;

      if (searchQuery.value) {
        filtered = filtered.filter((service) =>
          service.service.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()),
        );
      }

      if (selectedStatus.value !== "all") {
        filtered = filtered.filter(
          (service) => service.status === selectedStatus.value,
        );
      }

      return filtered;
    });

    // Paginación
    const paginatedServices = computed(() => {
      const start = (currentPage.value - 1) * servicesPerPage;
      const end = start + servicesPerPage;
      return filteredServices.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredServices.value.length / servicesPerPage);
    });

    const changePage = (page: number) => {
      currentPage.value = page;
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const paginationRange = computed(() => {
      const totalNumbersToShow = 3;
      const startPage = Math.max(1, currentPage.value - 1);
      const endPage = Math.min(totalPages.value, currentPage.value + 1);
      const range = [];

      for (let i = startPage; i <= endPage; i++) {
        range.push(i);
      }

      return range;
    });

    onMounted(() => {
      fetchServices();
    });

    return {
      goBack,
      searchQuery,
      selectedStatus,
      paginatedServices,
      totalPages,
      currentPage,
      changePage,
      previousPage,
      nextPage,
      paginationRange,
      actionSheetOptions,
      loading,
    };
  },
});
</script>
<style scoped>
.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-number {
  background-color: transparent;
  color: #000;
  border: none;
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
}

.pagination-number:hover {
  background-color: #f0f0f0;
}

.pagination-number.active {
  background-color: #d0d0d0;
  border-radius: 5px;
}

.pagination-arrow {
  background-color: transparent;
  color: #000;
  border: none;
  padding: 8px;
  margin: 0 5px;
  cursor: pointer;
}

.pagination-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ellipsis {
  margin: 0 5px;
  color: #86a286;
}

.select-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 10px auto;
}
</style>
