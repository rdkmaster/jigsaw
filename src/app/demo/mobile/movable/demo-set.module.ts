import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MoveAndClickDemoModule} from "./move-and-click/demo.module";

import {MoveAndClickDemoComponent} from "./move-and-click/demo.component";

export const routerConfig = [
    {
        path: 'move-and-click', component: MoveAndClickDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        MoveAndClickDemoModule,
    ]
})
export class MovableMobileDemoModule {
}
