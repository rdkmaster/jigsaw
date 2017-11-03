import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ScrollbarBasicDemoModule} from "./basic/app.module";

import {ScrollbarBasicDemoComponent} from "./basic/app.component";

export const routerConfig = [
    {
        path: 'basic', component: ScrollbarBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ScrollbarBasicDemoModule,
    ]
})
export class ScrollbarDemoModule { }
