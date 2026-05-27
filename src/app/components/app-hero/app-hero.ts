import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-app-hero',
  imports: [],
  templateUrl: './app-hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHero {}
