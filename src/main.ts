import { bootstrapApplication } from '@angular/platform-browser';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//! Eliminamos el appModule y app-routing
// import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// para hacer nuestra app syandalone
bootstrapApplication(AppComponent);
