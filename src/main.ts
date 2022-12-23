import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// angular/fire library
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//! Eliminamos el appModule y app-routing
// import { AppModule } from './app/app.module';
import { appRoutes } from './app/app.routes';
import { enviroment } from './enviroments/enviroment';
import { AppComponent } from './app/app.component';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// para hacer nuestra app syandalone
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(enviroment.firebase)),
      provideFirestore(() => getFirestore())
    ),
  ],
}).catch(console.error);
