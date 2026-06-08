import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, user, User } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs, doc, getDoc, updateDoc } from '@angular/fire/firestore';

export interface Solicitud {
  id: string;
  uidSolicitante: string;
  correoSolicitante: string;
  nombreSolicitante: string;
  idProgramador: string;
  ideaProyecto: string;
  estado: string;
  observacion: string;
  fechaCreacion: string;
}

@Component({
  selector: 'app-request-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-page.html'
})
export class RequestsPageComponent implements OnInit {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  userRole = signal<'admin' | 'cliente' | null>(null);
  solicitudes = signal<Solicitud[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    user(this.auth).subscribe(async (usr) => {
      if (usr) {
        // Pasamos el objeto de usuario completo para acceder a su email
        await this.cargarPerfilYDatos(usr);
      } else {
        this.isLoading.set(false);
      }
    });
  }

  async cargarPerfilYDatos(usr: User) {
    try {
      const userRef = doc(this.firestore, `users/${usr.uid}`);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const role = userSnap.data()['role'];
        this.userRole.set(role);
        
        // Mapear el correo al identificador del programador
        let programadorId = '';
        if (usr.email === 'mpaez94144@gmail.com') {
          programadorId = 'mateo';
        } else if (usr.email === 'cuji665@gmail.com') {
          programadorId = 'tigre';
        }

        await this.cargarSolicitudes(usr.uid, role, programadorId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async cargarSolicitudes(uid: string, role: string, programadorId: string) {
    const solicitudesRef = collection(this.firestore, 'solicitudes');
    let q;

    if (role === 'admin') {
      // Filtramos las solicitudes que sean para "ambos" o exclusivamente para el admin actual
      q = query(solicitudesRef, where('idProgramador', 'in', ['ambos', programadorId]));
    } else {
      // Si es cliente, ve únicamente las suyas
      q = query(solicitudesRef, where('uidSolicitante', '==', uid));
    }

    const querySnapshot = await getDocs(q);
    const data: Solicitud[] = [];
    
    querySnapshot.forEach((docSnap) => {
      data.push({ id: docSnap.id, ...docSnap.data() } as Solicitud);
    });

    // Ordenamos por fecha de creación localmente.
    // Esto evita requerir la creación manual de un índice compuesto en Firebase Console
    data.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime());

    this.solicitudes.set(data);
  }

  async actualizarSolicitud(id: string, observacion: string, estado: string) {
    try {
      const docRef = doc(this.firestore, `solicitudes/${id}`);
      await updateDoc(docRef, { observacion, estado });
      
      this.solicitudes.update(actuales => 
        actuales.map(sol => sol.id === id ? { ...sol, observacion, estado } : sol)
      );
    } catch (error) {
      console.error(error);
    }
  }
}