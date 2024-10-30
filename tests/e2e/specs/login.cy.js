describe('Login Flow', () => {
    it('should log in the user and redirect to Home', () => {
      // Visita la página de login
      cy.visit('/login');
  
      // Ingresa el email en el campo de correo
      cy.get('input[placeholder="Email"]').type('202106581@gmail.com');
  
      // Ingresa la contraseña en el campo de contraseña
      cy.get('input[placeholder="Password"]').type('Drop345terra#');
  
      // Simula el clic en el botón de 'Log in'
      cy.get('ion-button').contains('Log in').click();
  
      // Verifica que la URL se redirige a '/home' después de iniciar sesión
      cy.url().should('include', '/home');
      
      // Opcional: Verificar que algún texto específico en la página de Home esté visible
      cy.contains('Welcome to My Garden').should('be.visible');
    });
  });
  