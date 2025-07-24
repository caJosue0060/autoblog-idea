# Church Fathers - Angular Web Application

A comprehensive Angular application for exploring the writings and teachings of the Church Fathers, featuring authentication, content management, and an academic design.

## Features

### Public Features
- **Home Page**: Introduction to Church Fathers with "What, Why, Who" sections
- **Category Navigation**: Hierarchical browsing (Categories → Theses → Citations)
- **Responsive Design**: Academic styling with serif typography and elegant color scheme
- **Interactive Citations**: Expandable notes with smooth animations
- **Search & Filter**: Real-time filtering capabilities
- **Contact Page**: Social media links and contact information

### Admin Features (Authentication Required)
- **Complete CRUD Operations**: Manage categories, theses, citations, objections, and notes
- **Firebase Authentication**: Secure login/logout system
- **Content Management**: Full administrative panel for content creation and editing
- **Form Validation**: Comprehensive form validation with error messages
- **Real-time Updates**: Automatic content updates across the application

### Technical Features
- **Angular Standalone Components**: Modern Angular architecture
- **Firebase Integration**: Authentication and Firestore database
- **Reactive Forms**: Advanced form handling with validation
- **Route Guards**: Protected routes for authenticated users
- **Lazy Loading**: Optimized loading for better performance
- **Responsive Design**: Mobile-first approach with Bootstrap integration
- **TypeScript**: Strong typing throughout the application
- **Custom Pipes**: Slug generation and other utility functions

## Project Structure

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

## Firebase Configuration

Before running the application, you need to:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Update the configuration in `src/environments/environment.ts` and `src/environments/environment.prod.ts`

```typescript
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
```

## Database Schema

The application uses the following Firestore collections:

- **categories**: Main topic categories (Mary and Saints, Morality, etc.)
- **theses**: Specific theological statements within categories
- **citations**: Patristic quotes supporting each thesis
- **objections**: Common objections to theses with responses
- **notes**: Interactive annotations for citations
- **users**: User profiles and roles

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure Firebase (see Firebase Configuration above)

3. Start the development server:
```bash
npm run start
```

4. Navigate to `http://localhost:4200`

5. Create an admin account by registering (first user becomes admin)

## Usage

### For Administrators
1. Access the admin panel at `/login`
2. Create categories, theses, citations, and objections
3. Content automatically appears on the public site
4. Use the CRUD interface to manage all content

### For Visitors
1. Browse categories from the sidebar
2. Click on categories to view theses
3. Click on theses to read citations and objections
4. Interactive notes provide additional context

## Design Philosophy

The application follows an academic, formal design inspired by traditional scholarly publications:

- **Typography**: Times New Roman serif fonts throughout
- **Color Scheme**: White backgrounds with dark text and gold/brown accents (#8b6914)
- **Layout**: Classical column-based layouts with proper spacing
- **Navigation**: Hierarchical sidebar navigation with expandable sections
- **Interactions**: Subtle animations that enhance rather than distract

## Technologies Used

- **Angular 20+**: Modern web framework with standalone components
- **Firebase**: Backend-as-a-Service for authentication and database
- **Bootstrap**: CSS framework for responsive design
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming for data management
- **FontAwesome**: Icon library

## Contributing

This application serves as a complete example of modern Angular development with Firebase integration. Feel free to use it as a reference for similar academic or content management projects.

## License

This project is provided as an educational example for Angular development with Firebase.