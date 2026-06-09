import { Component, inject, signal, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { StrapiService } from '../../services/strapi.service'; 

@Component({
    selector: 'app-profile',
    imports: [RouterLink],
    templateUrl: './app-profile.html'
})
export class AppProfile implements AfterViewInit {
    private route = inject(ActivatedRoute);
    private strapiService = inject(StrapiService); // Inyectamos la conexión a Strapi

    @ViewChildren('reveal') revealElements!: QueryList<ElementRef>;

    developerId = signal<string | null>(null);

    currentProfile = signal<any>(null); 

    constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
        this.developerId.set(id);
        this.cargarDatosDesdeStrapi(id);
    });
    }

    cargarDatosDesdeStrapi(slugBuscado: string | null) {
    if (!slugBuscado) return;

    this.strapiService.getProgramadores().subscribe({
        next: (response) => {
        // Strapi v5 devuelve el array de registros dentro de "data"
        const todosLosProgramadores = response.data;
        
        // Filtramos para encontrar el que coincida con la URL (ej. slug == 'john')
        const perfilEncontrado = todosLosProgramadores.find(
            (programador: any) => programador.slug === slugBuscado
        );

        if (perfilEncontrado) {
            this.currentProfile.set(perfilEncontrado);
            
            setTimeout(() => this.initScrollAnimations(), 100);
        }
        },
        error: (error) => {
        console.error('Error al conectar con Strapi:', error);
        }
    });
    }

ngAfterViewInit() {
    this.initScrollAnimations();
}

initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-12');
            entry.target.classList.add('opacity-100', 'translate-y-0');
        } else {
            entry.target.classList.remove('opacity-100', 'translate-y-0');
            entry.target.classList.add('opacity-0', 'translate-y-12');
        }
        });
    }, { threshold: 0.1 });

    this.revealElements.forEach(el => {
        el.nativeElement.classList.add('opacity-0', 'translate-y-12', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(el.nativeElement);
    });
    }
}