import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComponentDetailComponent} from "./component-detail/component-detail.component";
import {ComponentMenuNavComponent} from "./component-menu-nav/component-menu-nav.component";
import {ComponentDetailContentComponent} from "./component-detail/component-detail-content/component-detail-content.component";
import {MenuNavResolver} from "./service/menu-nav-resolver.service";
import {ApiComponent} from "./component-detail/component-detail-content/api/api.component";
import {IntroduceComponent} from "./introduce/introduce";


const ComponentRoutes: Routes = [
  {
    path: '', component: ComponentMenuNavComponent,
    children: [
      {
        path: 'introduce', component: IntroduceComponent
      },
      {
        path: ':name', component: ComponentDetailComponent,
        children: [
          {
            path: 'class', children: [{path: '**', component: ApiComponent}]
          },
          {
            path: 'component', children: [{path: '**', component: ApiComponent}]
          },
          {
            path: 'directive', children: [{path: '**', component: ApiComponent}]
          },
          {
            path: 'enum', children: [{path: '**', component: ApiComponent}]
          },
          {
            path: 'injectable', children: [{path: '**', component: ApiComponent}]
          },
          {
            path: 'interface', children: [{path: '**', component: ApiComponent}]
          },
          {
            path: 'typealias', children: [{path: '**', component: ApiComponent}]
          },
          {
            path: 'guide', children: [{path: '**', component: ApiComponent}]
          },
          {
            path: ':navName', component: ComponentDetailContentComponent
          },
          {
            path: '**', component: ComponentDetailContentComponent
          },
        ]
      }
    ],
    resolve: {
      menuNavList: MenuNavResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ComponentRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MenuNavResolver
  ]
})
export class ComponentRoutingModule {
}
