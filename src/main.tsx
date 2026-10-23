import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const rootEl = document.getElementById('root');

if (rootEl) {
  rootEl.innerHTML = '';
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  document.body.innerHTML =
    '<div style="font-family:system-ui,sans-serif;padding:2rem;color:#0C1116;background:#E7EDF5;min-height:100vh"><h1>Root element not found</h1><p>The page could not start. Please check your browser console.</p></div>';
}
