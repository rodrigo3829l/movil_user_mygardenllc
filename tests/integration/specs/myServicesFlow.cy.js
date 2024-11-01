describe("My Services Flow", () => {
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

  it("should navigate to My Services and select the first service", () => {
    // Navegar a la página de Mis Servicios
    cy.visit("/my-services");

    // Verificar que la URL sea la correcta
    cy.url().should("include", "/my-services");

    // Esperar que la lista de servicios esté visible
    cy.get("ion-list").should("be.visible");

    // Hacer clic en el primer servicio disponible
    cy.get("ion-grid").first().click();

    // Verificar que la URL contenga /my-service indicando que se redirigió correctamente
    cy.url().should("include", "/my-service");
  });
});
