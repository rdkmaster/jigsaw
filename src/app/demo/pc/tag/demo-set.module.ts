import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TagAllModule} from "./demo.module";
import {TagAllComponent} from "./demo.component";

export const routerConfig = [
    {
        path: 'all', component: TagAllComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), TagAllModule
    ]
})

export class TagDemoModule {
}
