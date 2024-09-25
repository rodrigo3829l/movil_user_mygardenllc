export default {
    mounted() {
      // Configuración para ion-input
      const inputs = document.querySelectorAll('ion-input');
      inputs.forEach((input) => {
        // Atributo por defecto
        input.setAttribute('label-placement', 'floating');  // Establece el label flotante
        
        // Aplicar el color personalizado usando el atributo color
        input.setAttribute('color', 'success-input');  // Usar un color personalizado
        
        // Aplicar estilos personalizados
        input.style.setProperty('--background', '#F0F5F0');  // Fondo del input
        input.style.setProperty('--color', '#86A286');        // Color del texto
        input.style.setProperty('--placeholder-color', '#86A286'); // Color del placeholder
        input.style.setProperty('--border-radius', '12px');   // Bordes redondeados
        input.style.setProperty('--box-shadow', 'none');      // Sin sombras
        input.style.setProperty('--border-width', '0px');     // Sin borde
  
        // Añadir padding para separar el texto de los bordes
        input.style.setProperty('--padding-start', '10px');   // Espacio a la izquierda del texto
        input.style.setProperty('--padding-end', '10px');     // Espacio a la derecha del texto
        
        // Personalizar el color del label flotante cuando el input está enfocado
        input.style.setProperty('--label-color-focused', '#86A286');  // Color del label al enfocar
        input.style.setProperty('--label-color', '#86A286');           // Color del label en estado normal
  
        // Remover la línea inferior al enfocar (quitar la línea azul)
        input.style.setProperty('--highlight-background', 'none');  // Eliminar el efecto azul
      });
  
      // Configuración para ion-searchbar
      const searchbars = document.querySelectorAll('ion-searchbar');
      searchbars.forEach((searchbar) => {
        // Aplicar estilos personalizados
        searchbar.style.setProperty('--background', '#F0F5F0');  // Fondo del searchbar
        searchbar.style.setProperty('--color', '#86A286');        // Color del texto
        searchbar.style.setProperty('--placeholder-color', '#86A286');  // Color del placeholder
        searchbar.style.setProperty('--icon-color', '#86A286');   // Color del ícono de la lupa
        searchbar.style.setProperty('--border-radius', '12px');   // Bordes redondeados
        searchbar.style.setProperty('--box-shadow', 'none');      // Sin sombra
        searchbar.style.setProperty('--border-width', '0px');     // Sin borde
      });
  
      // Configuración para ion-button
      const buttons = document.querySelectorAll('ion-button');
      buttons.forEach((button) => {
        // Estilo personalizado del botón
        button.style.setProperty('--background', '#2DD55B');  // Fondo verde
        button.style.setProperty('--color', '#000000');        // Texto negro
        button.style.setProperty('--border-radius', '12px');   // Bordes redondeados
        button.style.setProperty('width', '100%');             // Ajustar el botón al ancho completo
      });
  
      // Configuración para ion-chip
      const chips = document.querySelectorAll('ion-chip');
      chips.forEach((chip) => {
        // Estilo personalizado del chip
        chip.style.setProperty('--background', '#F0F5F0');  // Fondo claro
        chip.style.setProperty('--color', '#000000');        // Texto negro
        chip.style.setProperty('--border-radius', '12px');   // Bordes redondeados
      });
    }
  };
  