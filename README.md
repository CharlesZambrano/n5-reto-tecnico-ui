# N5 Technical Challenge - Frontend

Este proyecto es la interfaz de usuario para el **N5 Technical Challenge**, desarrollado con **Next.js** y **TypeScript**. La aplicación permite la gestión de permisos y tipos de permisos, incluyendo autenticación, búsqueda avanzada con **Elasticsearch**, y un diseño moderno utilizando **Hero UI** y **Tailwind CSS**.

## Tecnologías Utilizadas

- **Next.js** (con App Router y TypeScript)
- **Tailwind CSS** para estilos rápidos y responsivos
- **Hero UI** para componentes preconstruidos
- **Zustand** para la gestión del estado global
- **Axios** para las solicitudes HTTP al backend
- **Elasticsearch** para la búsqueda avanzada de permisos

## Estructura del Proyecto

```
📁 n5-reto-tecnico-ui
├── app
│   ├── auth
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── permissions
│   │   └── list
│   │       └── page.tsx
│   ├── permissionTypes
│   │   └── list
│   │       └── page.tsx
│   ├── layout.tsx
│   └── page.tsx  // Página principal con integración de Elasticsearch
├── components
│   ├── conditionalNavbar.tsx
│   ├── fullScreenSpinner.tsx
│   ├── navbar.tsx  // Barra de navegación con campo de búsqueda integrado
│   ├── permissionDrawer.tsx
│   ├── permissionTable.tsx
│   ├── permissionTypeDrawer.tsx
│   └── permissionTypeTable.tsx
├── config
│   ├── api.ts  // Configuración de Axios con manejo de JWT
│   ├── fonts.ts
│   └── site.ts
├── hooks
│   ├── useAuth.ts  // Hook para manejar autenticación
│   └── useAuthGuard.ts
├── services
│   ├── authService.ts
│   ├── permissionService.ts  // Servicios para permisos y búsqueda en Elasticsearch
│   └── permissionTypeService.ts
├── store
│   ├── authStore.ts  // Gestión de autenticación con Zustand
│   ├── permissionDrawerStore.ts
│   └── permissionTypeDrawerStore.ts
├── styles
│   └── globals.css  // Estilos globales con Tailwind
├── types
│   ├── index.ts
│   ├── permission.ts  // Tipos de permisos y tipos de permisos
│   └── permissionType.ts
└── utils
    └── notificationHandler.ts  // Manejo de notificaciones con Sonner
```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/n5-reto-tecnico-ui.git
   cd n5-reto-tecnico-ui
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno en `.env.local`:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5215/api
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:3000`.

## Funcionalidades

### 1. **Autenticación**

- El sistema de login utiliza **JWT** para la autenticación.
- Al iniciar sesión, el token se almacena en `localStorage` y cookies.

### 2. **Gestión de Permisos y Tipos de Permisos**

- **Listado de Permisos:** Se muestra en una tabla con paginación y búsqueda integrada.
- **Creación/Edición de Permisos:** Utiliza un **Drawer** para formularios dinámicos.
- **Listado de Tipos de Permisos:** Similar a la gestión de permisos, con su propia tabla y drawer.

### 3. **Búsqueda Avanzada con Elasticsearch**

- El campo de búsqueda en la **Navbar** permite realizar búsquedas en **Elasticsearch**.
- Al presionar **Enter**, los resultados se muestran en la página principal (`/`) en formato de tabla.

### 4. **Manejo de Estado Global**

- **Zustand** gestiona el estado global para la autenticación y los formularios de permisos/tipos de permisos.

### 5. **Notificaciones**

- **Sonner** se utiliza para mostrar notificaciones de éxito o error durante las operaciones CRUD.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Inicia la aplicación en modo producción.
- `npm run lint`: Corre ESLint para asegurar la calidad del código.

## Contribuciones

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Empuja tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT.

---

¡Gracias por revisar este proyecto! 🚀 Si tienes alguna duda o sugerencia, no dudes en abrir un issue o contactarme directamente.
