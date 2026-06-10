import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './app-profile.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppProfile implements OnInit {
    currentProfile = signal<any>(null);
    
    private route = inject(ActivatedRoute);
    private http = inject(HttpClient);

    ngOnInit() {
    this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        this.cargarPerfilDesdeStrapi(id);
        }
    });
    }

    cargarPerfilDesdeStrapi(id: string) {
    const url = `https://healing-event-664102f8e1.strapiapp.com/api/programadors/${id}?populate=*`;
    
    this.http.get<any>(url).subscribe({
        next: (response) => {
        this.currentProfile.set(response.data);
        
        setTimeout(() => {
            this.iniciarAnimacionesScroll();
        }, 50);
        },
        error: (err) => {
        console.error('Error al cargar el perfil desde la nube:', err);
        }
    });
    }

    iniciarAnimacionesScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
        } else {
            entry.target.classList.remove('opacity-100', 'translate-y-0');
            entry.target.classList.add('opacity-0', 'translate-y-12');
        }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-12');
        observer.observe(section);
    });
    }
}