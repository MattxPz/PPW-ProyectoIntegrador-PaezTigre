import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './app-hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHero {
  activeSection = signal<string>('about');

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
}