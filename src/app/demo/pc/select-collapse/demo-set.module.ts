import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SelectCollapseDemoComponent} from "./select-collapse/demo.component";
import {SelectCollapseDemoModule} from "./select-collapse/demo.module";

export const routerConfig = [
    {
        path: 'select-collapse', component: SelectCollapseDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), SelectCollapseDemoModule
    ]
})
export class SelectCollapseDemoSetModule {
}
