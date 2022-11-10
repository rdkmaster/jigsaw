import { Component, OnInit } from '@angular/core';
import { JigsawTheme } from 'jigsaw/public_api';
import { ThemeService } from './service/theme-service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ThemeService],
})
export class HomeComponent implements OnInit {
  public bgPath = `app/for-external/assets/img/home-bg-${JigsawTheme.majorStyle}.png`;

  constructor(private _themeService: ThemeService) {
  }
  
  ngOnInit(): void {
    this._themeService.themeChange.subscribe(() => {
      this.bgPath = `app/for-external/assets/img/home-bg-${JigsawTheme.majorStyle}.png`;
    })
  }
}
