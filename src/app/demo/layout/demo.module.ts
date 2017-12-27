import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BoxDemoComponent} from "./box/app.component";
import {BoxDemoModule} from "./box/app.module";

export const routerConfig = [
    {
        path: 'box', component: BoxDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        BoxDemoModule,
    ]
})
export class LayoutDemoModule {
}
