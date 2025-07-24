Características

Características públicas
- Página de inicio: Introducción a los Padres de la Iglesia con secciones "Qué, Por qué, Quién"
- Navegación por categorías: Exploración jerárquica (Categorías → Tesis → Citas)
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

src/
├── components/          # Componentes reutilizables de UI
│   ├── header/
│   ├── sidebar/
│   ├── footer/
│   └── message/
├── pages/              # Componentes por ruta
│   ├── home/
│   ├── category/
│   ├── thesis/
│   ├── contact/
│   ├── login/
│   └── admin/
├── services/           # Lógica de negocio y servicios API
│   ├── auth.service.ts
│   └── data.service.ts
├── guards/             # Protección de rutas
│   └── auth.guard.ts
├── models/             # Interfaces TypeScript
│   └── interfaces.ts
├── pipes/              # Pipes personalizados
│   └── slug.pipe.ts
└── environments/       # Archivos de configuración

Configuración de Firebase

Antes de ejecutar la aplicación, necesitas:

1. Crear un proyecto en Firebase: https://console.firebase.google.com/
2. Habilitar la autenticación por correo/contraseña
3. Crear una base de datos Firestore
4. Actualizar la configuración en src/environments/environment.ts y src/environments/environment.prod.ts

Ejemplo:

export const environment = {
  production: false,
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
  }
};

Esquema de la base de datos

La aplicación usa las siguientes colecciones en Firestore:

- categories: Categorías temáticas principales (María y los santos, Moral, etc.)
- theses: Afirmaciones teológicas específicas dentro de cada categoría
- citations: Citas patrísticas que respaldan cada tesis
- objections: Objeciones comunes a las tesis con respuestas
- notes: Anotaciones interactivas para las citas
- users: Perfiles de usuario y roles

Primeros pasos

1. Instalar dependencias:
   npm install

2. Configurar Firebase (ver sección anterior)

3. Iniciar el servidor de desarrollo:
   npm run start

4. Navegar a:
   http://localhost:4200

5. Crear una cuenta de administrador (el primer usuario registrado será administrador)

Uso

Para administradores:
1. Accede al panel administrativo en /login
2. Crea categorías, tesis, citas y objeciones
3. El contenido aparece automáticamente en el sitio público
4. Usa la interfaz CRUD para gestionar todo el contenido

Para visitantes:
1. Navega por las categorías desde la barra lateral
2. Haz clic en una categoría para ver sus tesis
3. Haz clic en una tesis para ver las citas y objeciones
4. Las notas interactivas proporcionan contexto adicional

Filosofía de diseño

La aplicación sigue un diseño formal y académico inspirado en publicaciones eruditas tradicionales:

- Tipografía: Fuentes serif como Times New Roman en todo el sitio
- Paleta de colores: Fondo blanco con texto oscuro y acentos dorados/marrones (#8b6914)
- Diseño: Maquetación clásica basada en columnas con espaciado adecuado
- Navegación: Menú lateral jerárquico con secciones expandibles
- Interacciones: Animaciones sutiles que complementan sin distraer

Tecnologías utilizadas

- Angular 20+: Framework moderno con componentes independientes
- Firebase: Backend como servicio para autenticación y base de datos
- Bootstrap: Framework CSS para diseño responsivo
- TypeScript: Desarrollo con tipado fuerte
- RxJS: Programación reactiva para manejo de datos
- FontAwesome: Biblioteca de íconos

Contribuciones

Esta aplicación sirve como ejemplo completo de desarrollo moderno en Angular con integración de Firebase. Puedes usarla como referencia para proyectos académicos o de gestión de contenidos similares.


## License

This project is provided as an educational example for Angular development with Firebase.
