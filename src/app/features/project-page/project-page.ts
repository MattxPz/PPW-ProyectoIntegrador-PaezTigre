import { ChangeDetectionStrategy, Component } from '@angular/core';
import { signal, OnInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';


interface Project {
  id: number;
  name: string;
  image: string;
  date: string;
  stack: string[];
  explanation: string;
  category: string;
}

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProjectPage implements OnInit{

  activeSection = signal<string>('about');
  isMobileMenuOpen = signal<boolean>(false);

  projects: Project[] = [
    {
      id: 1,
      name: 'OmniHealth Java System',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800',
      date: 'Enero 2020',
      stack: ['Java', 'PostgreSQL'],
      explanation: 'Arquitectura distribuida para gestión hospitalaria con persistencia avanzada.',
      category: 'Backend'
    },
    {
      id: 2,
      name: 'Retail Angular Hub',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
      date: 'Noviembre 2021',
      stack: ['Angular', 'Tailwind'],
      explanation: 'Plataforma e-commerce SPA con gestión de estado complejo mediante Signals.',
      category: 'Frontend'
    },
    {
      id: 3,
      name: 'Dockerized Micro-Orchestrator',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3_qzQj593dB8yDow2qdbgTBj43V5Fp6WpQ&s',
      date: 'Marzo 2022',
      stack: ['Docker', 'Go'],
      explanation: 'Contenerización de servicios críticos para despliegues automatizados en la nube.',
      category: 'DevOps'
    },
    {
      id: 4,
      name: 'Fintech React Dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',
      date: 'Agosto 2023',
      stack: ['React', 'PostgreSQL'],
      explanation: 'Panel de visualización financiera con procesamiento de datos en tiempo real.',
      category: 'Full Stack'
    },
    {
      id: 5,
      name: 'Python Data Automator',
      image: 'https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?q=80&w=800',
      date: 'Febrero 2024',
      stack: ['Python', 'Docker'],
      explanation: 'Scripts de automatización de ETL para el procesamiento masivo de logs industriales.',
      category: 'Automation'
    },
    {
      id: 6,
      name: 'Lattice Networking UI',
      image: 'https://latticework.systems/img/Lattice%20%E2%80%94%20Network%20Traffic%20Map.png',
      date: 'Septiembre 2024',
      stack: ['Angular', 'Cisco'],
      explanation: 'Interfaz de monitoreo de red para infraestructuras con topología IPv6.',
      category: 'Infrastructure'
    },
    {
      id: 7,
      name: 'StreamCast Java Engine',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800',
      date: 'Mayo 2025',
      stack: ['Java', 'React'],
      explanation: 'Motor de streaming con baja latencia y gestión dinámica de buffering.',
      category: 'Multimedia'
    },
    {
      id: 8,
      name: 'Neural Vision Core',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800',
      date: 'Enero 2026',
      stack: ['AI', 'Python', 'React'],
      explanation: 'Sistema de inteligencia artificial para reconocimiento de patrones en arquitecturas digitales.',
      category: 'Artificial Intelligence'
    }
  ];

  ngOnInit() {
    this.observeSections();
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
