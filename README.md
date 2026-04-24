## Escuadro

## Project Details
- **Framework:** Vue JS (Vite)
- **Module:** Alumni Portal: Document Request
- **Status:** Enhanced with Progressive Web App (PWA) capabilities

## Installation
Follow these steps to replicate the repository and run the application on a different computer:

1. **Prerequisites:**
    - Install [Node.js](https://nodejs.org/en/download) (LTS version recommended)
    - Install [Git](https://git-scm.com/install/)
    - Install [Python](https://www.python.org/downloads/) (3.7+) for the development server

2. **Clone the Repository:**
    ```bash
    git clone https://github.com/raymartm03/firstattempt2026_escuadro.git
    ```

3. **Install Dependencies:**
    ```bash
    npm install
    ```

4. **Build the Application:**
    ```bash
    npm run build
    ```

5. **Run the Development Server:**
    
    **Option A: Using Vite (Development with Hot Reload)**
    ```bash
    npm run dev
    ```
    - The application will be available at `http://localhost:5173/`.

    **Option B: Using Python (Production Build)**
    ```bash
    python serve.py
    ```
    - The application will be available at `http://localhost:8080/`.
    - This serves the built production files and fully tests PWA features.

## PWA Features (Activity #15)
This project has been converted into a full Progressive Web Application with the following capabilities:

### ✅ Service Worker
- **File:** `/public/sw.js`
- **Strategy:** Cache-First with network fallback
- **Features:**
  - Automatic asset pre-caching on installation
  - Offline support with fallback page
  - Smart cache invalidation for old versions
  - Handles network failures gracefully

### ✅ Web App Manifest
- **File:** `/manifest.json`
- **Branding:** Blue Knight Alumni Hub theme
- **Features:**
  - App name, short name, and icon configuration
  - Standalone display mode (appears as a native app)
  - Theme colors matching university branding (#003366)
  - Multiple icon sizes for different devices

### ✅ Offline Functionality
- **Fallback Page:** `/public/offline.html`
- **Auto-caching:** Critical assets cached on first load
- **Network Restoration:** App automatically reloads when connection returns
- **Seamless UX:** Users can interact with the app even without internet

### ✅ Installation & Home Screen
- Browser will show "Install App" prompt
- Add to home screen on mobile devices
- Standalone app experience on iOS and Android

## PWA Master Prompt (AI-Assisted Coding)
```
I am using Vue.js with Vite as my build tool. 
I need to convert this framework-based project into a Progressive Web Application (PWA).

Please help me with:
1. Creating a proper manifest.json with university branding (Blue Knight theme)
2. Implementing a Service Worker with offline caching
3. Setting up service worker registration in the Vue app
4. Creating an offline fallback page
5. Ensuring the app works offline with cached assets
6. Providing necessary meta tags for PWA installation

The project should:
- Cache critical assets on first load
- Serve from cache when offline
- Automatically update when back online
- Show an "Install App" prompt in supported browsers
- Work as a standalone app on mobile
```

## AI Tools Used
- **Deepseek:** Code generation
- **Claude:** Design polishing & PWA architecture
- **GitHub Copilot:** AI-assisted PWA implementation

## Testing the PWA

### 1. Service Worker Installation
- Open DevTools (F12) → Application tab
- Check "Service Workers" section
- Refresh the page after first load
- Service Worker status should show "activated and running"

### 2. Offline Test
- Open DevTools → Application tab
- Check "Offline" checkbox
- Refresh the page
- App should load completely offline with cached assets
- All images and styles should display perfectly

### 3. Install to Home Screen
- Look for "Install" icon in browser address bar
- Click to install as a standalone app
- App appears as a native application
- Can be launched from app drawer/home screen

### 4. Cache Management
- DevTools → Application → Cache Storage
- View cached assets: `alumni-hub-v1.0.0`
- Old caches are automatically deleted on service worker activation

## Git Workflow
- **Branch:** `feature/pwa-ready`
- **Main Changes:** Service worker, manifest, offline page, PWA meta tags
- All PWA-related features are in the feature branch for stability

## Known Issues Fixed During AI-Assisted Development
1. ✅ **Vite Entry Point:** Moved `index.html` to project root (required by Vite)
2. ✅ **Manifest Path:** Updated service worker to reference `/offline.html` instead of incorrect path
3. ✅ **Cache Names:** Aligned cache names across service worker and manifest
4. ✅ **MIME Types:** Python server configured to serve `.js` files with correct MIME type
5. ✅ **SPA Routing:** Python server configured to serve `index.html` for SPA navigation

## Deployment Instructions
To deploy this PWA to production:

1. Push to the `feature/pwa-ready` branch:
   ```bash
   git push origin feature/pwa-ready
   ```

2. Merge into main:
   ```bash
   git checkout main
   git merge feature/pwa-ready
   ```

3. Deploy the `public/` directory to your hosting service (Netlify, Vercel, GitHub Pages, etc.)

4. Ensure server headers are set:
   - `Cache-Control: no-cache` for HTML
   - `Service-Worker-Allowed: /` for service worker

## Previous Prompt (Activity #14)

> Act as a senior software developer from Ateneo de Davao University.
Using Vue.js (Vite), your task is to convert a mobile application into a fully functional desktop web application.

> I will provide screenshots of the Figma prototype along with the user flow.
> Requirements:

> The web design must closely match the mobile app prototype (layout, spacing, colors, and components).
> Ensure the UI is clean, responsive, and visually consistent.
> Improve and polish the existing App.vue code for better structure and readability.
> All features and functionalities must be fully working (forms, navigation, interactions, etc.).
> Follow best practices in Vue.js development (component structure, reusability, and maintainability).

## Video Link:
>[https://drive.google.com/file/d/1aVSqdvDU2o3KBuNaBk-S-fej6ZpL56Y4/view?usp=sharing](https://drive.google.com/file/d/1aVSqdvDU2o3KBuNaBk-S-fej6ZpL56Y4/view?usp=sharing)



## Reference document:

>[https://docs.google.com/document/d/15MJ0UUTx85zTlSI5XH1hmJZ4inzoYhlPsKg80DnidXA/edit?tab=t.qh2shoz8hbjp](https://docs.google.com/document/d/15MJ0UUTx85zTlSI5XH1hmJZ4inzoYhlPsKg80DnidXA/edit?tab=t.qh2shoz8hbjp)

## Screenshots
Below are the official screenshots of the web application in a desktop browser:
<img width="1915" height="913" alt="image" src="https://github.com/user-attachments/assets/d8063fbe-a781-41bc-9c22-d15358597b99" />
<img width="1916" height="866" alt="image" src="https://github.com/user-attachments/assets/fd72fadb-882a-4153-b10e-00b356e66a7e" />
<img width="1918" height="838" alt="image" src="https://github.com/user-attachments/assets/df14747d-1c2b-4bbc-9947-8340b40ccdfb" />
<img width="1919" height="871" alt="image" src="https://github.com/user-attachments/assets/5ae0303d-7230-4e12-b2c8-50dbc1ce57b2" />
<img width="1916" height="873" alt="image" src="https://github.com/user-attachments/assets/79fd33c2-f751-4a06-bb4e-4ca63c498fbe" />
<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/494449e9-36b7-423b-ad5c-16063338091a" />
<img width="1918" height="868" alt="image" src="https://github.com/user-attachments/assets/b36798c5-90f7-47ee-a084-0701b427dcbd" />
<img width="1919" height="876" alt="image" src="https://github.com/user-attachments/assets/e8e309c6-ce0d-4294-bad9-d6af7fbcee1b" />
<img width="1918" height="869" alt="image" src="https://github.com/user-attachments/assets/d7497232-abeb-4dd4-a85f-3fabfa074b66" />
<img width="1919" height="868" alt="image" src="https://github.com/user-attachments/assets/02778d97-5a72-4140-8197-37cf5fdb8046" />
<img width="1916" height="869" alt="image" src="https://github.com/user-attachments/assets/fd2089ef-bf35-4cc9-aec9-1e0d700e3704" />
<img width="1919" height="857" alt="image" src="https://github.com/user-attachments/assets/8771b9d8-3098-4a41-baa9-ddc26569563a" />
<img width="1919" height="855" alt="image" src="https://github.com/user-attachments/assets/6a5f8784-1a56-4d80-8d91-b9462cd15ba0" />
<img width="1915" height="872" alt="image" src="https://github.com/user-attachments/assets/00ac5f63-2d5f-4eeb-8b31-7974937d08d5" />
<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/a87ddcc8-32d8-438a-a835-e57024736e3a" />
<img width="1919" height="864" alt="image" src="https://github.com/user-attachments/assets/3704781f-a242-42b6-b1e7-501615facd68" />
<img width="1917" height="866" alt="image" src="https://github.com/user-attachments/assets/8d49723f-8a66-4d78-bd83-ccd25f856476" />
<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/1814c864-d700-4405-8ad6-fcc68dea7ec6" />
<img width="1907" height="924" alt="image" src="https://github.com/user-attachments/assets/732ccd70-74ae-4bf8-9e84-f4210a20b657" />
<img width="1913" height="924" alt="image" src="https://github.com/user-attachments/assets/b1c390e7-66aa-4176-8904-22f6fa6e6888" />
<img width="1919" height="865" alt="image" src="https://github.com/user-attachments/assets/0775c0af-892e-42af-8051-7c3c44d21b89" />
<img width="1918" height="871" alt="image" src="https://github.com/user-attachments/assets/ed4dfc06-4ccc-4f99-a984-01458f991f6f" />
<img width="1913" height="865" alt="image" src="https://github.com/user-attachments/assets/8fad6628-5a45-4ae7-9044-fd099ef249a5" />
<img width="1919" height="868" alt="image" src="https://github.com/user-attachments/assets/3a75e648-1150-489f-a32a-2e006939e1d0" />
<img width="1919" height="868" alt="image" src="https://github.com/user-attachments/assets/6fcbf301-cd5c-404e-931b-57ba5afe437f" />
<img width="1913" height="868" alt="image" src="https://github.com/user-attachments/assets/9fa89496-7780-4115-b30b-9cfaeb6896d6" />
<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/32176bdc-c875-4dcd-9b07-28dd2a3bd45d" />




---
*Created for Ateneo de Davao University Faculty.*
