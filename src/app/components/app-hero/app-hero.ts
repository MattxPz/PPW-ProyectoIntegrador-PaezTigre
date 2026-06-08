import { ChangeDetectionStrategy, Component, HostListener, OnInit, signal } from '@angular/core';
import { user } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; 

import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth, User } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './app-hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHero implements OnInit {
  activeSection = signal<string>('about');

  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  currentUser = signal<User | null>(null);
  isLoading = signal(false);
  successMsg = signal<string | null>(null);

  contactForm = this.fb.group({
    nombre: ['', Validators.required],
    programador: ['ambos', Validators.required],
    idea: ['', Validators.required]
  });

  @HostListener('window:scroll', [])
  onScroll() {
    const sections = ['about', 'skills', 'projects', 'contact'];
    let currentSection = 'about'; 

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          currentSection = section;
        }
      }
    }

    this.activeSection.set(currentSection);
  }

  ngOnInit() {
    user(this.auth).subscribe(usr => {
      this.currentUser.set(usr);
    });
  }

  async onSubmit() {
    if (this.contactForm.invalid || !this.currentUser()) return;

    this.isLoading.set(true);
    this.successMsg.set(null);

    const { nombre, programador, idea } = this.contactForm.value;
    const usr = this.currentUser()!;

    const nuevaSolicitud = {
      uidSolicitante: usr.uid,
      correoSolicitante: usr.email,
      nombreSolicitante: nombre,
      idProgramador: programador,
      ideaProyecto: idea,
      estado: 'Pendiente',
      observacion: '',
      fechaCreacion: new Date().toISOString()
    };
    try {
      const solicitudesRef = collection(this.firestore, 'solicitudes');
      await addDoc(solicitudesRef, nuevaSolicitud);
      this.successMsg.set('Project request initialized successfully.');
      this.contactForm.reset({ programador: 'ambos' });
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }


}