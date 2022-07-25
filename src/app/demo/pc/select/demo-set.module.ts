import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SelectAllComponent} from "./all/demo.component";
import {SelectAllModule} from "./all/demo.module";

export const routerConfig = [
    {
        path: 'all', component: SelectAllComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        SelectAllModule
    ]
})
export class SelectDemoModule {
}
