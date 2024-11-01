// tests/unit/ServiceInfoPage.spec.ts

import { mount } from "@vue/test-utils";
import ServiceInfoPage from "@/modules/services/ServiceInfoPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import api from "@/axios/axios";
import { IonPage, IonContent, IonToolbar, IonTitle } from "@ionic/vue";
import { Preferences } from "@capacitor/preferences";

jest.mock("@capacitor/preferences", () => ({
  Preferences: {
    get: jest.fn().mockResolvedValue({ value: "mockToken" }), // Emular un token de sesión
  },
}));

jest.mock("@/axios/axios", () => ({
  get: jest.fn(),
}));

const mockService = {
  _id: "1",
  name: "Service 1",
  description: "Description of Service 1",
  tipoDeServicio: { tipo: "Type A" },
  img: { secure_url: "img1.jpg" },
};

const routes = [{ path: "/service/:id", name: "ServiceInfoPage" }];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

function flushPromises() {
  return new Promise((resolve) => process.nextTick(resolve));
}

describe("ServiceInfoPage.vue", () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({
      data: { service: mockService },
    });
    router.push(`/service/${mockService._id}`); // Corregido: usar template literal para la ruta
  });

  it("debe cargar y mostrar los detalles del servicio correctamente", async () => {
    const wrapper = mount(ServiceInfoPage, {
      global: {
        plugins: [router],
        components: {
          IonPage,
          IonContent,
          IonToolbar,
          IonTitle,
        },
      },
    });

    await flushPromises();

    expect(wrapper.text()).toContain(mockService.name);
    expect(wrapper.text()).toContain(mockService.description);
    expect(wrapper.text()).toContain(mockService.tipoDeServicio.tipo);

    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe(mockService.img.secure_url);
  });
});
