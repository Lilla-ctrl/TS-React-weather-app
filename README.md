SkyCast Weather 🌤️
A modern, responsive weather dashboard built with React and Tailwind CSS.

Project Intent
The primary objective of this project was to migrate an existing JavaScript codebase to TypeScript, implementing strict type-checking to improve maintainability and developer experience. Following the migration, the application underwent a significant refactor to transition from a decentralized "component-heavy" fetching logic to a "lifted state" architecture, alongside a complete UI/UX revamp using CSS Grid.

🛠 Technical Specifications
Core Tech Stack
Framework: React (Vite)

Language: TypeScript

Styling: Tailwind CSS (Utility-first CSS)

API: SheCodes Weather API

Notifications: react-hot-toast

Key Technical Features
TypeScript Migration: Full implementation of Interfaces for API responses and component props, eliminating "any" types and ensuring data integrity across the flow.

State Management: Lifted weather and forecast state to the parent Weather component to ensure a "single source of truth" and prevent redundant API calls.

Responsive Sidebar Layout: Utilized CSS Grid Template Areas to create a dynamic layout that shifts from a vertical stack on mobile to a multi-column sidebar layout on medium screens.

Modern Viewport Handling: Implemented min-h-[100dvh] to ensure full-screen background coverage across mobile browsers with dynamic address bars.

Graceful Error Handling: Dual-tier error system using react-hot-toast for transient search errors and a conditional "Empty State" UI for critical load failures.

📐 Architecture & Refactoring details
Data Flow
Previously, components fetched their own data based on a passed string. The refactored version uses a centralized search function:

Parent (Weather.tsx) fetches both Current Weather and 5-Day Forecast simultaneously using Promise.all.

Data is validated and passed down as typed objects via props.

Child Components (WeatherInfo, WeatherForecast) act as "Presentational Components," focusing purely on rendering.

CSS Grid Mapping
The application uses a custom grid configuration for medium screens:

Mobile: 1fr (Single column)

Tablet/Desktop: [1fr_18rem] (Main content + Sidebar)

Responsive Units: Used rem and em exclusively for spacing and typography to ensure accessibility and scaling.

🚀 Getting Started 
1. Clone the repo:
git clone https://github.com/your-username/skycast-weather.git

2. Install dependencies:
npm install

3. Environment Variables:
Create a .env file and add your API Key: VITE_WEATHER_API_KEY=your_key_here

4. Run Dev Server:
npm run dev
