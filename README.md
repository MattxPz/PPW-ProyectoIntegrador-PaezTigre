# DevPortfolio - Proyecto Integrador 
Portafolio profesional desarrollado como proyecto integrador para la materia de **Programación de Plataformas Web** en la **Universidad Politécnica Salesiana**. 

Este proyecto demuestra la construcción de una aplicación web moderna y escalable (SPA), combinando interfaces de usuario de alto rendimiento con una arquitectura de componentes sólida y optimizada.

## 👥 El Equipo (Technical Architects)

* **John Tigre** - Back-End Specialist
  *Especializado en lenguajes robustos del lado del servidor, construcción de APIs seguras, gestión de bases de datos y arquitectura de sistemas.*
* **Mateo Paez** - Front-End & Network Architect
  *Especializado en frameworks modernos (Angular, React) transformando requerimientos técnicos en interfaces responsivas, optimizadas y "pixel-perfect".*

## 🛠️ Stack Tecnológico

El proyecto está construido bajo los estándares más recientes de desarrollo frontend:

* **Framework Core:** [Angular](https://angular.dev/) 
  * Implementación estricta de **Standalone Components**.
  * Reactividad moderna utilizando **Signals**.
  * Optimización de rendimiento con `ChangeDetectionStrategy.OnPush`.
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) nativo.
* **Componentes UI:** [DaisyUI](https://daisyui.com/) para estructuras base (navbar, menús colapsables).
* **Iconografía:** Google Material Symbols Outlined.

## ✨ Características Principales

* **Arquitectura SPA (Single Page Application):** Navegación fluida y estructurada mediante `router-outlet` sin recargar el navegador.
* **Navegación Dinámica Reactiva:** Menú lateral inteligente que detecta la posición del scroll mediante decoradores `@HostListener` y actualiza la clase activa de la interfaz en tiempo real utilizando Signals, evitando la manipulación directa del DOM.
* **Diseño Responsivo Mobile-First:** El layout se adapta dinámicamente, pasando de un menú inferior colapsable en dispositivos móviles a un *sidebar* lateral fijo en pantallas de escritorio.
