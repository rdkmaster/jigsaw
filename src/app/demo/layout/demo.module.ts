import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {GridFullDemoModule} from "./grid/app.module";
import {GridFullDemoComponent} from "./grid/app.component";
import {BoxDemoComponent} from "./box/app.component";
import {BoxDemoModule} from "./box/app.module";

export const routerConfig = [
    {
        path: 'grid', component: GridFullDemoComponent
    },
    {
        path: 'box', component: BoxDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        GridFullDemoModule,
        BoxDemoModule,
    ]
})
export class LayoutDemoModule {
}
