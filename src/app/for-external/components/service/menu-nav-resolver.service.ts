import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {ComponentMenuNav} from "../model/menu-nav-model";
import {ComponentMenuService} from "./component.service";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MenuNavResolver implements Resolve<ComponentMenuNav[]> {
  constructor(private componentMenuService: ComponentMenuService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ComponentMenuNav[]> {
    return this.componentMenuService.getComponentMenuNavList()
  }
}


