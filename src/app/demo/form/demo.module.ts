import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TemplateDrivenDemoModule} from "./template-driven/app.module";
import {TemplateDrivenDemoComponent} from "./template-driven/app.component";

const draggableDemoRoutes = [
    {
        path: 'template-driven', component: TemplateDrivenDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(draggableDemoRoutes),
        TemplateDrivenDemoModule,
    ]
})
export class FormDemoModule {
}
