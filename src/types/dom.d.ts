/// <reference types="vite/client" />

interface Window {
  sessionStorage: Storage;
  addEventListener: typeof addEventListener;
  removeEventListener: typeof removeEventListener;
}

declare function addEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): void;

declare function removeEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions
): void;
