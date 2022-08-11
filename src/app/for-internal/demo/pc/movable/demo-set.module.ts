import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MoveAndClickDemoModule} from "./move-and-click/demo.module";

import {MoveAndClickDemoComponent} from "./move-and-click/demo.component";

export const routerConfig = [
    {
        path: 'move-and-click', component: MoveAndClickDemoComponent
    },
    {
        desc: 'badge-move', url: '/pc/badge/move'
    },
    {
        desc: 'alert-move', url: '/pc/alert/popup'
    },
    {
        desc: 'dialog-move', url: '/pc/dialog/absolute-position'
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        MoveAndClickDemoModule,
    ]
})
export class MovableDemoModule {
}
