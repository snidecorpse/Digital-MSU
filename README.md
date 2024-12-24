# Digital MSU Interactive Platform

## Project Overview

Digital MSU is a on going Interactive Platform which aims to provide students and users with a modern web-based application designed to showcase an engaging and immersive experience of MSU buildings & dorms. Features will include hosting 3D models to providing users with tools to interact with the scene + add features for customization annd potential amazon api attachment to buy and decorate objects and design you very own dorm. This project combines **React**, **React Three Fiber**, **Leva**, **Framer Motion**, and **Three.js** all packaged using **ViteJS** for now, and will continue to add on to deliver a visually stunning and user-friendly experience.

---

## Key Features (As of now)

1. **Interactive Home Page**:
   - Smooth transition to the 3D Viewer page using **Framer Motion**.

2. **Mobile-Friendly Experience** (not tested):
   - Different homepage for mobile users and desktop users
   - Only preview allowed on the phone experience

3. **Model Viewer Page**:
   - Displays 3D models using React Three Fiber.
   - Includes interactive UI controls with **Leva** for modifying lighting, scaling, and positioning of models (for now).
   - Features a draggable, resizable floating window for advanced controls.
   - Interactive and user friendly sidebar expander

4. **MSU-Themed Aesthetic**:
   - A clean, modern interface with MSU's green (#18453B) and white accent colors.

5. **Smooth Page Transitions**:
   - Uses **Framer Motion** for animations when transitioning between pages, creating a polished user experience.

---

## Tech Stack

### Front-End
- **React**: Core framework for building the UI.
- **React Three Fiber**: Used for rendering 3D scenes.
- **Three.js**: Handles 3D geometries, lights, and particles.
- **Leva**: Adds an interactive UI for real-time parameter adjustments (might be used as the main UI).
- **Framer Motion**: Enables smooth animations for page transitions.

### Build Tool
- **Vite**: A development build tool for bundling and serving the application.

### Styling
- Custom CSS with attention to modern UI principles and responsiveness (might transition to tailwind maybe).

---

## Project Timeline

### Version 1.0 (Initial Setup)
- Set up React + Vite project.
- Basic structure using React Three Fiber.
- Implemented the Home Page with a simple rotating box.

### Version 1.1 (Interactive Torus Knot)
- Replaced the box with a reflective torus knot (for funsies)
- Added ambient and directional lighting for visual enhancement (messing around).
- Included basic animations for rotation.

### Version 1.2 (Home Page Redesign) (not finalized at all)
- Added a transition to redirect users to the Model Viewer page.

### Version 1.3 (Model Viewer Page) (ModelPage.jsx)
- Created a 3D viewer to showcase imported .gltf models.
- Implemented draggable and resizable floating windows for model controls.
- Sidebar naviation (tooks lot of work, but came up with a clean resizer ui solution)

### Version 1.4 (Theming)
- Applied MSU's signature green (#18453B) (from a google search lmao) and white for UI elements.
- Designed buttons, sidebars, and backgrounds with a aesthetic. (not good enough tho)

### Version 1.5 (Leva Integration) (just testing, might make whole UI controller in leva)
- Added real-time controls using Leva for:
  - Lighting adjustments (intensity, direction, etc.).
  - Scaling and rotating 3D models.

### Version 1.6 (Home Page Particle System)
- Redesigned the particle system to form the text "MSU."
- Refactored code for cleaner handling of transitions and animations.

### Version 1.7 (Page Transition Effects) (rather than manually doing it)
- Integrated **Framer Motion** for smooth transitions between Home and Model Viewer pages.

### Version 1.8 (Mobile Support) (not tested)
- Added a simplified mobile homepage with an "Enter" button and disclaimer.

---

## Folder Structure

```
src/
├── components/           
│   ├── Button3D.jsx      
│   └── DraggableWindow.jsx 
├── models/               
│   └── testcube.gltf     
├── pages/                
│   ├── Home.jsx          
│   ├── MobileHome.jsx    
│   └── ModelPage.jsx     
├── styles/               
│   ├── Home.css          
│   ├── MobileHome.css   
│   └── ModelPage.css     
├── App.jsx               
└── main.jsx              
```

---

## Installation

---

### Prerequisites
- Node.js (v16+)
- npm
---