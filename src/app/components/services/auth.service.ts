import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  user
} from '@angular/fire/auth';
import { 
  Firestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  currentUser$ = user(this.auth);

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(email: string, password: string): Observable<any> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password).then(credential => {
        return this.saveUserRole(credential.user.uid, email);
      })
    );
  }

  loginWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(
      signInWithPopup(this.auth, provider).then(credential => {
        return this.saveUserRole(credential.user.uid, credential.user.email!);
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  private async saveUserRole(uid: string, email: string): Promise<void> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);

    // Si el usuario no existe en la colección 'users', se verifica su rol
    if (!userSnap.exists()) {
      
      // 1. Consultar la colección 'admins' buscando si el email está registrado
      const adminsRef = collection(this.firestore, 'admins');
      const q = query(adminsRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      // 2. Si la consulta devuelve documentos, el rol es 'admin'; de lo contrario, 'cliente'
      const role = !querySnapshot.empty ? 'admin' : 'cliente';
      
      // 3. Guardar el perfil definitivo en la colección 'users'
      await setDoc(userRef, {
        uid,
        email,
        role,
        fechaCreacion: new Date().toISOString()
      });
    }
  }
}