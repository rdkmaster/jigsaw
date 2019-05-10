import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TagBasicDemoModule} from "./basic/demo.module";

import {TagBasicDemoComponent} from "./basic/demo.component";
import {ListMobileDemoModule} from "../list/demo-set.module";

export const routerConfig = [
    {
        path: 'basic', component: TagBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TagBasicDemoModule
    ]
})
export class TagMobileDemoModule {
}
