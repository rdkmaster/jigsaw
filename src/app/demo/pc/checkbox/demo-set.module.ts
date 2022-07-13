import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CheckBoxFullModule} from "./full/demo.module";
import {CheckBoxFullComponent} from "./full/demo.component";
import {CheckboxAllModule} from "./demo.module";
import {CheckboxAllComponent} from "./demo.component";

export const routerConfig = [
    {
        path: 'all', component: CheckboxAllComponent
    },
    {
        path: 'full', component: CheckBoxFullComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        CheckBoxFullModule,
        CheckboxAllModule
    ]
})
export class CheckBoxDemoModule {
}
