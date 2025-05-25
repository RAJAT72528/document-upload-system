import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';
import App from './App';
import { LoadingProgress } from './components/ui/LoadingProgress';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<LoadingProgress />}>
    <App />
  </Suspense>
);
