export default {
  mounted() {
    // Configuración para ion-input
    const inputs = document.querySelectorAll("ion-input");
    inputs.forEach((input) => {
      input.setAttribute("label-placement", "floating");
      input.setAttribute("color", "success-input");
      input.style.setProperty("--background", "#F0F5F0");
      input.style.setProperty("--color", "#86A286");
      input.style.setProperty("--placeholder-color", "#86A286");
      input.style.setProperty("--border-radius", "12px");
      input.style.setProperty("--box-shadow", "none");
      input.style.setProperty("--border-width", "0px");
      input.style.setProperty("--padding-start", "10px");
      input.style.setProperty("--padding-end", "10px");
      input.style.setProperty("--label-color-focused", "#86A286");
      input.style.setProperty("--label-color", "#86A286");
      input.style.setProperty("--highlight-background", "none");
    });

    // Configuración para ion-searchbar
    const searchbars = document.querySelectorAll("ion-searchbar");
    searchbars.forEach((searchbar) => {
      searchbar.style.setProperty("--background", "#F0F5F0");
      searchbar.style.setProperty("--color", "#86A286");
      searchbar.style.setProperty("--placeholder-color", "#86A286");
      searchbar.style.setProperty("--icon-color", "#86A286");
      searchbar.style.setProperty("--border-radius", "12px");
      searchbar.style.setProperty("--box-shadow", "none");
      searchbar.style.setProperty("--border-width", "0px");
    });

    // Configuración para ion-button
    const buttons = document.querySelectorAll("ion-button");
    buttons.forEach((button) => {
      button.style.setProperty("--background", "#2DD55B");
      button.style.setProperty("--color", "#000000");
      button.style.setProperty("--border-radius", "12px");
      button.style.setProperty("width", "100%");
      button.style.setProperty("height", "20px");
    });

    // Configuración para ion-chip
    const chips = document.querySelectorAll("ion-chip");
    chips.forEach((chip) => {
      chip.style.setProperty("--background", "#F0F5F0");
      chip.style.setProperty("--color", "#000000");
      chip.style.setProperty("--border-radius", "12px");
    });

    // Configuración para ion-toolbar (solo centrado de título)
    const toolbars = document.querySelectorAll("ion-toolbar");
    toolbars.forEach((toolbar) => {
      // Crear y centrar el título automáticamente
      const toolbarTitle = toolbar.querySelector("ion-title");
      if (toolbarTitle) {
        toolbarTitle.classList.add("ion-text-center"); // Clase para centrar el título
      }

      // Estilos del toolbar (sin fondo ni sombras)
      toolbar.style.setProperty("--background", "transparent"); // Sin fondo
      toolbar.style.setProperty("--box-shadow", "none"); // Sin sombras
      toolbar.style.setProperty("--border-width", "0px"); // Sin bordes
    });

    const progressBars = document.querySelectorAll("ion-progress-bar");
    progressBars.forEach((progressBar) => {
      progressBar.style.setProperty("--progress-background", "#3cae3c"); // Color del progreso
      progressBar.style.setProperty("--background", "#F0F5F0"); // Color de fondo
    });
  },
};
