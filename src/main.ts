import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// angular/fire library
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//! Eliminamos el appModule y app-routing
// import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
import { enviroment } from './enviroments/enviroment';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// para hacer nuestra app syandalone
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(enviroment.firebase)),
      provideFirestore(() => getFirestore())
    ),
  ],
});
