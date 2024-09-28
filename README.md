# Proyecto My Garden LLC - Aplicación Móvil

## 1. Descripción del Proyecto

>[!IMPORTANT]  
**My Garden LLC** es una empresa que ofrece servicios de jardinería a clientes en diversas localidades. El objetivo principal de este proyecto es trasladar las funcionalidades clave de su plataforma web a una aplicación móvil **multiplataforma**, compatible con dispositivos **iOS y Android**, utilizando **Ionic** como framework de desarrollo.

### Objetivo General:
El objetivo principal es proporcionar una interfaz móvil que permita a los usuarios gestionar sus servicios de jardinería desde sus teléfonos, replicando las funcionalidades de la web.

### Objetivos Específicos:
- **Acceso Seguro**: Implementar un sistema de **login** que permita a los usuarios acceder de forma segura desde cualquier dispositivo.
- **Agendamiento de Servicios**: Facilitar el proceso de búsqueda y reserva de servicios desde la app.
- **Gestión de Servicios Contratados**: Permitir a los usuarios gestionar servicios ya contratados, incluyendo opciones para cancelar, reagendar o dejar comentarios.
- **Interfaz Optimizada**: Proporcionar una interfaz sencilla y fluida, mejorando la experiencia del usuario móvil.

### Metodología de Trabajo:
El proyecto se gestiona utilizando la metodología ágil **Scrum**, organizada en sprints que garantizan entregas funcionales en cada iteración. La comunicación constante y las reuniones de revisión permiten adaptarse a cambios durante el proceso de desarrollo.

## 2. Herramienta de Control de Versiones

>[!TIP]  
El proyecto utiliza **Git** y **GitHub** para el control de versiones, utilizando el flujo de trabajo **Git Flow**, que garantiza un desarrollo ordenado y estable.

### Estructura de Ramas:
- **Main**: Rama principal que contiene el código en producción.
- **Develop**: Rama de desarrollo donde se integran las nuevas funcionalidades.
- **Feature Branches**: Ramas individuales creadas para nuevas características o correcciones.

### Flujo de Trabajo:
- Se utiliza **Git Flow** para la creación, revisión y fusión de ramas. Cada desarrollador trabaja en su rama **feature** (por ejemplo, `feature/agendar-servicios`), luego se integran en **develop** para pruebas y, finalmente, en **main** para el despliegue en producción.

### Clonar el repositorio:
```bash
git clone https://github.com/rodrigo3829l/movil_user_mygardenllc.git
```
>[!CAUTION]  
Asegúrate de trabajar en la rama correcta antes de realizar cambios o hacer un merge.

## 3. Estrategia de Versionamiento

>[!NOTE]  
Para asegurar un control preciso de las versiones, se utiliza **versionamiento semántico** siguiendo el esquema **major.minor.patch**:

- **Major**: Cambios que rompen compatibilidad con versiones anteriores.
- **Minor**: Nuevas funcionalidades que no afectan la compatibilidad.
- **Patch**: Correcciones menores o mejoras.

Las **feature branches** se revisan y fusionan en **develop**. Tras las pruebas en **staging**, los cambios se integran en **main** para su despliegue en producción.

## 4. Estrategia de Despliegue

>[!IMPORTANT]  
Se seleccionó una estrategia de **despliegue directo**. Los cambios pasan por los siguientes entornos:

- **Desarrollo**: Las ramas **feature** se prueban localmente o en servidores de desarrollo.
- **Staging (Pre-producción)**: La rama **develop** se despliega para realizar pruebas antes de llevar los cambios a **producción**.
- **Producción**: Solo la rama **main** se despliega en producción, garantizando la estabilidad.

El proceso de **CI/CD** automatiza el despliegue en estos entornos, minimizando el riesgo de errores.

## 5. Instrucciones para Clonar y Ejecutar el Proyecto

### Clonar el repositorio:
```bash
git clone https://github.com/rodrigo3829l/movil_user_mygardenllc.git
```

### Instalar dependencias:
```bash
npm install
```

### Ejecutar el proyecto localmente:
```bash
ionic serve
```
>[!CAUTION]  
Asegúrate de tener **Ionic** correctamente instalado antes de ejecutar el proyecto.

## 6. Proceso para la Creación y Seguimiento de Issues

>[!TIP]  
Se utiliza **Jira** como la herramienta principal para la gestión de **issues**. El proceso de seguimiento de tareas sigue estos pasos:

1. **Creación**: Cada issue se crea con un título descriptivo y una descripción clara de la tarea.
2. **Asignación**: Los issues se asignan según las habilidades de cada desarrollador.
3. **Seguimiento**: Los estados de los issues incluyen **To Do**, **In Progress**, **Review** y **Done**.

### Flujo de Trabajo:
Este flujo de trabajo asegura un seguimiento claro de cada tarea desde su creación hasta su cierre.

## 7. Estrategia de Comunicación

Para asegurar la comunicación eficiente entre los miembros del equipo, se implementa la siguiente estrategia:

- **Plataforma de Gestión**: Jira es la principal herramienta para la planificación y seguimiento de tareas.
- **Mensajería**: Se utilizan herramientas como **WhatsApp** para la comunicación instantánea.
- **Reuniones**: Se realizan **reuniones semanales** de seguimiento y reuniones diarias (**daily stand-ups**) para revisar el progreso y discutir posibles bloqueos.

