// tests/unit/Navbar.spec.ts

import { mount } from "@vue/test-utils";
import Navbar from "@/components/Navbar.vue";
import { Preferences } from "@capacitor/preferences";
import { createRouter, createWebHistory } from "vue-router";
import { IonTabs, IonRouterOutlet, IonTabButton } from "@ionic/vue";

// Mock de Capacitor Preferences
jest.mock("@capacitor/preferences", () => ({
  Preferences: {
    remove: jest.fn(),
  },
}));

// Mock de las rutas
const routes = [
  { path: "/home", name: "Home" },
  { path: "/services", name: "Services" },
  { path: "/profile", name: "Profile" },
  { path: "/my-services", name: "MyServices" },
  { path: "/login", name: "Login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe("Navbar.vue", () => {
  let wrapper: any;

  beforeEach(async () => {
    router.push("/home");
    await router.isReady();

    wrapper = mount(Navbar, {
      global: {
        plugins: [router],
        components: {
          IonTabs,
          IonRouterOutlet,
          IonTabButton,
        },
      },
    });
  });

  it("debe mostrar las pestañas correctas", () => {
    const tabs = wrapper.findAllComponents(IonTabButton);
    expect(tabs).toHaveLength(5);

    expect(tabs[0].text()).toContain("Home");
    expect(tabs[1].text()).toContain("Services");
    expect(tabs[2].text()).toContain("Profile");
    expect(tabs[3].text()).toContain("My Services");
    expect(tabs[4].text()).toContain("Logout");
  });

  it("debe llamar a logout y redirigir al login cuando se hace clic en la pestaña de logout", async () => {
    // Buscamos el botón de logout usando el atributo tab en lugar de ref
    const logoutButton = wrapper.find('[tab="logout"]');
    await logoutButton.trigger("click");

    // Verificar que se llama a Preferences.remove con el token
    expect(Preferences.remove).toHaveBeenCalledWith({ key: "token" });
    expect(router.currentRoute.value.fullPath).toBe("/home");
  });
});
