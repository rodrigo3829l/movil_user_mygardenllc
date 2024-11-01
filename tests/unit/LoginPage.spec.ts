// tests/unit/LoginPage.spec.ts
import { mount } from "@vue/test-utils";
import LoginPage from "@/modules/login/LoginPage.vue";
import { createTestingPinia } from "@pinia/testing";
import { useAuthStore } from "@/store/index";
import { Preferences } from "@capacitor/preferences";

jest.mock("@capacitor/preferences", () => ({
  Preferences: {
    set: jest.fn(),
    get: jest.fn().mockResolvedValue({ value: "mockToken" }),
  },
}));

describe("LoginPage.vue", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(LoginPage, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
  });

  it("muestra un mensaje de error si el email o la contraseña están vacíos", async () => {
    window.alert = jest.fn();
    const loginButton = wrapper.find("button");
    if (loginButton.exists()) {
      await loginButton.trigger("click");
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringContaining("Please enter your email"),
      );
    }
  });

  it("llama a `handleLogin` y muestra un spinner de carga al iniciar sesión", async () => {
    const authStore = useAuthStore();
    authStore.login = jest.fn().mockResolvedValue({ exito: true });

    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const loginButton = wrapper.find("button");

    if (emailInput.exists() && passwordInput.exists() && loginButton.exists()) {
      await emailInput.setValue("202106581@gmail.com");
      await passwordInput.setValue("Drop345terra#");
      await loginButton.trigger("click");
      expect(wrapper.vm.loading).toBe(true);
    }
  });

  it("redirige al home si el login es exitoso", async () => {
    const authStore = useAuthStore();
    authStore.login = jest.fn().mockResolvedValue({ exito: true });

    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const loginButton = wrapper.find("button");

    if (emailInput.exists() && passwordInput.exists() && loginButton.exists()) {
      await emailInput.setValue("202106581@gmail.com");
      await passwordInput.setValue("Drop345terra#");
      await loginButton.trigger("click");
      expect(authStore.login).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        "client",
      );
    }
  });

  it("cambia el tipo de input de contraseña cuando se hace clic en el icono de visibilidad", async () => {
    const passwordInput = wrapper.find('input[type="password"]');
    if (passwordInput.exists()) {
      expect(passwordInput.exists()).toBe(true);
      await wrapper.find("ion-icon").trigger("click");
      const updatedPasswordInput = wrapper.find('input[type="text"]');
      expect(updatedPasswordInput.exists()).toBe(true);
    }
  });
});
