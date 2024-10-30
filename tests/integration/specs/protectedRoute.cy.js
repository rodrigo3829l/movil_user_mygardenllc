describe('Protected Route Access without Login', () => {
    it('should redirect to login if user is not authenticated', () => {
      // Intentar visitar una ruta protegida (e.g., Home)
      cy.visit('/home');
  
      // Verificar que la URL sea la del login (porque no hay token)
      cy.url().should('include', '/login');
  
      // Verificar que el mensaje de "Welcome back" en la pantalla de login esté visible
      cy.contains('Welcome back').should('be.visible');
    });
  
    it('should redirect to login for other protected routes', () => {
      const protectedRoutes = ['/services', '/profile', '/my-services'];
  
      protectedRoutes.forEach((route) => {
        // Intentar visitar cada ruta protegida
        cy.visit(route);
  
        // Verificar que la URL se redirige al login
        cy.url().should('include', '/login');
  
        // Verificar que el mensaje de "Welcome back" esté visible en cada redirección
        cy.contains('Welcome back').should('be.visible');
      });
    });
  });
  