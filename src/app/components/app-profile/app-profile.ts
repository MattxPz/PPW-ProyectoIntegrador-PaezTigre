import { Component, inject, signal, computed, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-profile',
    imports: [RouterLink, TitleCasePipe],
    templateUrl: './app-profile.html'
})
export class AppProfile implements AfterViewInit {
    private route = inject(ActivatedRoute);
    
    @ViewChildren('reveal') revealElements!: QueryList<ElementRef>;

    developerId = signal<string | null>(null);

    profiles = {
    mateo: {
        name: 'Mateo Paez',
        role: 'Front-End & Network Architect',
        description: 'Especializado en el diseño y desarrollo de interfaces de usuario escalables y pixel-perfect con Angular y React, complementado con un fuerte conocimiento en infraestructuras de red y protocolos.',
        image: 'https://cdn.nba.com/manage/2018/09/lebron-iso-akron-school.jpg',
        skills: [
        { name: 'Angular', icon: 'devicon-angular-plain colored' },
        { name: 'React', icon: 'devicon-react-original colored' },
        { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-original colored' },
        { name: 'Ionic', icon: 'devicon-ionic-original colored' },
        { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
        { name: 'Redes', icon: 'devicon-linux-plain' } // Icono representativo
        ],
        experience: [
        { role: 'Desarrollador Frontend Jr', date: '2025 - Actualidad', company: 'TechSolutions', desc: 'Desarrollo de interfaces reactivas y consumo de APIs REST.' },
        { role: 'Técnico de Redes', date: '2024 - 2025', company: 'UPS Labs', desc: 'Configuración de topologías de red y protocolos de enrutamiento.' }
        ]
    },
    john: {
        name: 'John Tigre',
        role: 'Back-End Specialist & Database Admin',
        description: 'Ingeniero enfocado en la lógica de servidor, creación de APIs robustas y modelado de bases de datos relacionales. Apasionado por la seguridad y la eficiencia en el manejo de datos.',
        image: 'https://i.pinimg.com/236x/29/af/15/29af15e8f552fa65477e3801b297e3d1.jpg',
        skills: [
        { name: 'Node.js', icon: 'devicon-nodejs-plain-wordmark colored' },
        { name: 'Java', icon: 'devicon-java-plain colored' },
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
        { name: 'Oracle', icon: 'devicon-oracle-original colored' },
        { name: 'Docker', icon: 'devicon-docker-plain colored' },
        { name: 'Git', icon: 'devicon-git-plain colored' }
        ],
        experience: [
        { role: 'Desarrollador Backend Jr', date: '2025 - Actualidad', company: 'DataCore', desc: 'Implementación de microservicios y optimización de consultas SQL.' },
        { role: 'Administrador de BD', date: '2024 - 2025', company: 'UPS Proyectos', desc: 'Diseño de modelos entidad-relación y scripts DDL/DML.' }
        ]
    }
    };

    currentProfile = computed(() => {
    const id = this.developerId();
    return id === 'mateo' ? this.profiles.mateo : this.profiles.john;
    });

    constructor() {
    this.route.paramMap.subscribe(params => {
        this.developerId.set(params.get('id'));
        setTimeout(() => this.initScrollAnimations(), 100);
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