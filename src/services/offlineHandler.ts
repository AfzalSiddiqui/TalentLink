export class NetworkError extends Error {
  constructor(message = 'Network error. Please check your connection and try again.') {
    super(message);
    this.name = 'NetworkError';
  }
}

export function isOnline(): boolean {
  return navigator.onLine;
}

export function checkConnectivity(): void {
  if (!isOnline()) {
    throw new NetworkError('You are offline. Please check your internet connection.');
  }
}

type Listener = (online: boolean) => void;

const listeners = new Set<Listener>();

function notify(online: boolean) {
  listeners.forEach((fn) => fn(online));
}

window.addEventListener('online', () => notify(true));
window.addEventListener('offline', () => notify(false));

export function onConnectivityChange(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
