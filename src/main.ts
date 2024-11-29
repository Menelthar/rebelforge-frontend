import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environment/environment';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Registro del Service Worker
if ('serviceWorker' in navigator && environment.production) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ngsw-worker.js') // Usa una ruta absoluta
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}
