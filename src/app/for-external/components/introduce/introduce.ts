import {Component, OnInit, OnChanges, PLATFORM_ID, Inject, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, Params, ParamMap, NavigationEnd} from '@angular/router';
import {ComponentMenuService} from "../service/component.service";
import {ComponentMenuItem, ComponentMenuNav} from "../model/menu-nav-model"
import {isPlatformBrowser} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import {fade} from "../../animations/fade";


@Component({
  templateUrl: './introduce.html',
  styleUrls: ['./introduce.scss'],
  animations: [fade]
})
export class IntroduceComponent {


  constructor(private componentService: ComponentMenuService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  showQuickStart() {
    this.router.navigate(['/components/guide/quick-start']);
  }
}
