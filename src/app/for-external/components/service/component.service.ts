/**
 * Created by 6396000843 on 2017/7/24.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs';

import {ComponentMenuItem, ComponentMenuNav} from "../model/menu-nav-model"
import {PerfectScrollbarDirective} from "ngx-perfect-scrollbar";

@Injectable()
export class ComponentMenuService {

  constructor(private http: Http) {
  }

  menuNavList: ComponentMenuNav[] = [];
  allDemoList: any[];
  perfectScrollbar: PerfectScrollbarDirective;

  loadDemoList() {
    if (!!this.allDemoList) {
      return Observable.of(this.allDemoList);
    }
    return this.http.get('jigsaw-demo/demo-urls.json')
      .map (resp => {
        this.allDemoList = resp.json();
        return this.allDemoList;
      })
  }

  getComponentMenuNav(name: string, sub?: string): ComponentMenuItem {
    let result;
    if (name) {
      // 这里是为了适配组件的url与quick-start等自定义url而做的妥协，
      // 组件的url类似 /components/button/api，而自定义url一般类似/components/guide/quick-start
      // 在不对组件的url规则做大改的前提下，只好如此处理了
      sub = sub == 'api' || sub == 'demo' ? '' : sub;
      this.menuNavList.forEach(menu => {
        result = result || menu.nodes.find(item => item.router === name && (!sub || item.subRouter === sub));
      });
    }
    return result;
  }

  getComponentMenuNavList(): Observable<ComponentMenuNav[]> {
    return this.http
      .get(`assets/ux/menu.json?_ts=${+new Date}`)
      .map(res => res.json())
  }
}
