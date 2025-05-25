# 📁 Document Upload System

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern, robust, and highly customizable document upload and preview system built with **React**, **TypeScript**, and **Vite**. This application provides a seamless user experience for uploading, managing, and previewing documents, with persistent storage and a UI inspired by Apple's design principles. The system features a beautiful interface with smooth animations, comprehensive error handling, and support for multiple file types.

---

## 📋 Table of Contents

- [📝 Project Overview](#-project-overview)
- [🏗️ Architecture & Design Decisions](#️-architecture--design-decisions)
- [📂 Complete File Structure](#-complete-file-structure)
- [✨ Core Features](#-core-features)
- [🧩 Component & Hook Breakdown](#-component--hook-breakdown)
- [💾 Persistent Storage & File Handling](#-persistent-storage--file-handling)
- [✅ Validation & Error Handling](#-validation--error-handling)
- [♿ Accessibility & Responsiveness](#-accessibility--responsiveness)
- [🎨 Customization](#-customization)
- [🚀 Getting Started](#-getting-started)
- [🔧 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License & Credits](#-license--credits)

---

## 📝 Project Overview

This project is a frontend UI module for uploading, previewing, and managing documents. It supports drag-and-drop uploads, file validation, persistent storage, and rich previews for images, text, PDF, and DOCX files. The design is clean, minimal, and inspired by Apple's UI guidelines.

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **🔧 Frontend Core** | React 18, TypeScript, Vite |
| **🎨 UI Components & Styling** | Radix UI, Lucide React, Class Variance Authority, TailwindCSS, TailwindCSS Animate |
| **📊 State Management & Data** | React Query, React Hook Form, Zod |
| **⚙️ Development Tools** | ESLint, SWC, PostCSS |

---

## 🏗️ Architecture & Design Decisions

- **🧩 Component-Driven Architecture:** Each UI feature is encapsulated in a dedicated React component, promoting reusability and maintainability. The application uses a modern component hierarchy with ErrorBoundary for robust error handling.

- **📊 State Management & Data Flow:**
  - Custom React hooks (`useFileUpload`, `use-toast`, `use-mobile`) for centralized logic
  - React Query for efficient data fetching and caching
  - Session-based loading state management for smooth page transitions

- **💾 Persistent Storage & File Handling:**
  - Files stored in `src/uploaded-files` with secure handling
  - Metadata managed via `localStorage` for session persistence
  - Efficient cleanup of Blob URLs and file resources

- **🎨 UI/UX Implementation:**
  - Radix UI primitives for accessible, robust interface components
  - Tailwind CSS for responsive, maintainable styling
  - Multiple toast providers (Sonner & Radix) for comprehensive notifications
  - Drawer component for mobile-friendly navigation
  - Loading progress indicators with smooth animations

- **⚡ Modern Development Stack:**
  - Vite for fast development and optimized production builds
  - TypeScript for type safety and improved developer experience
  - ESLint and proper code organization
  - Dynamic component loading with React.Suspense

- **🚀 Performance Optimizations:**
  - Efficient file reading and processing
  - Debounced drag events
  - Route-based code splitting
  - Memory leak prevention through proper cleanup
  - Component preloading for critical UI elements

- **🌐 Cross-Browser Compatibility:**
  - Polyfills for modern APIs
  - Fallbacks for unsupported features
  - Consistent styling across browsers

---

## 📂 Complete File Structure

```
dropupload-react-app/
├── 📄 components.json
├── ⚙️ eslint.config.js
├── 🌐 index.html
├── 📦 package.json
├── 🎨 postcss.config.js
├── 📖 README.md
├── 🎨 tailwind.config.ts
├── 📝 tsconfig.app.json
├── 📝 tsconfig.json
├── 📝 tsconfig.node.json
├── ⚡ vite.config.ts
├── 📁 public/
│   └── 🖼️ github-pic.png
├── 📁 src/
│   ├── 🎨 App.css
│   ├── ⚛️ App.tsx
│   ├── 🎨 index.css
│   ├── ⚛️ main.tsx
│   ├── 🔧 vite-fs-plugin.ts
│   ├── 📁 components/
│   │   ├── 📁 FileUpload/
│   │   │   ├── 📤 DropZone.tsx
│   │   │   ├── 📄 FileItem.tsx
│   │   │   ├── 📋 FileList.tsx
│   │   │   ├── 👁️ FilePreview.tsx
│   │   │   └── 📦 FileUploadContainer.tsx
│   │   └── 📁 ui/
│   │       ├── 📊 Progress.tsx
│   │       └── ⏳ LoadingProgress.tsx
│   ├── 📁 hooks/
│   │   ├── 🎣 useFileUpload.ts
│   │   ├── 📱 use-mobile.tsx
│   │   └── 🔔 use-toast.ts
│   ├── 📁 lib/
│   │   └── 🛠️ utlis.ts
│   ├── 📁 pages/
│   │   ├── 🏠 Index.tsx
│   │   └── ❌ NotFound.tsx
│   ├── 📁 types/
│   │   ├── 📄 file.types.ts
│   │   └── 🎬 view-transitions.d.ts
│   ├── 📁 uploaded-files/
│   └── 📁 utils/
│       ├── 💾 fileStorage.ts
│       ├── ✅ fileValidation.ts
│       └── ...
```

---

## ✨ Core Features

### 📤 Upload Capabilities
- **🎯 Modern Drag & Drop:** Intuitive file upload with visual feedback and fallback to traditional file picker
- **📚 Multiple File Support:** Handle multiple files simultaneously with individual progress tracking
- **📋 Comprehensive File Support:** 
  - Documents: PDF, DOCX, DOC, TXT
  - Images: PNG, JPG, JPEG, GIF
  - Size and type validation with clear user feedback

### 👁️ File Preview System
- **🌐 Universal Preview:** Single interface for all supported file types
- **🎯 Smart Rendering:**
  - Images: Optimized inline preview with zoom support
  - PDFs: Native browser preview
  - Text: Syntax-highlighted preview
  - DOCX/DOC: Microsoft Office Online integration
- **📱 Responsive Previews:** Adapts to different screen sizes and orientations

### 🎭 User Experience
- **📊 Progress Tracking:**
  - Real-time upload progress indicators
  - Processing status visualization
  - Loading animations for better perceived performance
- **⚠️ Error Handling:**
  - Comprehensive error messages
  - Automatic retry mechanisms
  - Fallback behaviors for unsupported features
- **🎮 Interactive Features:**
  - File deletion with confirmation
  - Bulk actions support
  - Keyboard navigation
  - Touch gestures on mobile

### ⚡ Technical Features
- **🚀 Performance Optimized:**
  - Lazy loading of preview components
  - Efficient memory management
  - Automatic cleanup of resources
- **💾 Storage Management:**
  - Persistent file storage
  - Session-based metadata handling
  - Automatic state recovery
- **📱 Mobile-First Design:**
  - Touch-optimized interface
  - Responsive layouts
  - Mobile-specific UI enhancements

---

## 🧩 Component & Hook Breakdown

### 🔧 Core Components

| Component | Purpose | Features |
|-----------|---------|----------|
| **📦 FileUploadContainer.tsx** | Root container component | Orchestrates entire file upload experience |
| **📤 DropZone.tsx** | Drag-and-drop interface | Visual feedback, file picker fallback |
| **📋 FileList.tsx** | File collection display | File management and interaction |
| **📄 FileItem.tsx** | Individual file component | Status indicators and actions |
| **👁️ FilePreview.tsx** | Preview modal | Multi-format support |

#### 🎨 UI Components
| Component | Purpose |
|-----------|---------|
| **📊 Progress.tsx & LoadingProgress.tsx** | Customizable progress indicators |
| **🚨 ErrorBoundary.tsx** | Global error handling with fallback UI |
| **📱 drawer.tsx** | Side panel component for mobile views |
| **💡 tooltip.tsx** | Accessible tooltip component |
| **🔔 toast/** | Comprehensive notification system |

### 🎣 Custom Hooks & Utilities

#### 📊 State Management Hooks
- **🎣 useFileUpload.ts:** Core file handling logic
  - File validation and processing
  - Storage synchronization
  - Preview generation
  - Memory management
  - Upload status tracking

#### 🎨 UI Enhancement Hooks
| Hook | Purpose |
|------|---------|
| **🔔 use-toast.ts** | Notification management |
| **📱 use-mobile.tsx** | Responsive design helper |

#### 🛠️ Utility Functions
| Function | Purpose |
|----------|---------|
| **💾 fileStorage.ts** | File system operations |
| **✅ fileValidation.ts** | File type and size validation |
| **⚡ preload.ts** | Component and asset preloading |

---

## 💾 Persistent Storage & File Handling

- **📁 File Storage:** Files are saved to `src/uploaded-files/` using the File API and custom utilities.
- **📊 Metadata:** File metadata (name, type, size, status, preview URL, etc.) is stored in `localStorage` for session persistence.
- **👁️ Preview Generation:**
  - 🖼️ Images: Blob URLs for instant preview.
  - 📝 Text: Content loaded and displayed in a modal.
  - 📄 PDF: Embedded via `<iframe>`.
  - 📄 DOCX: Previewed using Microsoft Office Online Viewer (requires internet).
- **🧹 Cleanup:** Object URLs are revoked when files are removed or the app is closed.

---

## ✅ Validation & Error Management

### 🔍 File Validation
- **📋 Type Checking:**
  ```typescript
  // src/utils/fileValidation.ts
  export const validateFileType = (file: File): boolean => {
    return ALLOWED_TYPES.some(type => 
      type.startsWith('.') ? file.name.endsWith(type) : file.type.match(type)
    );
  };
  ```
- **📏 Size Validation:**
  - Individual file size limits
  - Total upload size constraints
  - Dynamic size checking

### 🚨 Error Handling System
| Type | Features |
|------|----------|
| **👤 User-Facing Errors** | Clear error messages, Actionable feedback, Recovery suggestions |
| **⚙️ System Error Management** | ErrorBoundary implementation, Graceful degradation, Automatic recovery attempts |

### 📊 Progress Tracking
| State | Description |
|-------|-------------|
| **📤 Upload Progress** | Individual file progress, Overall batch progress, Status indicators |
| **⚙️ Processing States** | Pending, Processing, Complete, Error, Retry |

---

## ♿ Accessibility & Device Support

### ⌨️ Keyboard Navigation
- **🎯 Focus Management:**
  - Logical tab order
  - Focus trapping in modals
  - Keyboard shortcuts
- **🎮 Interactive Elements:**
  - Button/link interactions
  - Dialog controls
  - File selection

### 🔊 Screen Reader Optimization
- **🏷️ ARIA Implementation:**
  ```tsx
  <button
    aria-label="Upload file"
    role="button"
    aria-describedby="upload-description"
  >
    Upload
  </button>
  ```
- **📖 Semantic Structure:**
  - Proper heading hierarchy
  - Meaningful landmarks
  - Clear descriptions

### 📱 Responsive Design
| Feature | Implementation |
|---------|----------------|
| **📐 Layout Adaptation** | Mobile-first approach, Dynamic resizing, Orientation handling |
| **👆 Touch Optimization** | Large touch targets, Touch gestures, Mobile-specific features |

### 🌐 Browser Compatibility
| Browser | Status |
|---------|--------|
| **🟢 Modern Browsers** | Chrome/Edge (latest), Firefox (latest), Safari (latest) |
| **🔄 Fallback Behaviors** | Graceful degradation, Feature detection, Polyfill integration |

---

## 🎨 Customization

### 📄 File Handling Configuration
```typescript
// src/types/file.types.ts
export const FILE_LIMITS = {
  maxFiles: 5,
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/*', 'application/pdf', 'text/plain', '.doc', '.docx']
};
```

### 🎨 Styling System
- **🎨 Theme Customization:**
  ```typescript
  // tailwind.config.ts
  export default {
    theme: {
      extend: {
        colors: { /* Custom colors */ },
        animation: { /* Custom animations */ },
        // ... other theme extensions
      }
    }
  }
  ```
- **🧩 Component-Level Styling:**
  - Modify component classes in individual files
  - Override default styles through Tailwind classes
  - Customize Radix UI primitive styles

### 🔔 Behavioral Customization
| Feature | Options |
|---------|---------|
| **🔔 Toast Configuration** | Adjust timing and positions, Customize appearance and animations, Modify interaction behaviors |
| **👁️ Preview Options** | Configure preview sizes and layouts, Customize loading states, Modify preview render options |

### 📱 Mobile Optimization
- **📐 Breakpoint Configuration:**
  ```typescript
  // hooks/use-mobile.tsx
  const MOBILE_BREAKPOINT = 768; // Adjust as needed
  ```
- **👆 Touch Interaction:**
  - Customize gesture behaviors
  - Adjust touch target sizes
  - Modify mobile-specific features

### ⚡ Performance Tuning
- **⚡ Preload Configuration:**
  ```typescript
  // utils/preload.ts
  export const preloadComponents = [
    // Add/remove components to preload
  ];
  ```
- **💾 Caching Behavior:**
  - Adjust cache duration
  - Modify storage strategies
  - Configure cleanup policies

---

## 🚀 Getting Started

### 📋 Prerequisites

| Requirement | Version | Description |
|-------------|---------|-------------|
| **📦 Node.js** | v18+ recommended | JavaScript runtime |
| **📦 npm** | v8+ | Package manager |
| **📦 yarn** | v1.22+ | Alternative package manager |
| **🌐 Browser** | Modern | File API and localStorage support |
| **💾 Disk Space** | 1GB+ | Free disk space |
| **🌐 Internet** | Required | For DOCX previews |

### 🛠️ Installation & Setup

1. **📥 Clone the repository:**
   ```sh
   git clone https://github.com/RAJAT72528/document-upload-system.git
   cd document-upload-system/dropupload-react-app
   ```

2. **📦 Install dependencies:**
   ```sh
   npm install
   ```
   Note: This will install all required dependencies including:
   - React and React DOM
   - TypeScript
   - Vite build tools
   - Tailwind CSS
   - Radix UI components
   - Other utilities

3. **⚙️ Configure environment (if needed):**
   Create a `.env` file in the root directory:
   ```
   VITE_MAX_FILE_SIZE=10485760  # 10MB in bytes
   VITE_MAX_FILES=5
   VITE_UPLOAD_DIR=src/uploaded-files
   ```

4. **🚀 Start the development server:**
   ```sh
   npm run dev
   ```
   This will:
   - Start Vite's dev server with hot module replacement
   - Compile TypeScript in watch mode
   - Start the file system watcher
   - Open your default browser

5. **🌐 Access the application:**
   - Development: Visit [http://localhost:5173](http://localhost:5173)
   - Production build: [http://localhost:4173](http://localhost:4173) (after running `npm run preview`)

### 🎯 Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | 🚀 Start development server |
| `npm run build` | 📦 Create production build |
| `npm run build:dev` | 🔧 Create development build |
| `npm run preview` | 👁️ Preview production build |
| `npm run lint` | ✅ Run ESLint checks |

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| **👁️ Previews not appearing after reload** | Ensure your browser supports the File API and localStorage |
| **📄 DOCX previews not working** | An internet connection is required (uses Microsoft Office Online Viewer) |
| **❌ File not found errors** | Make sure files are not deleted from `src/uploaded-files/` outside the app |
| **🌐 Browser compatibility** | Latest versions of Chrome, Firefox, Safari, and Edge are supported |
| **🔍 General debugging** | Check the browser console for error messages if something isn't working as expected |

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for bug fixes, improvements, or new features.

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/YourFeature`)
3. 💾 Commit your changes (`git commit -am 'Add some feature'`)
4. 📤 Push to the branch (`git push origin feature/YourFeature`)
5. 🔄 Open a pull request

---

## 📄 License & Credits

This project is licensed under the [MIT License](./LICENSE).

**🙏 Credits:**
- [🎨 Lucide Icons](https://lucide.dev/)
- [🔔 sonner](https://sonner.emilkowal.ski/)
- [🎨 Tailwind CSS](https://tailwindcss.com/)
- [📄 Microsoft Office Online Viewer](https://products.office.com/en-us/office-online/view-office-documents-online)
- [🧩 Radix UI](https://www.radix-ui.com/)
- [🍎 Apple Design Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

**👨‍💻 Made by Rajat Singh**

For questions or contributions, please open an issue or submit a pull request.