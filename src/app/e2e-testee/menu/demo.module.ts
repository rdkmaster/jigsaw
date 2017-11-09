import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import {MenuFullDemoModule} from "./menu/app.module";
import {MenuFullModule} from "../../live-demo/menu/app.module";
import {MenuFullComponent} from "../../live-demo/menu/app.component";

const menuDemoRoutes = [
    {   path: 'menu-full',
        component: MenuFullComponent
    },
    {
        path: '**', // fallback router must in the last
        component: MenuFullComponent
    }
];

@NgModule({
  imports: [
      CommonModule,
      MenuFullModule,
      MenuFullDemoModule,
      RouterModule.forChild(menuDemoRoutes),
  ],
  declarations: []
})
export class MenuDemoModule { }
