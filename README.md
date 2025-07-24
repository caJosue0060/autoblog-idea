Características

Características públicas
- Página de inicio
- Navegación por categorías: Exploración jerárquica (Categorías → Tesis → Contenido)
- Diseño responsivo: Estilo académico con tipografía con serifas y una paleta de colores elegante
- Citas interactivas: Notas expandibles con animaciones suaves
- Búsqueda y filtro: Capacidad de filtrado en tiempo real
- Página de contacto: Enlaces a redes sociales e información de contacto

Características de administración (requiere autenticación)
- Operaciones CRUD completas: Gestiona categorías, tesis, citas, objeciones y notas
- Autenticación con Firebase: Sistema seguro de inicio y cierre de sesión
- Gestión de contenido: Panel administrativo completo para creación y edición
- Validación de formularios: Validación integral con mensajes de error
- Actualizaciones en tiempo real: Actualización automática del contenido en toda la aplicación

Características técnicas
- Componentes independientes de Angular: Arquitectura moderna de Angular
- Integración con Firebase: Autenticación y base de datos Firestore
- Formularios reactivos: Manejo avanzado de formularios con validación
- Protección de rutas: Rutas protegidas para usuarios autenticados
- Carga perezosa: Optimización del rendimiento en la carga de páginas
- Diseño responsivo: Enfoque mobile-first con integración de Bootstrap
- TypeScript: Tipado fuerte en toda la aplicación
- Pipes personalizados: Generación de slugs y otras funciones utilitarias

Estructura del proyecto

```
src/
├── components/          # Reusable UI components
│   ├── header/
│   ├── sidebar/
│   ├── footer/
│   └── message/
├── pages/              # Route components
│   ├── home/
│   ├── category/
│   ├── thesis/
│   ├── contact/
│   ├── login/
│   └── admin/
├── services/           # Business logic and API services
│   ├── auth.service.ts
│   └── data.service.ts
├── guards/             # Route protection
│   └── auth.guard.ts
├── models/             # TypeScript interfaces
│   └── interfaces.ts
├── pipes/              # Custom pipes
│   └── slug.pipe.ts
└── environments/       # Configuration files
```
