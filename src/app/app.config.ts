import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAnalytics } from "firebase/analytics";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled'
      })
    ),
    
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};

const firebaseConfig = {
  apiKey: "AIzaSyDZ-hkYDLXxAuDnWeKe4x8c7gfwYxHn04U",
  authDomain: "ppw-proyectoangular.firebaseapp.com",
  projectId: "ppw-proyectoangular",
  storageBucket: "ppw-proyectoangular.firebasestorage.app",
  messagingSenderId: "686878514184",
  appId: "1:686878514184:web:b65fad9602341dcf9845bd",
  measurementId: "G-X8V39N1RKB"
};