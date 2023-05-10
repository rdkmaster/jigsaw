import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../service/theme-service';

@Component({
  templateUrl: './introduce.html',
  styleUrls: ['./introduce.scss'],
  providers: [ThemeService],
})
export class IntroduceComponent {
  constructor(private router: Router, private _themeService: ThemeService) { }

  public showQuickStart() {
    this.router.navigate(['/components/quick-start']);
  }

  public paletxProPath = `app/for-external/assets/img/paletx-pro-${this._themeService.service.majorStyle}.svg`;
  public logoPath = `app/for-external/assets/img/logo-${this._themeService.service.majorStyle}.png`;

  ngOnInit(): void {
    this._themeService.themeChange.subscribe(() => {
      this.paletxProPath = `app/for-external/assets/img/paletx-pro-${this._themeService.service.majorStyle}.svg`;
      this.logoPath = `app/for-external/assets/img/logo-${this._themeService.service.majorStyle}.png`;
    })
  }
}
