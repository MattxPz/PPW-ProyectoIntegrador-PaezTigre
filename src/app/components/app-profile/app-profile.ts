import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-profile',
    imports: [RouterLink, TitleCasePipe],
    templateUrl: './app-profile.html'
})
export class AppProfile {
    private route = inject(ActivatedRoute);
    
    developerId = signal<string | null>(null);

constructor() {
    this.route.paramMap.subscribe(params => {
        this.developerId.set(params.get('id'));
    });
    }
}