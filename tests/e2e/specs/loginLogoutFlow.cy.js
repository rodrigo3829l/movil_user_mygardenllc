describe("Login and Logout Flow", () => {
  before(() => {
    // Visitar la página de login e iniciar sesión
    cy.visit("/login");

    // Ingresar las credenciales de usuario
    cy.get('input[placeholder="Email"]').type("202106581@gmail.com");
    cy.get('input[placeholder="Password"]').type("Drop345terra#");
    cy.get("ion-button").contains("Log in").click();

    // Verificar que el usuario fue redirigido a la página de Home
    cy.url().should("include", "/home");
  });

  it("should navigate to Home", () => {
    // Verificar la navegación directa a Home
    cy.visit("/home");
    cy.url().should("include", "/home");
  });

  it("should log out and redirect to Login", () => {
    // Eliminar el token para simular el logout
    cy.window().then((win) => {
      win.localStorage.removeItem("token");
    });

    // Navegar de nuevo a Home para verificar la redirección al login
    cy.visit("/home");
    cy.url().should("include", "/login");
  });
});
