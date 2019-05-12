import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RadioLiteBasicDemoModule} from "./basic/demo.module";
import {RadioLiteBasicDemoComponent} from "./basic/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: RadioLiteBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        RadioLiteBasicDemoModule,
    ]
})
export class RadioLiteDemoModule { }
