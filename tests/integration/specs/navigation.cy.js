describe('Navigation Flow', () => {
  before(() => {
    // Visitar la página de login e iniciar sesión
    cy.visit('/login');

    // Ingresar las credenciales de usuario
    cy.get('input[placeholder="Email"]').type('202106581@gmail.com');
    cy.get('input[placeholder="Password"]').type('Drop345terra#');
    cy.get('ion-button').contains('Log in').click();

    // Verificar que el usuario fue redirigido a la página de Home
    cy.url().should('include', '/home');
  });

  it('should navigate to Home', () => {
    // Navegar directamente a la ruta de Home y verificar la URL
    cy.visit('/home');
    cy.url().should('include', '/home');
  });

  it('should navigate to Services', () => {
    // Navegar directamente a la ruta de Servicios
    cy.visit('/services');
    cy.url().should('include', '/services');
  });

  it('should navigate to Profile', () => {
    // Navegar directamente a la ruta de Perfil
    cy.visit('/profile');
    cy.url().should('include', '/profile');
  });

  it('should navigate to My Services', () => {
    // Navegar directamente a la ruta de Mis Servicios
    cy.visit('/my-services');
    cy.url().should('include', '/my-services');
  });

  it('should navigate to a specific service info page', () => {
    // Simular la navegación a la información de un servicio con ID 1
    cy.visit('/service/1');
    cy.url().should('include', '/service/1');
  });

  it('should log out and redirect to Login', () => {
    // Limpiar el token para simular el logout
    cy.window().then((win) => {
      win.localStorage.removeItem('token');
    });

    // Navegar a Home y verificar la redirección al login
    cy.visit('/home');
    cy.url().should('include', '/login');
  });
});
