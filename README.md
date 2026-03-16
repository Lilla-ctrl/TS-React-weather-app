**SkyCast Weather 🌤️ (TypeScript Refactor)**

A high-performance weather dashboard built with React, TypeScript, and Tailwind CSS. Originally a JavaScript project, this platform was fully refactored to prioritize type safety, efficient asynchronous data handling, and a polished user experience.

**🛠️ Key Engineering Improvements**
1. Performance Orchestration with Promise.all
The original application suffered from a "waterfall" of sequential API requests, leading to a 4.5s initial load time.

Challenge: Coordinates, current weather, forecasts, and timezone data were being fetched one after another.

Solution: Implemented Promise.all to parallelize independent network requests.

Result: Reduced initial load time by over 65%, bringing the experience under 1.5s on average.

**2. Lifecycle Management & UI Stability**
To solve a persistent UI flicker during data transitions, I refactored the component's state synchronization.

Refactor: Utilized useRef to track and cache timezone data across re-renders.

Outcome: Eliminated "stale data" flashes, ensuring the UI only updates once all necessary data points are synchronized.

**3. Full TypeScript Migration**
The core of this refactor was moving the entire codebase to TypeScript to ensure a more robust and scalable architecture.

Defined strict Interfaces for all API responses.

Eliminated "any" types to maximize the benefits of the compiler.

Improved developer experience and bug prevention through strict type checking.

**🎨 Design Evolution**
Old Tech: Vanilla CSS & Bootstrap.

New Tech: Tailwind CSS.

Layout: Implemented a mobile-first approach using CSS Grid and Flexbox for a truly responsive, minimal aesthetic.

**📦 Tech Stack**
Framework: React 18

Language: TypeScript

Styling: Tailwind CSS

APIs: SheCodes Weather API (Integrated with Geolocation API)

Data Fetching: Axios

**🚀 Getting Started **
1. Clone the repo:
git clone https://github.com/your-username/skycast-weather.git

2. Install dependencies:
npm install

3. Environment Variables:
Create a .env file and add your API Key: VITE_WEATHER_API_KEY=your_key_here

4. Run Dev Server:
npm run dev
