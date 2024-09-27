# Proyecto My Garden LLC - Aplicación Móvil
## 1. Descripción del Proyecto
>[!IMPORTANT]
>My Garden LLC es una empresa dedicada a ofrecer servicios de jardinería a sus clientes en distintas localidades. El objetivo de este proyecto es trasladar las funcionalidades clave de su plataforma web a una aplicación móvil multiplataforma, compatible con dispositivos iOS y Android, utilizando Ionic como framework de desarrollo.
### Objetivo General:
El objetivo principal de esta aplicación es proporcionar una interfaz móvil sencilla y eficiente que permita a los usuarios gestionar sus servicios de jardinería de manera práctica desde sus teléfonos, replicando las funcionalidades de la web. De esta manera, los usuarios tendrán la posibilidad de acceder fácilmente a su cuenta, visualizar servicios disponibles, agendar citas y gestionar servicios contratados de manera rápida y accesible.
### Objetivos Específicos:
* Acceso Seguro: Implementar un sistema de login seguro para que los usuarios puedan acceder a sus cuentas desde cualquier dispositivo.
* Agendamiento de Servicios: Facilitar el proceso de búsqueda y agendamiento de servicios de jardinería a través de la app.
* Gestión de Servicios Contratados: Permitir a los usuarios gestionar sus servicios contratados (pagar, cancelar, reagendar) desde su dispositivo móvil.
* Interfaz de Usuario Optimizada: Proporcionar una interfaz fácil de usar, que ofrezca una experiencia fluida e intuitiva para todo tipo de usuarios.
### Metodología de Trabajo:
Para garantizar un desarrollo ordenado y eficiente, seguimos la metodología ágil Scrum. Este enfoque nos permite organizar el proyecto en sprints cortos, de manera que cada funcionalidad se implemente y se entregue de manera incremental. Cada sprint tiene una duración específica y concluye con una entrega funcional que es revisada y validada. La colaboración y comunicación constante entre los desarrolladores son claves para adaptarnos a los posibles cambios durante el proceso de desarrollo.
### Tecnologías Utilizadas:
* Ionic Framework: Para crear aplicaciones móviles nativas en iOS y Android con un solo código base.
* Capacitor: Facilita el acceso a las funcionalidades nativas del dispositivo (Haptics, Keyboard, StatusBar).
* Vue.js y Vue Router: Utilizados para la construcción de la interfaz y la gestión de rutas en la aplicación.
* Tailwind CSS: Framework CSS que ayuda a diseñar interfaces rápidas y responsivas mediante clases utilitarias.
* TypeScript: Añade tipado estático a JavaScript, mejorando la robustez y el mantenimiento del código.
* Vite: Herramienta de desarrollo rápida que optimiza el flujo de trabajo para Vue y TypeScript.
* Node.js y Express: El backend, construido en Node.js, recibe peticiones desde la aplicación móvil a través de una API REST.
* Cypress y Vitest: Pruebas end-to-end con Cypress y unitarias con Vitest para garantizar la calidad del código.
### API del Backend
La aplicación se comunica con una API construida en Node.js y Express para autenticación, gestión de servicios y acceso a datos.
ESLint: Herramienta para mantener la calidad y consistencia del código, usando una base de datos no relacional orientada a documentos en MongoDB.
### Principales funcionalidades:
* Login de usuarios.
* Visualización y agendamiento de servicios.
* Gestión de perfil de usuario.
* Consultar y gestionar los servicios contratados.
## 2. Control de Versiones
>[!TIP]
Git y GitHub son las herramientas seleccionadas para el control de versiones. Se utiliza el flujo de trabajo Git Flow para garantizar una entrega ordenada y estable del código.

### Estructura de Ramas:
* Main: Contiene el código estable y en producción.
* Develop: Integra las nuevas funcionalidades en fase de pruebas.
* Feature Branches: Se crean ramas individuales para el desarrollo de nuevas funcionalidades o correcciones (feature/nueva-funcionalidad).
### Clonar el repositorio:
`git clone https://github.com/rodrigo3829l/movil_user_mygardenllc.git`
>[!CAUTION]
>Asegúrate de que trabajas en la rama correcta antes de realizar cambios o hacer un merge.

## 3. Estrategia de Versionamiento
>[!NOTE]
Para asegurar un control preciso de las versiones, usamos versionamiento semántico siguiendo el esquema major.minor.patch:
* Major: Cambios importantes que rompen la compatibilidad.
* Minor: Nuevas funcionalidades que no afectan la compatibilidad.
* Patch: Correcciones o mejoras menores.
>
Todas las feature branches se revisan y fusionan en develop. Tras las pruebas en staging, se integran en main para su despliegue en producción.

## 4. Estrategia de Despliegue
>[!IMPORTANT]
La estrategia de despliegue seleccionada es el despliegue directo. Cada cambio pasa por entornos claramente definidos:
* Desarrollo: Las ramas feature se prueban localmente o en servidores de desarrollo.
* Staging (Pre-producción): La rama develop se despliega aquí para realizar pruebas antes de llevar los cambios a producción.
* Producción: Solo la rama main se despliega en el entorno de producción, asegurando estabilidad.
* El proceso de CI/CD automatiza el despliegue en estos entornos, reduciendo el riesgo de errores.

## 5. Instrucciones para Clonar y Ejecutar el Proyaecto
### Clonar el repositorio:
`git clone https://github.com/rodrigo3829l/movil_user_mygardenllc.git`
### Instalar dependencias:
`npm install`
##Ejecutar el proyecto localmente:
`ionic serve`
>[!CAUTION]
Asegúrate de tener Ionic instalado correctamente en tu entorno local antes de ejecutar el proyecto.
