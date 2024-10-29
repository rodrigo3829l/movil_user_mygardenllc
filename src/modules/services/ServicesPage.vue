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
        <IonTitle>Services</IonTitle>
      </IonToolbar>

      <!-- Searchbar -->
      <IonSearchbar v-model="searchQuery" placeholder="Search" debounce="500" />

      <!-- Filtros -->
      <div class="filters">
        <!-- Select para filtrar por tipo de servicio -->
        <IonItem class="select-container">
          <IonSelect
            label="Service Type"
            v-model="selectedType"
            interface="action-sheet"
            :interface-options="actionSheetOptions"
            color="success"
          >
            <IonSelectOption value="All">All</IonSelectOption>
            <IonSelectOption
              v-for="(tipo, index) in types"
              :key="index"
              :value="tipo.tipo"
            >
              {{ tipo.tipo }}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </div>

      <!-- Listado de servicios con paginación -->
      <IonList v-if="loading">
        <!-- Mostrar 5 skeletons -->
        <SkeletonLoader v-for="n in 5" :key="n" />
      </IonList>

      <!-- Listado de servicios con paginación cuando ya se han cargado -->
      <IonList v-else>
        <ServicesComponent
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
  onMounted,
  ref,
  watch,
  computed,
  defineAsyncComponent,
} from "vue";
import {
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonItem,
} from "@ionic/vue";
import ServicesComponent from "@/components/ServicesComponent.vue";
import { useRouter } from "vue-router";
import api from "@/axios/axios";
const SkeletonLoader = defineAsyncComponent(
  () => import("../../components/SkeletonService.vue"),
);

export default defineComponent({
  components: {
    IonPage,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonList,
    IonIcon,
    ServicesComponent,
    IonSelect,
    IonSelectOption,
    IonItem,
    SkeletonLoader,
  },
  setup() {
    const router = useRouter();
    const services = ref([]); // Servicios cargados desde la API
    const filteredServices = ref([]); // Servicios filtrados por búsqueda y tipo
    const types = ref([]); // Tipos de servicio obtenidos de la API
    const searchQuery = ref(""); // Para el input del buscador
    const selectedType = ref("All"); // Tipo de servicio seleccionado
    const currentPage = ref(1); // Página actual
    const servicesPerPage = 5; // Número de servicios por página
    const loading = ref(true);
    // Opciones del Action Sheet
    const actionSheetOptions = {
      header: "Choose a service type to filter",
    };

    // Función para volver a la página anterior
    const goBack = () => {
      router.back();
    };

    // Función para obtener los tipos de servicio desde la API
    const fetchTypes = async () => {
      try {
        const { data } = await api.get("/typeservice/get");
        types.value = data.tipesServices.filter((type) => type.isUsable);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    // Función para obtener los servicios desde la API
    const fetchServices = async () => {
      try {
        const { data } = await api.get("/services/get");
        services.value = data.services.filter((service) => service.isUsable);
        filterServices(); // Filtrar al cargar los servicios
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        loading.value = false; // Detener el estado de carga después de la petición
      }
    };

    // Función para filtrar los servicios por búsqueda y tipo
    const filterServices = () => {
      let filtered = services.value;

      // Filtrar por tipo de servicio
      if (selectedType.value !== "All") {
        filtered = filtered.filter(
          (service) => service.tipoDeServicio.tipo === selectedType.value,
        );
      }

      // Filtrar por búsqueda
      if (searchQuery.value) {
        filtered = filtered.filter((service) =>
          service.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
        );
      }

      filteredServices.value = filtered;
    };

    // Paginación: calcular los servicios que se deben mostrar en la página actual
    const paginatedServices = computed(() => {
      const start = (currentPage.value - 1) * servicesPerPage;
      const end = start + servicesPerPage;
      return filteredServices.value.slice(start, end);
    });

    // Total de páginas
    const totalPages = computed(() => {
      return Math.ceil(filteredServices.value.length / servicesPerPage);
    });

    // Cambiar página
    const changePage = (page: number) => {
      currentPage.value = page;
    };

    // Ir a la página anterior
    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    // Ir a la siguiente página
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    // Observar cambios en búsqueda y tipo de servicio seleccionado
    watch([searchQuery, selectedType], filterServices);

    // Obtener el rango de páginas para mostrar en la paginación
    const paginationRange = computed(() => {
      const totalNumbersToShow = 3; // Cambiado a 3 en lugar de 5
      const startPage = Math.max(1, currentPage.value - 1); // Mostrar un rango de una página antes
      const endPage = Math.min(totalPages.value, currentPage.value + 1); // Mostrar una página después
      const range = [];

      for (let i = startPage; i <= endPage; i++) {
        range.push(i);
      }

      return range;
    });

    // Ejecutar funciones al montar el componente
    onMounted(() => {
      fetchTypes();
      fetchServices();
    });

    return {
      goBack,
      searchQuery,
      selectedType,
      types,
      paginatedServices,
      totalPages,
      currentPage,
      previousPage,
      nextPage,
      changePage,
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

/* Estilo personalizado para el select y su label */
.filter-label {
  color: #3cae3c;
  font-weight: bold;
  font-size: 1rem;
  min-width: 150px;
  /* Aumentar el ancho del label */
}

IonSelect {
  width: 100%;
  --ion-color-success: #3cae3c;
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
