import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {GridFullDemoModule} from "./grid/app.module";
import {GridFullDemoComponent} from "./grid/app.component";
import {FlexDemoComponent} from "./box/app.component";
import {FlexDemoModule} from "./box/app.module";

export const routerConfig = [
    {
        path: 'full', component: GridFullDemoComponent
    },
    {
        path: 'flex', component: FlexDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        GridFullDemoModule,
        FlexDemoModule,
    ]
})
export class LayoutDemoModule {
}
