import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './introduce.html',
  styleUrls: ['./introduce.scss'],
})
export class IntroduceComponent {
  constructor(private router: Router) { }

  public showQuickStart() {
    this.router.navigate(['/components/guide/quick-start']);
  }
}
