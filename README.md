# Star Wars Characters Explorer

A modern, responsive web application built with React that allows users to explore Star Wars characters from the Star Wars API (SWAPI). The application features authentication, character browsing, detailed character information, search functionality, and pagination.

## Features

### Core Features
- **User Authentication**: Simple login system with email and password validation
- **Character Browsing**: View Star Wars characters in an attractive card-based grid layout
- **Character Details Modal**: Click on any character to view comprehensive details including:
  - Basic information (height, mass, birth year, gender, eye color, hair color, skin color)
  - Species information with color-coded badges
  - Homeworld details (name, population, terrain, climate)
  - Films appeared in
  - Date added to the API
- **Search Functionality**: Search characters by name with real-time results
- **Pagination**: Navigate through multiple pages of characters
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Dark Mode Support**: Built-in dark mode that adapts to user's system preferences
- **Loading States**: Professional loading indicators during data fetching
- **Error Handling**: User-friendly error messages with retry functionality

### Design Features
- **Color-Coded Species**: Each species has a unique color theme (Human = Blue, Droid = Purple, Wookiee = Amber, etc.)
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Image Generation**: Dynamic image generation based on character names for consistent visuals
- **Gradient Overlays**: Beautiful gradient effects on images and backgrounds
- **Hover Effects**: Interactive hover effects on cards and buttons
- **Glassmorphism**: Modern glassmorphism effects on modal close buttons
- **Professional Modal**: Large, elegant modal with fixed image height and scrollable content

## Technologies Used

### Frontend
- **React 19.1.1**: Modern React library for building user interfaces
- **Vite 7.1.7**: Fast build tool and development server
- **Tailwind CSS 4.1.17**: Utility-first CSS framework for rapid UI development
- **JavaScript (ES6+)**: Modern JavaScript features

### API
- **SWAPI (Star Wars API)**: RESTful API for Star Wars data
  - Base URL: `https://swapi.dev/api`

### Development Tools
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing
- **Autoprefixer**: Automatic vendor prefixing

## Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd star
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in the terminal)

## Running the Project

### Development Mode
```bash
npm run dev
```
Runs the app in development mode with hot module replacement (HMR).

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally before deploying.

### Linting
```bash
npm run lint
```
Run ESLint to check code quality.

## Project Structure

```
star/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── assets/            # Images and other assets
│   │   └── react.svg
│   ├── components/        # React components
│   │   ├── CharacterCard.jsx      # Character card component
│   │   ├── CharacterDetails.jsx   # Character details modal
│   │   └── Login.jsx              # Login component
│   ├── services/          # API services
│   │   └── api.js         # SWAPI integration
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── index.html             # HTML template
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # Project documentation
```

## Authentication

### Login Credentials
- **Email**: `admin@gmail.com`
- **Password**: `admin`

### Authentication Flow
1. User enters email and password
2. Credentials are validated against hardcoded values
3. On success, authentication state is stored in localStorage
4. User is redirected to the characters page
5. Authentication persists across page refreshes
6. User can logout using the logout button in the header

## Design System

### Color Coding by Species
- **Human**: Blue theme
- **Droid**: Purple theme
- **Wookiee**: Amber theme
- **Twilek**: Pink theme
- **Hutt**: Emerald theme
- **Yoda's Species**: Lime theme
- **Trandoshan**: Red theme
- **Mon Calamari**: Cyan theme
- **Rodian**: Green theme
- **Default/Unknown**: Gray theme

### Component Styling
- **Cards**: Gradient backgrounds with species-colored borders
- **Modal**: Professional design with backdrop blur, rounded corners, and shadow effects
- **Buttons**: Consistent styling with hover effects and transitions
- **Loading States**: Unified spinner design across the application
- **Error States**: Red-themed error messages with retry functionality

## 📡 API Integration

### Endpoints Used
- `GET /people/` - Fetch characters with pagination
- `GET /people/?search={query}` - Search characters by name
- `GET /people/{id}/` - Fetch individual character details
- `GET /planets/{id}/` - Fetch homeworld details
- `GET /species/{id}/` - Fetch species details
- `GET /films/{id}/` - Fetch film details

### API Service Functions
- `fetchCharacters(page, searchQuery)`: Fetch paginated character list
- `fetchCompleteCharacterDetails(characterUrl)`: Fetch character with all related data
- `formatDate(dateString)`: Format date as dd-MM-yyyy

### Data Flow
1. User action triggers API call
2. Loading state is shown
3. API fetches data from SWAPI
4. Data is processed and formatted
5. UI updates with fetched data
6. Error handling for failed requests

## Key Features Explained

### Character Card Component
- Displays character name, image, and species badge
- Shows number of films the character appeared in
- Color-coded based on species
- Hover effects for better UX
- Clickable to open details modal

### Character Details Modal
- Large, professional modal design
- Fixed-height header image (320px)
- Scrollable content area
- Comprehensive character information
- Homeworld details section
- Films list with badges
- Date added information
- Close button with glassmorphism effect

### Search Functionality
- Real-time search by character name
- Search results count display
- Clear search button
- Maintains search state across pagination
- Case-insensitive search

### Pagination
- Next/Previous buttons
- Page information display
- Total character count
- Disabled state for unavailable pages
- Smooth scroll to top on page change

## User Experience Features

### Loading States
- Consistent loading spinner design
- Loading messages for better feedback
- Skeleton-like loading experience

### Error Handling
- User-friendly error messages
- Retry functionality for failed requests
- Error state styling
- Console logging for debugging

### Responsive Design
- Mobile-first approach
- Breakpoints for different screen sizes
- Flexible grid layouts
- Touch-friendly interactive elements

### Accessibility
- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus states for interactive elements

## Configuration

### Environment Variables
No environment variables are required. The application uses the public SWAPI API.

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Code Quality

### Code Organization
- Component-based architecture
- Separation of concerns (components, services, utilities)
- Reusable components
- Clean and readable code

### Best Practices
- ES6+ features
- React Hooks (useState, useEffect)
- Async/await for API calls
- Error handling
- Code comments where necessary

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built files in the `dist` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Azure Static Web Apps

## Troubleshooting

### Common Issues

1. **API Errors**
   - Check internet connection
   - Verify SWAPI is accessible
   - Check browser console for errors

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version (16+)
   - Verify all dependencies are installed

3. **Styling Issues**
   - Clear browser cache
   - Verify Tailwind CSS is configured correctly
   - Check PostCSS configuration

## License

This project is open source and available under the MIT License.

## Contributors

- Project developed as part of assignment/submission

## Acknowledgments

- [SWAPI](https://swapi.dev/) for providing the Star Wars API
- [React](https://react.dev/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool

