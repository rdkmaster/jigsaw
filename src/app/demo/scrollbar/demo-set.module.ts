import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ScrollbarBasicDemoModule} from "./basic/demo.module";

import {ScrollbarBasicDemoComponent} from "./basic/demo.component";

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
