import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {JustifyAndAlignDemoComponent} from "./justify-and-align/app.component";
import {LayoutDemoComponent} from "./layout/app.component";
import {JustifyAndAlignDemoModule} from "./justify-and-align/app.module";
import {LayoutDemoModule} from "./layout/app.module";

export const routerConfig = [
    {
        path: 'justify-and-align', component: JustifyAndAlignDemoComponent
    },
    {
        path: 'layout', component: LayoutDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        JustifyAndAlignDemoModule,
        LayoutDemoModule,
    ]
})
export class BoxDemoModule {
}
