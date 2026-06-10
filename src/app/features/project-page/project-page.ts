import { ChangeDetectionStrategy, Component, signal, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPage implements OnInit {
  activeSection = signal<string>('about');
  isMobileMenuOpen = signal<boolean>(false);

  projects = signal<any[]>([]);
  
  private http = inject(HttpClient);
  private apiUrl = 'https://healing-event-664102f8e1.strapiapp.com/api/proyectos?populate=*';

  ngOnInit() {
    this.observeSections();
    this.cargarProyectos();
  }

  cargarProyectos() {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        this.projects.set(response.data);
      },
      error: (err) => {
        console.error('Error al conectar con Strapi Cloud:', err);
      }
    });
  }

  toggleMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  private observeSections() {
    const options = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
        }
      });
    }, options);

    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
  }
}