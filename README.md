# README - Portafolio de Servicios Multiusuario

## Descripcion General

Portafolio de Servicios es una aplicacion web desarrollada como Proyecto Integrador de la asignatura Programacion y Plataformas Web. La plataforma permite mostrar perfiles profesionales de programadores, proyectos destacados, servicios ofrecidos y gestionar solicitudes de contacto entre usuarios externos y programadores.

La solucion implementa una arquitectura desacoplada basada en Angular para el frontend, Firebase para autenticacion y almacenamiento de solicitudes, y Strapi CMS como sistema de gestion de contenido dinamico.

---

# Objetivos del Proyecto

* Desarrollar una aplicacion web moderna y responsive.
* Implementar autenticacion de usuarios mediante Firebase Authentication.
* Gestionar contenido dinamico mediante Strapi CMS.
* Permitir la administracion de perfiles profesionales y proyectos.
* Facilitar el contacto entre potenciales clientes y programadores.
* Aplicar buenas practicas de desarrollo web y arquitectura desacoplada.

---

# Arquitectura del Sistema

La aplicacion se encuentra dividida en tres componentes principales:

## Angular

Responsable de:

* Interfaz de usuario.
* Navegacion entre paginas.
* Consumo de API REST de Strapi.
* Integracion con Firebase Authentication.
* Gestion de solicitudes almacenadas en Firestore.

## Firebase Authentication

Responsable de:

* Registro de usuarios externos.
* Inicio y cierre de sesion.
* Gestion de identidad mediante correo y contraseña.
* Opcionalmente autenticacion con Google.

## Cloud Firestore

Responsable de:

* Almacenamiento de solicitudes de contacto.
* Asociacion de solicitudes con usuarios autenticados.
* Gestion de estados y respuestas de solicitudes.

## Strapi CMS

Responsable de:

* Administracion de programadores.
* Administracion de proyectos.
* Administracion de servicios.
* Gestion de contenido dinamico sin modificar el codigo fuente.

---

# Proceso de Desarrollo

## Analisis de Requerimientos

Se analizaron las especificaciones establecidas en la guia del proyecto para identificar:

* Roles del sistema.
* Flujos de autenticacion.
* Gestion de contenido.
* Manejo de solicitudes.
* Requisitos funcionales y no funcionales.

## Diseno de Arquitectura

Se selecciono una arquitectura desacoplada para separar responsabilidades y facilitar el mantenimiento.

La informacion dinamica se almacena en Strapi mientras que los datos transaccionales se gestionan mediante Firebase.

## Desarrollo Frontend

Se utilizo Angular para:

* Crear componentes reutilizables.
* Implementar rutas protegidas.
* Consumir servicios REST.
* Gestionar estados de autenticacion.
* Implementar interfaces responsive.

## Desarrollo Backend Headless

Se configuro Strapi CMS para administrar:

* Programadores.
* Proyectos.
* Servicios.
* Relaciones entre entidades.

## Integracion Firebase

Se implemento:

* Registro de usuarios.
* Inicio de sesion.
* Persistencia de solicitudes.
* Actualizacion de estados.

## Pruebas

Se realizaron pruebas de:

* Navegacion.
* Autenticacion.
* Consumo de API.
* Registro de solicitudes.
* Visualizacion de contenido.
* Compatibilidad responsive.

---

# Decisiones de Diseno

## Uso de Angular

Permite una estructura modular, escalable y mantenible mediante componentes y servicios.

## Uso de Firebase

Reduce la complejidad de implementar autenticacion y almacenamiento en tiempo real.

## Uso de Strapi

Permite administrar contenido sin necesidad de desarrollar un panel administrativo propio.

## Arquitectura Desacoplada

Facilita la escalabilidad y el mantenimiento de cada componente de forma independiente.

## Diseno Responsive

Garantiza una experiencia adecuada tanto en dispositivos moviles como en equipos de escritorio.

---

# Desafios Enfrentados

## Integracion entre Angular y Strapi

Fue necesario configurar correctamente los endpoints, permisos y relaciones entre entidades.

## Gestion de Roles

Se debio diferenciar claramente entre usuarios externos y programadores.

## Manejo de Relaciones

Los proyectos pueden pertenecer a uno o varios programadores, lo que requirio una correcta configuracion en Strapi.

## Sincronizacion de Datos

Se trabajo en mantener consistencia entre Firebase Authentication, Firestore y Strapi.

## Seguridad

Se implementaron restricciones de acceso para proteger funcionalidades privadas.

---

# Funcionalidades Implementadas

## Pagina Principal

* Presentacion de la empresa de desarrollo.
* Visualizacion de programadores.
* Servicios ofrecidos.
* Proyectos destacados.
* Acceso a contacto.

## Perfil de Programadores

* Informacion profesional.
* Redes sociales.
* Especialidades.
* Proyectos asociados.

## Gestion de Proyectos

* Visualizacion de proyectos destacados.
* Visualizacion de tecnologias utilizadas.
* Acceso a repositorios y demos.

## Autenticacion

* Registro de usuarios.
* Inicio de sesion.
* Cierre de sesion.
* Recuperacion de acceso segun configuracion.

## Solicitudes de Contacto

* Creacion de solicitudes.
* Visualizacion de solicitudes enviadas.
* Visualizacion de solicitudes recibidas.
* Cambio de estado.
* Registro de respuestas.

---

# Configuracion del Entorno de Desarrollo

## Requisitos Previos

* Node.js
* Angular CLI
* Firebase CLI
* Git
* Strapi

## Clonar Repositorio

```bash
git clone URL_DEL_REPOSITORIO
cd nombre-del-proyecto
```

## Instalar Dependencias Angular

```bash
npm install
```

## Ejecutar Angular

```bash
ng serve
```

Aplicacion disponible en:

```text
http://localhost:4200
```

---

# Configuracion de Firebase

## Crear Proyecto Firebase

1. Ingresar a Firebase Console.
2. Crear un nuevo proyecto.
3. Habilitar Authentication.
4. Habilitar Firestore Database.
5. Obtener las credenciales del proyecto.

## Configurar Variables

Actualizar el archivo correspondiente:

```typescript
src/environments/environment.ts
```

Con las credenciales generadas por Firebase.

---

# Configuracion de Strapi

## Crear Proyecto Strapi

```bash
npx create-strapi-app@latest backend
```

## Ejecutar Strapi

```bash
npm run develop
```

## Crear Colecciones

### Programadores

* nombreCompleto
* especialidad
* descripcionBreve
* descripcionCompleta
* fotoPerfil
* correo
* github
* linkedin
* activo
* slug

### Proyectos

* nombre
* slug
* descripcionBreve
* descripcionCompleta
* imagenPrincipal
* tipoProyecto
* tecnologias
* repositorio
* demo
* destacado

### Servicios

* nombre
* descripcion

## Configurar Permisos Publicos

Habilitar lectura para las colecciones necesarias desde el panel de administracion.

---

# Despliegue de la Aplicacion

## Compilar Angular

```bash
ng build
```

## Inicializar Firebase Hosting

```bash
firebase init hosting
```

## Desplegar Aplicacion

```bash
firebase deploy
```

La aplicacion quedara disponible mediante una URL publica proporcionada por Firebase Hosting.

---

# Guia de Usuario Final

## Usuario Visitante

Puede:

* Navegar por el portafolio.
* Ver programadores.
* Ver proyectos.
* Ver servicios.

No puede:

* Enviar solicitudes sin autenticarse.

## Usuario Registrado

Puede:

* Iniciar sesion.
* Enviar solicitudes.
* Consultar solicitudes realizadas.
* Consultar estados de solicitudes.

---

# Guia de Usuario Programador

## Acceso

El programador inicia sesion mediante una cuenta registrada en Firebase Authentication.

## Funcionalidades

Puede:

* Visualizar solicitudes recibidas.
* Revisar informacion del solicitante.
* Cambiar estado de solicitudes.
* Registrar observaciones.
* Responder solicitudes.

Estados disponibles:

* Pendiente
* Respondida

---

# Buenas Practicas Aplicadas

* Arquitectura modular.
* Componentes reutilizables.
* Separacion de responsabilidades.
* Consumo de API mediante servicios.
* Manejo de rutas protegidas.
* Validacion de formularios.
* Diseño responsive.
* Control de acceso basado en autenticacion.

---

# Mejoras Futuras

* Notificaciones en tiempo real.
* Panel administrativo avanzado.
* Dashboard de estadisticas.
* Integracion con correo electronico.
* Chat en tiempo real.
* Soporte para multiples idiomas.
* Inicio de sesion con Google.

---

# Video de Presentacion del Proyecto

## Duracion Recomendada

10 minutos.

## Estructura de la Presentacion

### Introduccion

* Presentacion del proyecto.
* Objetivos.

### Arquitectura

* Angular.
* Firebase Authentication.
* Firestore.
* Strapi CMS.

### Demostracion

* Home.
* Perfiles.
* Proyectos.
* Registro e inicio de sesion.
* Solicitudes de contacto.
* Gestion de solicitudes.

### Explicacion Tecnica

* Estructura de carpetas.
* Flujo de autenticacion.
* Consumo de API REST.
* Modelo de datos.
* Integracion Firebase.
* Integracion Strapi.

### Conclusiones

* Resultados obtenidos.
* Retos enfrentados.
* Aprendizajes adquiridos.

---

# Integrantes

* Mateo Paez
* John Tigre

---

# Repositorio

GitHub:

```text
https://github.com/MattxPz/PPW-ProyectoIntegrador-PaezTigre
```

# Aplicacion Desplegada

```text
https://ppw-proyectoangular.web.app/
```

# Strapi Cloud Desplegado

```text
https://healing-event-664102f8e1.strapiapp.com/admin/
```
