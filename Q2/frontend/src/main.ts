import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

console.log('louislaw: glad to see you here, demo of blocking console.log');

console.log = () => {};
console.warn = () => {};
console.debug = () => {};
console.error = () => {};

console.log('should not see me in prod');
