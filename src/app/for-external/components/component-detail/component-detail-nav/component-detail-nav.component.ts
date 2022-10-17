import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ComponentMenuService} from "../../service/component.service";

@Component({
  selector: 'app-component-detail-nav',
  templateUrl: './component-detail-nav.component.html',
  styleUrls: ['./component-detail-nav.component.scss']
})
export class ComponentDetailNavComponent {

  constructor(public componentService: ComponentMenuService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  navigateTo(navName: string) {
    this.router.navigate([navName], {relativeTo: this.route});
  }
}


