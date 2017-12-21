import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LayoutBasicDemoModule} from "./basic/app.module";
import {LayoutBasicDemoComponent} from "./basic/app.component";

export const routerConfig = [
    {
        path: 'basic', component: LayoutBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        LayoutBasicDemoModule,
    ]
})
export class LayoutDemoModule {
}
