import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {GridFullDemoModule} from "./full/app.module";
import {GridFullDemoComponent} from "./full/app.component";

export const routerConfig = [
    {
        path: 'basic', component: GridFullDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        GridFullDemoModule,
    ]
})
export class GridDemoModule {
}
